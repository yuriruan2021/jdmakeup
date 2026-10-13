/**
 * Copy oficial — "Landing Page — Julia Damascena Makeup (Copy)".
 * Os textos estão exatamente como no documento. Trechos entre [colchetes]
 * são espaços para preencher com informações reais.
 *
 * Fotos: coloque os arquivos em /public/images com os nomes abaixo.
 * Enquanto não existirem, a página mostra um espaço reservado elegante.
 */

export const contact = {
  whatsappNumber: '5561992325225',
  whatsappDisplay: '(61) 99232-5225',
  instagramHandle: '@juliadamascenamakeup',
  instagramUrl: 'https://www.instagram.com/juliadamascenamakeup',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Julia+Damascena+Makeup+Grande+Colorado+Bras%C3%ADlia',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Julia+Damascena+Makeup,+Grande+Colorado,+Bras%C3%ADlia+DF&output=embed',
  /** Agenda online (link da bio: melinks.com.br/juliadamascenamakeup) */
  bookingUrl: 'https://controlesuamarca.com.br/agendar/julia-damascena-pereira-t5y2e',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Julia+Damascena+Makeup+Grande+Colorado+Bras%C3%ADlia',
  googleReviewUrl: 'https://g.page/r/CQ0lWBsciBRuEBE/review',
};

/** Mensagem pré-preenchida do WhatsApp */
export const whatsappTemplate = 'Olá, Julia! Vim pelo site e gostaria de agendar [serviço] para o dia [data].';

export const nav = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'diferenciais', label: 'Diferenciais', mobileOnly: true },
  { id: 'servicos', label: 'Serviços' },
  { id: 'combos', label: 'Combos' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'como-agendar', label: 'Como agendar' },
  { id: 'faq', label: 'FAQ' },
  { id: 'localizacao', label: 'Localização' },
];

export const hero = {
  eyebrow: 'Maquiagem · Penteado · Sobrancelha',
  headline: 'Sua beleza, sem pressa e com toda a atenção.',
  subheadline:
    'Atendimento em um estúdio exclusivo, com hora marcada e cuidado em cada detalhe. Aqui, o foco é você.',
  primaryCta: 'Agendar pelo WhatsApp',
  secondaryCta: 'Ver serviços e valores',
  /** Chips: cada um abre a aba correspondente na seção de serviços */
  chips: [
    { label: 'Social', href: '#servicos-maquiagem' },
    { label: 'Noivas', href: '#servicos-maquiagem' },
    { label: 'Formaturas', href: '#servicos-maquiagem' },
    { label: 'Penteados', href: '#servicos-cabelo' },
    { label: 'Sobrancelha', href: '#servicos-sobrancelha' },
    { label: 'Cílios', href: '#servicos-cilios' },
  ],
  /** Trecho da headline destacado em itálico (o texto da headline não muda) */
  headlineEmphasis: 'atenção.',
  /** Card de agendamento do hero */
  bookingText: 'Agende seu horário',
  bookingCta: 'Agendar',
  /** Nome em destaque atrás da foto, estilo capa de revista */
  coverName: 'Julia',
  /**
   * Fotos do carrossel do hero (troca a cada 5 s).
   * Novas fotos: recortadas (sem fundo), 1024×1536, mesmo enquadramento.
   */
  slides: [
    {
      src: '/images/hero-julia-2.webp',
      srcSmall: '/images/hero-julia-2-640.webp',
      width: 1024,
      height: 1536,
      alt: 'Julia Damascena, maquiadora, de blazer preto, segurando um pincel e uma paleta de iluminadores',
    },
    {
      src: '/images/hero-julia.webp',
      srcSmall: '/images/hero-julia-640.webp',
      width: 1024,
      height: 1536,
      alt: 'Julia Damascena, maquiadora, sorrindo de blazer preto, com cabelo longo em ondas e brincos dourados',
    },
  ],
};

export const about = {
  /** Frase da bio do Instagram (@juliadamascenamakeup) */
  tagline: 'Especialista em realçar sua beleza natural',
  title: 'Prazer, eu sou a Julia.',
  /** Trecho do título destacado em serifa itálica dourada (mesmo tratamento do hero) */
  titleEmphasis: 'Julia.',
  paragraphs: [
    'Criei meu estúdio para oferecer o que muita cliente não encontra no salão: tempo, calma e atenção de verdade. Aqui você é atendida individualmente, num ambiente tranquilo e acolhedor, do jeito que um dia especial merece.',
    'Cada maquiagem e cada penteado começam por uma conversa. Eu quero entender o seu estilo, o evento e como você quer se sentir. A partir disso, realço a sua beleza sem esconder quem você é: pele bonita, acabamento que dura e um resultado que fica lindo ao vivo e nas fotos.',
  ],
  location: 'Grande Colorado · Sobradinho/DF',
  instagramCta: 'Acompanhe no Instagram',
  highlight: 'Atendimento Premium — o foco é você.',
  portrait: {
    src: '/images/julia-sobre.webp',
    srcSmall: '/images/julia-sobre-480.webp',
    width: 800,
    height: 1000,
    alt: 'Retrato da maquiadora Julia Damascena de blazer preto, com cabelo longo em ondas',
  },
  /** Fotos do estúdio desativadas até chegarem as fotos reais — mude para true para exibir */
  showStudioPhotos: false,
  studioPhotos: [
    {
      title: 'Cantinho do café',
      caption: 'Um cafezinho enquanto você relaxa.',
      src: '/images/estudio-cafe.jpg',
      alt: 'Cantinho do café do estúdio, com xícaras e cafeteira',
    },
    {
      title: 'Bancada de maquiagem',
      caption: 'Produtos selecionados para cada tipo de pele.',
      src: '/images/estudio-bancada.jpg',
      alt: 'Bancada de maquiagem organizada com pincéis e produtos',
    },
    {
      title: 'Cadeira e iluminação',
      caption: 'Luz profissional para um acabamento perfeito.',
      src: '/images/estudio-cadeira.jpg',
      alt: 'Cadeira de maquiagem com iluminação profissional',
    },
  ],
};

