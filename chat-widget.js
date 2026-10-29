/* Chat por fluxo - Gilmar Azevedo Web
   Sem backend, sem API e sem custo. O resumo vai direto para o WhatsApp. */
(function () {
  "use strict";

  // ====== CONFIGURAÇÃO (edite aqui) ======
  var WHATSAPP = "5511913646541";
  var LAUNCHER_LABEL = "Fale comigo";
  var TEASER_TEXT = "Oi! Posso te ajudar a pedir um orçamento?";

  var FAQ = [
    { q: "Quanto custa?", a: "Depende do tamanho e da complexidade do projeto. Responda as perguntas do orçamento e o Gilmar te passa um valor sem compromisso." },
    { q: "Qual o prazo?", a: "Landing pages simples ficam prontas entre 5 e 10 dias úteis. Sites maiores levam um pouco mais, e o prazo exato vai na proposta." },
    { q: "Preciso de hospedagem e domínio?", a: "Não precisa resolver isso antes de fechar. O Gilmar te orienta nas melhores opções na conversa inicial." },
    { q: "Funciona no celular?", a: "Sim. Todo site entregue é responsivo e se adapta a celular, tablet e computador." },
    { q: "Posso pedir alterações depois?", a: "Sim. A entrega inclui um período de ajustes e, depois dele, há manutenção sob consulta." }
  ];

  var STEPS = [
    {
      key: "Serviço",
      ask: "O que você precisa?",
      options: ["Landing page", "Site institucional", "Site para restaurante", "Página de curadoria", "Ajuste em site existente", "Ainda não sei"]
    },
    {
      key: "Negócio",
      ask: "Qual é o seu negócio? Conte em uma frase.",
      placeholder: "Ex.: hamburgueria em Mogi das Cruzes"
    },
    {
      key: "Domínio e hospedagem",
      ask: "Você já tem domínio e hospedagem?",
      options: ["Tenho os dois", "Só domínio", "Não tenho nenhum", "Não sei"]
    },
    {
      key: "Prazo",
      ask: "Qual o prazo ideal?",
      options: ["Urgente (até 10 dias)", "Até 1 mês", "Sem pressa"]
    },
    {
      key: "Nome",
      ask: "Para finalizar, qual é o seu nome?",
      placeholder: "Seu nome"
    }
  ];
  // =======================================

  var ICON_CHAT =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.4L3 20.5l1.7-5.3A8.4 8.4 0 1 1 21 11.5z"/><circle cx="8.5" cy="11.5" r="0.6" fill="currentColor"/><circle cx="12.5" cy="11.5" r="0.6" fill="currentColor"/><circle cx="16.5" cy="11.5" r="0.6" fill="currentColor"/></svg>';

  var answers = {};
  var stepIndex = 0;
  var started = false;

  // Helper: cria elementos usando textContent (seguro contra injeção de HTML)
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // ---------- Estrutura ----------
  var launcher = el("button", "cw-launcher");
  launcher.type = "button";
  launcher.setAttribute("aria-expanded", "false");
  var launcherIcon = el("span", "cw-launcher-icon");
  launcherIcon.innerHTML = ICON_CHAT; // conteúdo fixo, sem dados do usuário
  launcher.appendChild(launcherIcon);
  launcher.appendChild(el("span", "cw-launcher-label", LAUNCHER_LABEL));

  var panel = el("section", "cw-panel");
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Chat de orçamento");

  var head = el("header", "cw-head");
  var headText = el("div");
  headText.appendChild(el("p", "cw-title", "Orçamento rápido"));
  headText.appendChild(el("p", "cw-sub", "Gilmar Azevedo Web"));
  var closeBtn = el("button", "cw-close", "\u00d7");
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Fechar chat");
  head.appendChild(headText);
  head.appendChild(closeBtn);

  var log = el("div", "cw-log");
  log.setAttribute("role", "log");
  log.setAttribute("aria-live", "polite");

  var controls = el("div", "cw-controls");
  var note = el(
    "p",
    "cw-note",
    "Suas respostas só saem daqui quando você tocar em enviar no WhatsApp."
  );

  panel.appendChild(head);
  panel.appendChild(log);
  panel.appendChild(controls);
  panel.appendChild(note);
  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  var teaser = el("button", "cw-teaser", TEASER_TEXT);
  teaser.type = "button";
  teaser.hidden = true;
  document.body.appendChild(teaser);

  // ---------- Mensagens ----------
  function scrollDown() {
    log.scrollTop = log.scrollHeight;
  }
  function botSay(text) {
    log.appendChild(el("div", "cw-msg cw-msg-bot", text));
    scrollDown();
  }
  function userSay(text) {
    log.appendChild(el("div", "cw-msg cw-msg-user", text));
    scrollDown();
  }
  function clearControls() {
    controls.textContent = "";
  }

  // ---------- Controles ----------
  function showChoices(options, onPick) {
    clearControls();
    options.forEach(function (label) {
      var b = el("button", "cw-choice", label);
      b.type = "button";
      b.addEventListener("click", function () {
        userSay(label);
        onPick(label);
      });
      controls.appendChild(b);
    });
    var first = controls.querySelector("button");
    if (first) first.focus();
  }

  function showInput(placeholder, onSubmit) {
    clearControls();
    var form = el("div", "cw-form");
    var input = el("input", "cw-input");
    input.type = "text";
    input.placeholder = placeholder || "";
    input.maxLength = 160;
    input.setAttribute("aria-label", placeholder || "Sua resposta");
    var send = el("button", "cw-send", "Enviar");
    send.type = "button";

    function submit() {
      var value = input.value.trim();
      if (!value) {
        input.focus();
        return;
      }
      userSay(value);
      onSubmit(value);
    }
    send.addEventListener("click", submit);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
    });
    form.appendChild(input);
    form.appendChild(send);
    controls.appendChild(form);
    input.focus();
  }

  // ---------- Fluxo ----------
  function showMenu() {
    showChoices(["Pedir orçamento", "Tirar dúvidas"], function (choice) {
      if (choice === "Pedir orçamento") startQuote();
      else showFaq();
    });
  }

  function start() {
    botSay(
      "Oi! Eu sou o assistente do Gilmar. Posso montar seu pedido de orçamento em 5 perguntas ou tirar dúvidas rápidas."
    );
    showMenu();
  }

  function showFaq() {
    botSay("Sobre o que você quer saber?");
    var questions = FAQ.map(function (item) {
      return item.q;
    });
    questions.push("Voltar");
    showChoices(questions, function (choice) {
      if (choice === "Voltar") {
        showMenu();
        return;
      }
      var item = FAQ.filter(function (f) {
        return f.q === choice;
      })[0];
      botSay(item.a);
      showChoices(["Pedir orçamento", "Outra dúvida"], function (next) {
        if (next === "Pedir orçamento") startQuote();
        else showFaq();
      });
    });
  }

  function startQuote() {
    answers = {};
    stepIndex = 0;
    askStep();
  }

  function askStep() {
    var step = STEPS[stepIndex];
    botSay(step.ask);
    var done = function (value) {
      answers[step.key] = value;
      stepIndex += 1;
      if (stepIndex < STEPS.length) askStep();
      else finish();
    };
    if (step.options) showChoices(step.options, done);
    else showInput(step.placeholder, done);
  }

  function buildMessage() {
    var lines = ["Olá! Vi seu site e gostaria de um orçamento.", ""];
    STEPS.forEach(function (s) {
      lines.push(s.key + ": " + answers[s.key]);
    });
    return lines.join("\n");
  }

  function finish() {
    var message = buildMessage();
    botSay(
      "Pronto, " +
        answers["Nome"] +
        "! Montei seu pedido. Toque no botão abaixo para enviar ao WhatsApp do Gilmar."
    );
    log.appendChild(el("div", "cw-msg cw-msg-bot cw-summary", message));
    scrollDown();

    clearControls();
    var wa = el("a", "cw-wa", "Enviar no WhatsApp");
    wa.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message);
    wa.target = "_blank";
    wa.rel = "noopener";
    var again = el("button", "cw-choice", "Recomeçar");
    again.type = "button";
    again.addEventListener("click", function () {
      botSay("Tudo bem, vamos de novo.");
      showMenu();
    });
    controls.appendChild(wa);
    controls.appendChild(again);
    wa.focus();
  }

  // ---------- Abrir e fechar ----------
  function openPanel() {
    hideTeaser();
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    if (!started) {
      started = true;
      start();
    } else {
      var focusable = controls.querySelector("input, button, a");
      if (focusable) focusable.focus();
    }
  }
  function closePanel() {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  }

  launcher.addEventListener("click", function () {
    if (panel.hidden) openPanel();
    else closePanel();
  });
  closeBtn.addEventListener("click", closePanel);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) closePanel();
  });

  // ---------- Convite: aparece uma vez por visita ----------
  function hideTeaser() {
    teaser.hidden = true;
    try { sessionStorage.setItem("cw-teaser", "1"); } catch (e) {}
  }
  teaser.addEventListener("click", openPanel);

  var seen = false;
  try { seen = sessionStorage.getItem("cw-teaser") === "1"; } catch (e) {}
  if (!seen) {
    setTimeout(function () {
      if (panel.hidden) teaser.hidden = false;
    }, 5000);
    setTimeout(hideTeaser, 15000);
  }
})();