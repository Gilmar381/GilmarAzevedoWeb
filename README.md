# GilmarAzevedoWeb — Landing Page

Landing page para divulgação de serviços de desenvolvimento de sites e landing pages.

## 🎨 Identidade visual

- **Estilo:** técnico / código à vista
- **Paleta:**
  - Fundo `#141415` · Superfície `#1C1D1F` · Borda `#29292B`
  - Acento (azul-poeira) `#7C93B8`
  - Texto principal `#E9E9EC` · secundário `#A8A7AE` · terciário `#6C6B72` · mono `#9FB3D1`
- **Tipografia:**
  - Títulos: General Sans
  - Corpo: IBM Plex Sans
  - Código/tags: IBM Plex Mono
- **Marca:** `<GilmarAzevedoWeb />`

## 📁 Estrutura de arquivos

```
/
├── index.html      → estrutura da página
├── style.css        → estilos (paleta, tipografia, layout)
├── script.js         → interações (menu mobile, stepper, FAQ)
└── img/
    ├─.......
    ├── .......
    └── ........
```

> Mantenha todos os arquivos na mesma pasta — `index.html` referencia `style.css`, `script.js` e as imagens em `img/` por caminho relativo.

## 🧩 Seções da página

1. **Hero** — headline, CTA duplo (WhatsApp + portfólio), fundo com código esmaecido
2. **Serviços** — 6 cards: landing pages, sites institucionais, restaurantes, páginas de curadoria, manutenção, consultoria
3. **Como funciona** — 4 passos interativos e clicáveis (conversa → proposta → desenvolvimento → entrega)
4. **Portfólio** — 3 projetos com screenshot, descrição, tags e link:
   - Gilmar Azevedo Pintura
   - Casa Ferreira Burger
   - Estante de Livros
5. **FAQ** — 5 perguntas em acordeão
6. **Contato** — WhatsApp, e-mail (mailto) e formulário via Web3Forms

## ⚙️ Configuração pendente

O formulário de contato usa o serviço **[Web3Forms](https://web3forms.com)** para enviar mensagens direto para o e-mail, sem precisar de servidor próprio.

**Passo a passo:**
1. Acesse [web3forms.com](https://web3forms.com) e cadastre o seu e-mail
2. Copie a chave de acesso gerada
3. Abra `index.html`, localize o campo:
   ```html
   <input type="hidden" name="access_key" value="COLE_SUA_CHAVE_DO_WEB3FORMS_AQUI">
   ```
4. Substitua `COLE_SUA_CHAVE_DO_WEB3FORMS_AQUI` pela chave copiada
5. Salve e publique a atualização


## 📞 Contato usado no site

- **WhatsApp:** (11) 91364-6541 — com mensagem padrão pré-preenchida
- **E-mail:** azevedoprado88@gmail.com

## 🚀 Publicação

Recomendado usar **GitHub Pages**, mesmo fluxo já usado nos outros projetos do portfólio:

1. Suba os arquivos (`index.html`, `style.css`, `script.js`, pasta `img/`) para um repositório no GitHub
2. Vá em **Settings → Pages**
3. Ative a publicação a partir da branch `main`
4. O site fica disponível em poucos minutos em `https://seu-usuario.github.io/nome-do-repositorio/`