export const differentials = {
  title: 'Por que escolher o estúdio JD Makeup',
  /** Trecho do título em serifa itálica dourada */
  titleEmphasis: 'JD Makeup',
  items: [
    {
      icon: 'user',
      title: 'Atendimento exclusivo.',
      text: 'Uma cliente por vez, sem fila e sem barulho de salão.',
    },
    {
      icon: 'clock',
      title: 'Alta durabilidade.',
      text: 'Maquiagem pensada para aguentar o evento inteiro, do início ao fim da festa.',
    },
    {
      icon: 'palette',
      title: 'Base no tom certo.',
      text: 'Escolha cuidadosa da cor da base, testada no rosto e no colo.',
    },
    {
      icon: 'sparkles',
      title: 'Todos os tipos de cabelo.',
      text: 'Ondas, penteados e finalizações para cabelos lisos, finos, com química e cacheados.',
    },
    {
      icon: 'coffee',
      title: 'Ambiente acolhedor.',
      text: 'Cafezinho, conforto e luz profissional para você relaxar enquanto se arruma.',
    },
    {
      icon: 'map',
      title: 'Fácil de chegar.',
      text: 'No Grande Colorado; de Uber, é só buscar "Julia Damascena Makeup".',
    },
  ],
};

export const services = {
  title: 'Escolha o seu momento',
  /** Trecho do título em serifa itálica dourada */
  titleEmphasis: 'momento',
  subtitle: 'Valores fixos, sem surpresa. Reserve com um sinal de 30%.',
  cta: 'Quero agendar',
  tabsLabel: 'Categorias de serviço',
  combosTitle: 'Combos do olhar',
  extrasTitle: 'Adicionais',
  /**
   * Uma aba por categoria. Cada item vira um card:
   * título = `lead` + `emphasis` (em itálico dourado), preço, descrição, detalhes com ícone.
   * Maquiagem e cabelo: copy oficial. Cílios e sobrancelha: portfólio "Sobrancelha e Cílios JDMakeup".
   * Fotos: Instagram @juliadamascenamakeup e portfólio (originais em /brand/instagram).
   */
  categories: [
    {
      id: 'maquiagem',
      label: 'Maquiagem',
      items: [
        {
          id: 'classica',
          lead: 'Maquiagem',
          emphasis: 'Clássica',
          booking: 'a Maquiagem Clássica',
          price: 'R$ 190',
          priceValue: 190,
          description: 'A maquiagem completa, com alta durabilidade e acabamento impecável.',
          details: [
            { icon: 'clock', text: 'Cerca de 1 hora de preparação, com tempo para escolher o tom ideal da base.' },
            { icon: 'sparkles', text: 'Perfeita para casamentos, formaturas, festas e qualquer evento que dure a noite toda.' },
            { icon: 'info', text: 'Dica: venha com uma blusa que deixe o colo à mostra e sem brincos ou colares.', muted: true },
          ],
          image: {
            src: '/images/maquiagem-classica.webp',
            srcSmall: '/images/maquiagem-classica-480.webp',
            alt: 'Cliente com maquiagem clássica: pele iluminada, olhos marcados em tons marrons e batom rosado, com coque baixo',
          },
        },
        {
          id: 'express',
          lead: 'Maquiagem',
          emphasis: 'Express',
          booking: 'a Maquiagem Express',
          price: 'R$ 170',
          priceValue: 170,
          description: 'Para quem quer ficar linda em pouco tempo.',
          details: [
            { icon: 'clock', text: 'Cerca de 30 minutos, com até duas cores de sombra e sem delineado gatinho.' },
            { icon: 'sparkles', text: 'Ideal para almoços, ensaios fotográficos e eventos corporativos.' },
            { icon: 'info', text: 'Observação: durabilidade e cobertura menores que a Clássica.', muted: true },
          ],
          image: {
            src: '/images/maquiagem-express.webp',
            srcSmall: '/images/maquiagem-express-480.webp',
            alt: 'Cliente com maquiagem express leve: pele natural, sombra suave e batom nude, em ensaio ao ar livre',
          },
        },
      ],
    },
    {
      id: 'cabelo',
      label: 'Cabelo',
      note: 'O valor das ondas não inclui escova. Venha com o cabelo limpo e seco, porque o estúdio não tem lavatório. Se precisar secar no estúdio, há uma taxa de R$ 40.',
      items: [
        {
          id: 'escova',
          lead: '',
          emphasis: 'Escova',
          booking: 'a Escova',
          price: 'a partir de R$ 100',
          pricePrefix: 'a partir de',
          priceValue: 100,
          description: 'Cabelo alinhado, com brilho e movimento, pronto para o evento.',
          details: [
            { icon: 'check', text: 'Serviço à parte das ondas: combine os dois se quiser o visual completo.' },
            { icon: 'info', text: 'Venha com o cabelo limpo e seco: o estúdio não tem lavatório.', muted: true },
          ],
          image: {
            src: '/images/servicos/escova.webp',
            srcSmall: '/images/servicos/escova-480.webp',
            alt: 'Cliente sorrindo com cabelo liso escovado, com brilho e movimento',
          },
        },
        {
          id: 'ondas',
          lead: 'Penteado ou',
          emphasis: 'ondas',
          booking: 'o Penteado ou ondas',
          price: 'R$ 180',
          priceValue: 180,
          description: 'Ondas, penteados e finalizações para cabelos lisos, finos e com química.',
          details: [
            { icon: 'check', text: 'No dia, o cabelo deve estar seco naturalmente.' },
            { icon: 'info', text: 'O valor das ondas não inclui escova.', muted: true },
          ],
          image: {
            src: '/images/servicos/ondas.webp',
            srcSmall: '/images/servicos/ondas-480.webp',
            alt: 'Cabelo longo com ondas marcadas e semipreso, visto de costas',
          },
        },
        {
          id: 'cacheado',
          lead: 'Penteado ou ondas em cabelo',
          emphasis: 'cacheado',
          booking: 'o Penteado ou ondas em cabelo cacheado',
          price: 'R$ 230',
          priceValue: 230,
          description: 'Penteados e finalizações pensados para valorizar e definir os cachos.',
          details: [
            { icon: 'check', text: 'No dia, o cabelo deve estar completamente seco, não úmido, para definir bem os cachos.' },
            { icon: 'info', text: 'Se usa ativador de cachos ou dedoliss, mantenha sua rotina com creme normalmente.', muted: true },
          ],
          image: {
            src: '/images/servicos/cacheado.webp',
            srcSmall: '/images/servicos/cacheado-480.webp',
            alt: 'Penteado em cabelo cacheado com cachos definidos e acessório de pérolas e flores',
          },
        },
      ],
    },
    {
      id: 'cilios',
      label: 'Cílios',
      items: [
        {
          id: 'lash-lifting',
          lead: 'Lash',
          emphasis: 'Lifting',
          booking: 'o Lash Lifting',
          price: 'R$ 120',
          priceValue: 120,
          description: 'Técnica que realça e curva os cílios naturais, deixando-os mais longos, curvados e volumosos.',
          details: [
            { icon: 'clock', text: 'O resultado dura de 6 a 8 semanas, conforme o ciclo natural de crescimento dos cílios.' },
            { icon: 'info', text: 'Venha sem máscara de cílios para agilizar o atendimento.', muted: true },
          ],
          image: {
            src: '/images/servicos/lash-lifting.webp',
            srcSmall: '/images/servicos/lash-lifting-480.webp',
            alt: 'Close-up de cílios naturais curvados e alongados após o lash lifting',
          },
        },
      ],
      combos: [
        { name: 'Combo Lash + Brow', includes: 'Lash Lifting + Brow Lamination', price: 'R$ 240' },
        { name: 'Combo Lash + Design', includes: 'Lash Lifting + Design de sobrancelhas', price: 'R$ 165' },
      ],
    },
    {
      id: 'sobrancelha',
      label: 'Sobrancelha',
      items: [
        {
          id: 'design',
          lead: 'Design de',
          emphasis: 'sobrancelha',
          booking: 'o Design de sobrancelha',
          price: 'R$ 45',
          priceValue: 45,
          description: 'Extração dos pelos com precisão, usando cera e pinça (e navalha quando necessário).',
          details: [
            { icon: 'info', text: 'A henna ou tintura só é aplicada junto com o design feito no estúdio.', muted: true },
          ],
          extras: [
            { name: 'Henna ou tintura', price: 'R$ 15' },
            { name: 'Epilação do buço', price: 'R$ 15' },
          ],
          image: {
            src: '/images/servicos/design-sobrancelha.webp',
            srcSmall: '/images/servicos/design-sobrancelha-480.webp',
            alt: 'Close-up de sobrancelha com design definido e preenchido',
          },
        },
        {
          id: 'brow-lamination',
          lead: 'Brow',
          emphasis: 'Lamination',
          booking: 'o Brow Lamination',
          price: 'R$ 120',
          priceValue: 120,
          description: 'Ajuda a corrigir sobrancelhas desalinhadas, finas ou com falhas, para uma aparência mais simétrica.',
          details: [{ icon: 'check', text: 'Design de sobrancelha incluso.' }],
          image: {
            src: '/images/servicos/brow-lamination.webp',
            srcSmall: '/images/servicos/brow-lamination-480.webp',
            alt: 'Close-up de sobrancelha com fios alinhados e penteados para cima após o brow lamination',
          },
        },
      ],
      combos: [
        { name: 'Combo Design + Buço + Coloração', includes: 'Design de sobrancelhas + buço + henna ou tintura', price: 'R$ 75' },
        { name: 'Combo Brow + Buço', includes: 'Brow Lamination + buço', price: 'R$ 135' },
        { name: 'Combo Lash + Brow', includes: 'Lash Lifting + Brow Lamination', price: 'R$ 240' },
      ],
    },
  ],
};

