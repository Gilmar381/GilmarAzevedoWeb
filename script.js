// menu mobile
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', function(){
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
  });

  // como funciona - stepper
  var stepDetails = [
    "Você me conta o que precisa: para quem é o site, o que ele precisa fazer e qual o prazo ideal.",
    "Envio um valor fechado e um prazo claro de entrega, de forma rapida e transparente.",
    "Construo o site em etapas e mostro o progresso pelo caminho, não só na entrega final.",
    "Você recebe o site no ar, com um período combinado para pedir pequenos ajustes finos."
  ];
  var stepBtns = document.querySelectorAll('.step-btn');
  var stepText = document.getElementById('stepText');
  stepBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      stepBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      stepText.textContent = stepDetails[parseInt(btn.dataset.i)];
    });
  });

  // faq accordion
  var faqItems = document.querySelectorAll('.faq-item');
  function setFaqHeight(item, open){
    var answer = item.querySelector('.faq-a');
    if(open){
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = '0px';
    }
  }
  faqItems.forEach(function(item){
    setFaqHeight(item, item.classList.contains('open'));
    item.querySelector('.faq-q').addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function(i){ i.classList.remove('open'); setFaqHeight(i,false); });
      if(!isOpen){ item.classList.add('open'); setFaqHeight(item,true); }
    });
  });
  window.addEventListener('resize', function(){
    faqItems.forEach(function(item){ if(item.classList.contains('open')) setFaqHeight(item,true); });
  });