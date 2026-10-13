# Julia Damascena Makeup — Landing Page

React 18 + Vite. Estilos com CSS Modules sobre os tokens do Design System (`src/styles/tokens.css`).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
```

## Estrutura

```
src/
  data/content.js        # toda a copy (textos exatos do documento) + contatos
  styles/tokens.css      # cores, tipografia, raios, sombras, espaçamento do DS
  styles/global.css      # base, utilitários, animação de entrada
  utils/whatsapp.js      # link do WhatsApp com mensagem pré-preenchida
  hooks/                 # useReveal (animação ao rolar), useScrolled (header)
  components/
    ui/                  # Button, Photo, Reveal, SectionHeader, Icons
    layout/              # Header (menu mobile), Footer, FloatingWhatsApp, Logo
    sections/            # uma seção por arquivo, na ordem da copy
```

## Antes de publicar

1. **Fotos**: coloque os arquivos em `public/images/` com os nomes usados em `content.js`
   (`hero.jpg`, `julia.jpg`, `estudio-*.jpg`, `maquiagem-*.jpg`, `portfolio-01..08.jpg`, `og-image.jpg`).
   Enquanto um arquivo não existir, aparece um espaço reservado com o monograma JD.
   Revise os textos alternativos (`alt`) para descreverem as fotos reais.
2. **Campos entre [colchetes]** em `content.js`: depoimentos, horário de atendimento,
   texto opcional do "Sobre" e o tempo médio dos penteados no FAQ.