export const combos = {
  title: 'Maquiagem + cabelo, num só horário',
  /** Trecho do título em serifa itálica dourada */
  titleEmphasis: 'num só horário',
  subtitle: 'Saia pronta para o evento, com o visual completo e combinando do rosto ao penteado.',
  badge: 'Mais escolhido',
  cta: 'Quero este combo',
  /** Fotos do duo (maquiagem + cabelo) — as mesmas dos cards de serviço */
  photos: {
    classica: { src: '/images/maquiagem-classica-480.webp', alt: 'Maquiagem Clássica' },
    express: { src: '/images/maquiagem-express-480.webp', alt: 'Maquiagem Express' },
    ondas: { src: '/images/servicos/ondas-480.webp', alt: 'Penteado ou ondas' },
    cacheado: { src: '/images/servicos/cacheado-480.webp', alt: 'Penteado ou ondas em cabelo cacheado' },
  },
  items: [
    { name: 'Combo 1', includes: ['Maquiagem Clássica', 'Penteado ou ondas'], price: 'R$ 370', priceValue: 370, photos: ['classica', 'ondas'], featured: true },
    { name: 'Combo 2', includes: ['Maquiagem Express', 'Penteado ou ondas'], price: 'R$ 350', priceValue: 350, photos: ['express', 'ondas'] },
    { name: 'Combo 3', includes: ['Maquiagem Clássica', 'Penteado ou ondas em cabelo cacheado'], price: 'R$ 420', priceValue: 420, photos: ['classica', 'cacheado'] },
    { name: 'Combo 4', includes: ['Maquiagem Express', 'Penteado ou ondas em cabelo cacheado'], price: 'R$ 400', priceValue: 400, photos: ['express', 'cacheado'] },
  ],
};

