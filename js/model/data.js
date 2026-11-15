// ===== TELA 1 - CÂMERA =====

export const cameraInfo = {
  titulo: "Câmera de Memórias JOVI",
  proximos: 3,
  reconhecimento: {
    status: "Buscando...",
    perfilEncontrado: null
  }
};

// ===== BUSCA: PESSOAS (1 exemplo, conforme pedido) =====
export const pessoas = [
  {
    id: 1,
    nome: "Camila Andrade",
    usuario: "@camila.andrade",
    amizade: "amigo",
    fotos: [
      { id: 1, legenda: "Parque Ibirapuera" }
    ]
  }
];

// ===== BUSCA: LUGARES (locais reais) =====
export const memoriasLocais = [
  {
    id: 1,
    nome: "Parque Ibirapuera",
    avaliacao: 4.5,
    distancia: "50m",
    icone: "tree",
    info: "Parque urbano em São Paulo, com lagos, museus e áreas verdes."
  },
  {
    id: 2,
    nome: "Cristo Redentor",
    avaliacao: 5,
    distancia: "100m",
    icone: "mountains",
    info: "Monumento no Rio de Janeiro, uma das Sete Maravilhas do Mundo Moderno."
  },
  {
    id: 3,
    nome: "Cataratas do Iguaçu",
    avaliacao: 5,
    distancia: "80m",
    icone: "waves",
    info: "Conjunto de quedas d'água em Foz do Iguaçu, na fronteira com a Argentina."
  }
];

// ===== FEED COMUNIDADE (6 exemplos, mais natural) =====
export const feedComunidade = [
  { id: 1, autor: "Camila Andrade", texto: "Hoje visitei o Parque Ibirapuera e tirei fotos incríveis do lago!", tipo: "publico" },
  { id: 2, autor: "Rafael Souza", texto: "Consegui subir até o Cristo Redentor, a vista é de tirar o fôlego.", tipo: "publico" },
  { id: 3, autor: "Beatriz Lima", texto: "As Cataratas do Iguaçu são ainda mais lindas pessoalmente.", tipo: "publico" },
  { id: 4, autor: "Thiago Martins", texto: "Adicionei um novo mural que encontrei no centro da cidade.", tipo: "publico" },
  { id: 5, autor: "Fernanda Costa", texto: "Alguém mais recomenda ir ao Ibirapuera de manhã cedo?", tipo: "publico" },
  { id: 6, autor: "Lucas Oliveira", texto: "Registrei minha primeira memória no app hoje!", tipo: "publico" }
];

// ===== TELA 3 - AVALIAÇÕES DA COMUNIDADE (1 exemplo) =====
export const avaliacoesComunidade = [
  {
    id: 1,
    nome: "Rafael Souza",
    usuario: "@rafael.souza",
    avaliacao: 5,
    local: "Cristo Redentor",
    fotoLocal: null,
    feedback: "Vista incrível, vale muito a pena subir de trem para ver o pôr do sol.",
    data: "Avaliado há 2 dias",
    comentarios: [
      { id: 1, autor: "Camila Andrade", texto: "Já fui, é maravilhoso mesmo!" }
    ]
  }
];

// ===== TELA 4 - RECURSOS DO JOVI (com ícones) =====
export const recursosJovi = [
  { id: 1, titulo: "Câmera AR", desc: "Capture memórias e veja marcadores de lugares próximos em tempo real", icone: "camera" },
  { id: 2, titulo: "Mapa de Memórias", desc: "Veja tudo o que a comunidade já registrou perto de você", icone: "map-trifold" },
  { id: 3, titulo: "Feedback com IA", desc: "Receba dicas automáticas para melhorar suas fotos e registros", icone: "robot" },
  { id: 4, titulo: "Desafios Semanais", desc: "Complete metas e ganhe XP para subir de nível", icone: "trophy" }
];

// ===== TELA 5 - PERFIL =====

export const NIVEL_MAXIMO = 100;

export const perfilUsuario = {
  nome: "Você",
  nivel: 0,
  tituloNivel: "Iniciante",
  xpTotal: 0,
  memorias: 0,
  desafios: "0/10",
  xpAtual: 0,
  xpMeta: 100,
  proximoNivel: 1,
  avatarUrl: null,
  fundoUrl: null,
  decoracao: null
};

// ===== FOTOS ADICIONADAS PELO USUÁRIO =====
export const minhasFotos = [];