export const portfolio = {
  title: 'Portfólio Julia Damascena',
  titleEmphasis: 'Julia Damascena',

  lookbook: {
    title: 'Exemplos do meu trabalho',
    titleEmphasis: 'trabalho',
    touchHint: 'Toque em uma foto para ver em detalhe',
    filters: ['Todos', 'Maquiagem', 'Penteados', 'Sobrancelha e cílios'],
    cta: 'Ver mais no Instagram (@juliadamascenamakeup)',
    openLabel: 'Ampliar foto',
    hint: 'Passe o mouse sobre as fotos e veja cada resultado ganhar cor',
    items: [
      { category: 'Maquiagem', title: 'Maquiagem Clássica', src: '/images/maquiagem-classica.webp', thumb: '/images/maquiagem-classica-480.webp', alt: 'Cliente com maquiagem clássica: pele iluminada, olhos marcados em tons marrons e batom rosado, com coque baixo' },
      { category: 'Penteados', title: 'Ondas e semipreso', src: '/images/servicos/ondas.webp', thumb: '/images/servicos/ondas-480.webp', alt: 'Cabelo longo com ondas marcadas e semipreso, visto de costas' },
      { category: 'Sobrancelha e cílios', title: 'Lash Lifting', src: '/images/servicos/lash-lifting.webp', thumb: '/images/servicos/lash-lifting-480.webp', alt: 'Close-up de cílios naturais curvados e alongados após o lash lifting' },
      { category: 'Maquiagem', title: 'Maquiagem social', src: '/images/portfolio/maquiagem-social.webp', thumb: '/images/portfolio/maquiagem-social-480.webp', alt: 'Cliente de cabelo grisalho longo com maquiagem social: pele uniforme, olhos esfumados suaves e batom rosado' },
      { category: 'Penteados', title: 'Penteado em cabelo cacheado', src: '/images/servicos/cacheado.webp', thumb: '/images/servicos/cacheado-480.webp', alt: 'Penteado em cabelo cacheado com cachos definidos e acessório de pérolas e flores' },
      { category: 'Sobrancelha e cílios', title: 'Design de sobrancelha', src: '/images/servicos/design-sobrancelha.webp', thumb: '/images/servicos/design-sobrancelha-480.webp', alt: 'Close-up de sobrancelha com design definido e preenchido' },
      { category: 'Maquiagem', title: 'Maquiagem Express', src: '/images/maquiagem-express.webp', thumb: '/images/maquiagem-express-480.webp', alt: 'Cliente com maquiagem express leve: pele natural, sombra suave e batom nude, em ensaio ao ar livre' },
      { category: 'Penteados', title: 'Ondas marcadas', src: '/images/portfolio/ondas-semipreso.webp', thumb: '/images/portfolio/ondas-semipreso-480.webp', alt: 'Cabelo longo com ondas marcadas estilo clássico e mecha presa na lateral, visto de costas' },
      { category: 'Sobrancelha e cílios', title: 'Brow Lamination', src: '/images/servicos/brow-lamination.webp', thumb: '/images/servicos/brow-lamination-480.webp', alt: 'Close-up de sobrancelha com fios alinhados e penteados para cima após o brow lamination' },
      { category: 'Maquiagem', title: 'Pele leve e cílios marcados', src: '/images/portfolio/maquiagem-leve.webp', thumb: '/images/portfolio/maquiagem-leve-480.webp', alt: 'Cliente com maquiagem leve: pele luminosa, cílios curvados e gloss rosado' },
      { category: 'Penteados', title: 'Escova', src: '/images/servicos/escova.webp', thumb: '/images/servicos/escova-480.webp', alt: 'Cliente sorrindo com cabelo liso escovado, com brilho e movimento' },
    ],
  },

  book: {
    indexLabel: 'Índice do portfólio',
    prev: 'Página anterior',
    next: 'Próxima página',
    booking: 'Agendar',
    bookingLabel: 'Agendar pelo WhatsApp',
    showcase: 'Ver na vitrine',
    chapters: [
      {
        id: 'atendimento',
        label: 'Atendimento Premium',
        lead: 'Atendimento',
        emphasis: 'Premium',
        image: { src: '/images/julia-sobre.webp', alt: 'Retrato da maquiadora Julia Damascena' },
        blocks: [
          { type: 'lead', text: 'Cansada do movimento de salões? Aqui, o foco é você!' },
          {
            type: 'text',
            text: 'Venha ter um atendimento personalizado e exclusivo em um ambiente tranquilo e acolhedor, onde cada detalhe é feito para realçar sua beleza.',
          },
          { type: 'jump', text: 'Para mais informações importantes, leia a última página do portfólio.', to: 'queridas-clientes', label: 'Ir para a última página' },
        ],
      },
      {
        id: 'maquiagem',
        label: 'Maquiagem',
        lead: '',
        emphasis: 'Maquiagem',
        showcase: '#servicos-maquiagem',
        image: { src: '/images/maquiagem-classica.webp', alt: 'Cliente com maquiagem clássica' },
        blocks: [
          {
            type: 'services',
            items: [
              {
                name: 'Maquiagem',
                emphasis: 'Clássica',
                text: 'Essa maquiagem tem alta durabilidade. São 1 hora de preparação. Para ajudar na escolha do tom ideal da base, pedimos que venha com uma blusa que deixe o colo à mostra e sem acessórios como brincos e colares.',
                price: 'R$ 190,00',
              },
              {
                name: 'Maquiagem',
                emphasis: 'Express',
                text: 'Ideal para eventos rápidos, como almoços, sessão de fotos ou eventos corporativos. Durabilidade e cobertura inferiores à Clássica, apenas duas cores de sombra e sem delineado gatinho. São 30 minutos de preparação.',
                price: 'R$ 170,00',
              },
            ],
          },
          {
            type: 'notice',
            text: 'Para reservar seu horário, é requisitado o pagamento de um adiantamento equivalente a 30% do valor total no momento da marcação do horário.',
          },
        ],
      },
      {
        id: 'cabelo',
        label: 'Ondas e penteados',
        lead: 'Cabelo:',
        emphasis: 'ondas e penteados',
        showcase: '#servicos-cabelo',
        image: { src: '/images/servicos/ondas.webp', alt: 'Cabelo com ondas marcadas e semipreso' },
        blocks: [
          {
            type: 'menu',
            rows: [
              { name: 'Escova', price: 'a partir de R$ 100,00' },
              { name: 'Penteado / ondas', price: 'R$ 180,00' },
              { name: 'Penteado / ondas em cabelo cacheado', price: 'R$ 230,00' },
            ],
          },
          {
            type: 'alert',
            label: 'Lembre-se:',
            text: 'a cliente precisa vir com o cabelo limpo e seco. Caso a cliente venha com o cabelo molhado, será cobrada uma taxa de R$ 40,00 para secar.',
          },
          {
            type: 'notice',
            text: 'Para reservar seu horário, é requisitado o pagamento de um adiantamento equivalente a 30% do valor total no momento da marcação do horário.',
          },
        ],
      },
      {
        id: 'olhar',
        label: 'Sobrancelha e cílios',
        lead: 'Sobrancelha e',
        emphasis: 'cílios',
        showcase: '#servicos-sobrancelha',
        image: { src: '/images/servicos/design-sobrancelha.webp', alt: 'Close-up de sobrancelha com design definido' },
        blocks: [
          {
            type: 'services',
            items: [
              {
                name: 'Design de',
                emphasis: 'sobrancelha',
                text: 'A extração dos pelos é executada com precisão, utilizando cera e pinça (e navalha quando necessário). Além disso, destaco que não realizo a aplicação de henna sem a prévia execução do design de sobrancelha aqui no estúdio.',
                price: 'R$ 45,00',
                extras: [
                  { name: 'Aplicação de henna / tintura', price: 'R$ 15,00' },
                  { name: 'Epilação do buço', price: 'R$ 15,00' },
                ],
              },
              {
                name: 'Lash',
                emphasis: 'Lifting',
                text: 'É uma técnica cosmética projetada para realçar e curvar os cílios naturais. O resultado final são cílios que parecem mais longos, curvados e volumosos. Este procedimento geralmente dura de 6 a 8 semanas, dependendo do ciclo natural de crescimento dos cílios de cada pessoa.',
                price: 'R$ 120,00',
              },
              {
                name: 'Brow',
                emphasis: 'Lamination',
                text: 'Esse procedimento pode ajudar a corrigir sobrancelhas desalinhadas, finas ou com falhas, proporcionando uma aparência mais simétrica e atraente. Nesse serviço está incluso o design de sobrancelhas.',
                price: 'R$ 120,00',
              },
            ],
          },
          {
            type: 'notice',
            text: 'Para reservar seu horário, é requisitado o pagamento de um adiantamento equivalente a 30% do valor total no momento da marcação do horário.',
          },
        ],
      },
      {
        id: 'combos',
        label: 'Combos favoritos',
        lead: 'Combos',
        emphasis: 'favoritos',
        showcase: '#combos',
        image: { src: '/images/portfolio/ondas-semipreso.webp', alt: 'Cabelo com ondas marcadas e mecha presa na lateral' },
        blocks: [
          {
            type: 'menu',
            title: 'Maquiagem e cabelo',
            rows: [
              { name: 'Combo 1', includes: 'Maquiagem Clássica + penteado / ondas', price: 'R$ 370,00' },
              { name: 'Combo 2', includes: 'Maquiagem Express + penteado / ondas', price: 'R$ 350,00' },
              { name: 'Combo 3', includes: 'Maquiagem Clássica + penteado / ondas em cabelo cacheado', price: 'R$ 420,00' },
              { name: 'Combo 4', includes: 'Maquiagem Express + penteado / ondas em cabelo cacheado', price: 'R$ 400,00' },
            ],
          },
          {
            type: 'menu',
            title: 'Sobrancelha e cílios',
            rows: [
              { name: 'Combo Lash + Brow', includes: 'Lash Lifting + Brow Lamination', price: 'R$ 240,00' },
              { name: 'Combo Design / Buço / Coloração', includes: 'Design de sobrancelhas + buço + henna ou tintura', price: 'R$ 75,00' },
              { name: 'Combo Lash + Design', includes: 'Lash Lifting + design de sobrancelhas', price: 'R$ 165,00' },
              { name: 'Combo Brow + Buço', includes: 'Brow Lamination + buço', price: 'R$ 135,00' },
            ],
          },
          {
            type: 'notice',
            text: 'Para agendar seu horário, é necessário pagar sinal no ato do agendamento, referente a 30% do valor total!',
          },
        ],
      },
      {
        id: 'pagamento',
        label: 'Formas de pagamento',
        lead: 'Formas de',
        emphasis: 'pagamento',
        image: { src: '/images/portfolio/maquiagem-social.webp', alt: 'Cliente com maquiagem social' },
        blocks: [
          {
            type: 'notice',
            text: 'Para agendar seu horário, é necessário pagar sinal no ato do agendamento, referente a 30% do valor total! Pode ser no Pix ou no link de pagamento.',
          },
          {
            type: 'payments',
            items: [
              { icon: 'pix', method: 'Pix', text: 'A chave Pix é enviada pelo WhatsApp no agendamento. Se for necessário, solicite o QR Code.' },
              { icon: 'card', method: 'Cartão (crédito / débito)', text: 'Com acréscimo de 5%.' },
              { icon: 'cash', method: 'Dinheiro', text: 'Já traga trocadinho para agilizar na hora do pagamento.' },
              { icon: 'link', method: 'Link de pagamento (crédito)', text: 'Com acréscimo.' },
            ],
          },
        ],
      },
      {
        id: 'preparacao',
        label: 'Preparação',
        lead: '',
        emphasis: 'Preparação',
        image: { src: '/images/portfolio/maquiagem-leve.webp', alt: 'Cliente com pele preparada e maquiagem leve' },
        blocks: [
          {
            type: 'list',
            title: 'Maquiagem',
            items: [
              'Rosto lavado e totalmente sem produtos (inclusive sem filtro solar).',
              'No dia, não faça tratamentos nem use produtos que descamem a pele ou a deixem sensível.',
              'Durante a semana, hidrate bem a pele e os lábios.',
              'Se tiver alguma sensibilidade ou alergia a algum tipo de produto ou marca, avise.',
            ],
          },
          {
            type: 'list',
            title: 'Penteados / ondas — cabelos lisos, com química e finos',
            items: [
              'Lave o cabelo passando o shampoo duas vezes para limpar bem a raiz. Condicionador: apenas a quantidade de 1 moeda, passando só nas pontas.',
              'No dia, o cabelo deve estar seco naturalmente.',
              'Hidratações e tratamentos capilares não podem ser feitos no dia.',
            ],
          },
          {
            type: 'list',
            title: 'Cabelos cacheados',
            items: [
              'Caso faça uso de dedoliss ou ativadores de cachos, mantenha da forma usual, com creme. No dia do atendimento, o cabelo deve estar completamente seco (e não úmido), para a definição dos cachos.',
            ],
          },
          {
            type: 'list',
            title: 'Importante',
            items: [
              'Use uma blusa ou vestido fácil de tirar, para não prejudicar a maquiagem e o penteado.',
              'Vamos precisar que você tenha salvas 2 inspirações de maquiagem e penteado.',
              'Evite mexer no celular no momento da maquiagem, para não atrasar.',
            ],
          },
          {
            type: 'alert',
            label: 'Atenção:',
            text: 'em caso do não cumprimento das recomendações de pré-atendimento do penteado, será cobrada uma taxa de R$ 40,00.',
          },
        ],
      },
      {
        id: 'queridas-clientes',
        label: 'Queridas clientes',
        lead: 'Queridas',
        emphasis: 'clientes',
        image: { src: '/images/servicos/cacheado.webp', alt: 'Penteado em cabelo cacheado com acessório de pérolas' },
        blocks: [
          {
            type: 'rules',
            items: [
              'O valor das ondas é apenas das ondas: não está inclusa a escova.',
              'Para as ondas e o penteado, é necessário que a cliente venha com o cabelo limpo e seco, pois não temos lavatório no estúdio.',
              'Para agilizar nosso atendimento no lash lifting, é importante que venha sem máscara de cílios.',
              'Para garantir seu agendamento, solicito um pagamento antecipado de 30%, via Pix ou link de pagamento (com taxa). O valor não será reembolsado em caso de cancelamento após 7 dias da confirmação ou no dia do atendimento.',
              'Para garantir um atendimento tranquilo, pedimos que as mães evitem trazer crianças ao estúdio. Caso tragam, é essencial que uma pessoa esteja exclusivamente responsável por acompanhar a criança, sem estar em atendimento.',
            ],
          },
          {
            type: 'address',
            label: 'Endereço:',
            text: 'Grande Colorado, Área Comercial do Europa 1. Em cima da Lotus Odontologia, em frente à Pão Nosso. Se vier de Uber, é só colocar "Julia Damascena Makeup" no aplicativo.',
          },
        ],
      },
    ],
  },
};

export const testimonials = {
  title: 'O que as clientes dizem',
  titleEmphasis: 'dizem',
  subtitle: 'Comentários reais, deixados pelas próprias clientes nos posts do Instagram.',
  author: 'juliadamascenamakeup',
  commentLabel: 'Comentário da cliente',
  viewPost: 'Ver post no Instagram',
  prev: 'Depoimento anterior',
  next: 'Próximo depoimento',
  /**
   * Comentários copiados exatamente como estão nos posts de @juliadamascenamakeup
   * (curtidas e datas conferidas em 07/10/2026). Fotos: o próprio post.
   * Antes de publicar, confirmar com cada cliente a autorização de uso no site.
   */
  items: [
    {
      occasion: 'Formatura',
      caption: '✨ Uma beleza que merece ser celebrada! ✨',
      likes: 47,
      date: '23 de setembro',
      url: 'https://www.instagram.com/juliadamascenamakeup/p/DdpJwLmIKeC/',
      image: {
        src: '/images/depoimentos/formatura.webp',
        srcSmall: '/images/depoimentos/formatura-400.webp',
        alt: 'Formanda de beca sorrindo, com maquiagem e cabelo cacheado em tranças',
      },
      comment: { user: 'm4riakkjs', text: 'Julia você é maravilhosa! Um amor de pessoa e faz maquiagens incríveis. Muito obrigada! ❤️' },
    },
    {
      occasion: 'Penteado de madrinha',
      caption: 'Esse em específico fiz para uma madrinha, ficou belíssima e elegante. 💕',
      likes: 16,
      date: '16 de abril',
      url: 'https://www.instagram.com/juliadamascenamakeup/p/DXMk_1hDy6u/',
      image: {
        src: '/images/depoimentos/madrinha.webp',
        srcSmall: '/images/depoimentos/madrinha-400.webp',
        alt: 'Penteado preso em coque baixo elegante, visto de lado, em madrinha de vestido vermelho',
      },
      comment: { user: 'katiucia_santos_souza', text: 'Sim, ficou lindo delicado e permaneceu intacto por mais de 10 horas. Impecável ❤️' },
    },
    {
      occasion: 'Noiva · make + penteado',
      caption: 'Tem amizades que o tempo não leva… só fortalece. 🤍',
      likes: 24,
      date: '20 de maio',
      url: 'https://www.instagram.com/juliadamascenamakeup/p/DYkJHyaiEgn/',
      image: {
        src: '/images/depoimentos/noiva.webp',
        srcSmall: '/images/depoimentos/noiva-400.webp',
        alt: 'Noiva com cabelo cacheado definido, detalhes em pérolas e maquiagem delicada',
      },
      comment: { user: 'ju_rabelo_', text: 'Muito obrigada por tudo: pela make, pelo penteado e principalmente pela amizade ❤️' },
    },
    {
      occasion: 'Ensaio fotográfico',
      caption: '✨ Uma maquiagem leve, iluminada e atemporal para eternizar esse momento tão especial ✨',
      likes: 40,
      date: '15 de maio',
      url: 'https://www.instagram.com/juliadamascenamakeup/p/DYX1Gznjxtv/',
      image: {
        src: '/images/depoimentos/ensaio.webp',
        srcSmall: '/images/depoimentos/ensaio-400.webp',
        alt: 'Casal abraçado em um campo durante ensaio, ela com maquiagem leve e cabelo loiro ondulado',
      },
      comment: { user: 'cindycamargos', text: 'Perfeita! Natural e linda exatamente como eu pedi. Obrigada pelo trabalho excelente de sempre 🤩✨' },
    },
    {
      occasion: 'Ensaio gestante',
      caption: 'Tem fases da vida que merecem ser guardadas pra sempre… e a gestação é uma delas 🤍✨',
      likes: 16,
      date: '11 de maio',
      url: 'https://www.instagram.com/juliadamascenamakeup/p/DYNiOLxgSKB/',
      image: {
        src: '/images/depoimentos/gestante.webp',
        srcSmall: '/images/depoimentos/gestante-400.webp',
        alt: 'Gestante de vestido azul-claro e tiara de flores, com cabelo longo cacheado, em ensaio ao ar livre',
      },
      comment: { user: 'kah_silva429', text: 'Muito obrigada por fazer parte de um momento tão especial na minha vida❤️❤️❤️❤️a maquiagem ficou simplesmente perfeita' },
    },
    {
      occasion: 'Design de sobrancelha',
      caption: '✨ Design de sobrancelhas ✨',
      likes: 19,
      date: '4 de setembro',
      url: 'https://www.instagram.com/juliadamascenamakeup/p/Dc3VH_7Ai9M/',
      image: {
        src: '/images/portfolio/maquiagem-leve.webp',
        srcSmall: '/images/portfolio/maquiagem-leve-480.webp',
        alt: 'Cliente com sobrancelhas recém-desenhadas, naturais e definidas',
      },
      comment: { user: 'marianaareal', text: 'Eu amo! A única que toca na minha sobrancelha a anos 😍' },
    },
  ],
};

export const howToBook = {
  title: 'Agendar é simples',
  titleEmphasis: 'simples',
  subtitle: 'Atendimento somente com hora marcada. Veja como garantir o seu horário:',
  /** Etapas conforme a agenda online e o link da bio da Julia */
  steps: [
    { icon: 'sparkles', title: 'Escolha o serviço', text: 'Maquiagem, cabelo, sobrancelha, cílios ou um dos combos.' },
    {
      icon: 'calendar',
      title: 'Escolha a data e o horário',
      text: 'Pela agenda online, em poucos passos, ou pelo WhatsApp, informando a data, o horário e o evento.',
    },
    {
      icon: 'hourglass',
      title: 'Pré-agendamento',
      text: 'O agendamento feito pelo site é um pré-agendamento e fica sujeito à confirmação da profissional.',
    },
    {
      icon: 'wallet',
      title: 'Garanta com o sinal',
      text: 'A reserva é confirmada com o pagamento antecipado de 30% do valor, por Pix ou link de pagamento. Exceto para o design de sobrancelhas.',
      link: { href: '#portfolio-pagamento', label: 'Ver formas de pagamento' },
    },
    {
      icon: 'check',
      title: 'Confirmação no WhatsApp',
      text: 'Em breve você recebe a atualização do seu horário pelo WhatsApp. Depois, é só se preparar e vir relaxar.',
      link: { href: '#portfolio-preparacao', label: 'Ver orientações de preparação' },
    },
  ],
  card: {
    eyebrow: 'Somente com hora marcada',
    title: 'Reserve o seu horário',
    titleEmphasis: 'horário',
    text: 'Escolha a forma mais confortável para você.',
    online: { label: 'Agendar online', hint: 'Serviço, data e horário em poucos passos' },
    whatsapp: { label: 'Chamar no WhatsApp', hint: 'Fale direto com a Julia' },
    notes: [
      'Sinal de 30% para confirmar (exceto design de sobrancelhas)',
      'Pix ou link de pagamento',
      'Confirmação do horário pelo WhatsApp',
    ],
  },
};

export const faq = {
  title: 'Dúvidas comuns',
  titleEmphasis: 'comuns',
  aside: {
    title: 'Ainda ficou com dúvida?',
    titleEmphasis: 'dúvida?',
    text: 'Chame no WhatsApp e fale direto com a Julia. As regras completas de agendamento estão no portfólio.',
    whatsapp: 'Falar com a Julia',
    rules: 'Ver regras do estúdio',
  },
  items: [
    {
      q: 'Preciso pagar algo para reservar?',
      a: 'Sim. O horário é garantido com um sinal de 30% do valor total, pago por Pix ou link de pagamento no momento do agendamento.',
    },
    {
      q: 'E se eu precisar cancelar?',
      a: 'O sinal não é reembolsado em cancelamentos feitos após 7 dias da confirmação ou no dia do atendimento.',
    },
    {
      q: 'Qual maquiagem escolher: Clássica ou Express?',
      a: 'A Clássica tem mais cobertura e durabilidade, ideal para festas longas. A Express é mais rápida e leve, ótima para almoços, fotos e eventos de trabalho.',
    },
    {
      q: 'Quanto tempo dura o atendimento?',
      a: 'Cerca de 1 hora para a Maquiagem Clássica e 30 minutos para a Express. No cabelo, o penteado ou as ondas levam cerca de 1h30 (2 horas em cabelo cacheado). Nos combos, considere os dois tempos.',
    },
  ],
};

export const location = {
  eyebrow: 'Onde estamos',
  title: 'Venha conhecer o estúdio',
  titleEmphasis: 'estúdio',
  subtitle: 'Um espaço tranquilo e acolhedor no Grande Colorado, pensado para você se sentir em casa.',
  address: {
    label: 'Endereço',
    text: 'Grande Colorado, Área Comercial do Europa 1 — em cima da Lotus Odontologia, em frente à Pão Nosso. Brasília/DF.',
  },
  tip: { label: 'Vindo de Uber?', text: 'É só buscar "Julia Damascena Makeup" no aplicativo.' },
  hours: { label: 'Atendimento', text: 'Somente com hora marcada.' },
  directions: 'Como chegar',
  cta: 'Abrir no mapa',
  mapLabel: 'Estúdio JD Makeup',
};

export const finalCta = {
  title: 'Seu próximo evento merece esse cuidado.',
  titleEmphasis: 'cuidado.',
  text: 'Os horários são limitados, porque cada atendimento é exclusivo. Garanta o seu com antecedência.',
  badge: 'Somente com hora marcada',
  online: 'Agendar online',
  cta: 'Agendar pelo WhatsApp',
  image: { src: '/images/hero-julia.webp', alt: '' },
};

export const footer = {
  brand: 'Julia Damascena Makeup — Maquiagem e Penteado',
  tagline: 'Especialista em realçar sua beleza natural.',
  navTitle: 'Navegue',
  contactTitle: 'Contato',
  studioTitle: 'Estúdio',
  whatsappLabel: 'WhatsApp',
  instagramLabel: 'Instagram',
  bookingLabel: 'Agenda online',
  reviewLabel: 'Avalie no Google',
  place: 'Grande Colorado, Área Comercial do Europa 1 — Brasília/DF',
  hours: 'Somente com hora marcada',
  directions: 'Como chegar',
  backToTop: 'Voltar ao topo',
  copyright: '© 2026 Julia Damascena Makeup. Todos os direitos reservados.',
};

export const floatingCta = 'Agendar';
