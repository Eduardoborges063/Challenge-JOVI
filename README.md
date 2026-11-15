# 📸 JOVI — Câmera de Memórias

Aplicação web que permite ao usuário registrar memórias de lugares através de fotos, avaliar locais visitados, interagir com a comunidade e acompanhar sua evolução dentro da plataforma através de um sistema de níveis e XP.

## 🚀 Funcionalidades

### 📷 Câmera
- Captura ou seleção de foto para reconhecimento de local
- Formulário de informações da foto: local, avaliação (estrelas) e feedback
- Painel de memórias locais próximas, com avaliação em estrelas (cheia, meia e vazia)
- Feed da comunidade com publicações de outros usuários
- Bloco de evolução (XP e progresso do desafio semanal)

### 🔍 Busca
- Busca única por **pessoas e lugares** simultaneamente
- Resultados diferenciados visualmente (avatar de pessoa vs. ícone de local)
- Expansão de resultados para ver mais detalhes
- Sistema de privacidade: fotos de perfil só ficam visíveis para amigos; caso contrário, é possível enviar solicitação de amizade

### ⭐ Avaliações da Comunidade
- Cada avaliação mostra quem avaliou (foto de perfil, nome e estrelas)
- Expansão para ver local avaliado, foto, feedback completo e data
- Sistema de comentários, com contador e expansão independente

### 🧩 Recursos do JOVI
- Lista de recursos da aplicação (Câmera AR, Mapa de Memórias, Feedback com IA, Desafios Semanais)
- Ícones representativos para cada recurso

### 👤 Perfil
- Sistema de progressão: Nível 0 até Nível 100, com barra de XP
- Alteração de foto de perfil
- Personalização de fundo do perfil (estilo Discord)
- Decorações opcionais ao redor do avatar (padrão, dourada, roxa, verde)
- Edição do nome de usuário
- Galeria com as fotos adicionadas pelo próprio usuário

## 🛠️ Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript** (ES Modules)
- **Tailwind CSS** (via CDN)
- **Phosphor Icons** (via CDN, fonte de ícones)
- Tema customizado em `css/style.css` (tokens, dock flutuante, animações)

## 📁 Estrutura do projeto

```
JOVI/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── model/
│   │   └── data.js        # Dados da aplicação (pessoas, locais, avaliações, perfil, etc.)
│   ├── view/
│   │   └── render.js       # Funções responsáveis por renderizar os dados na tela
│   └── app.js               # Controle de eventos, navegação entre telas e lógica geral
└── assets/
    └── img/
```

A organização segue uma lógica inspirada em **model/view**:
- **model** → onde os dados vivem (`data.js`)
- **view** → onde os dados são transformados em HTML (`render.js`)
- **app.js** → o "controlador", que decide quando cada função de renderização é chamada e conecta os eventos da interface

## ▶️ Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Eduardoborges063/Challenge-JOVI.git
   ```
2. Abra a pasta do projeto no VS Code (ou editor de sua preferência)
3. Use a extensão **Live Server** para abrir o `index.html`, ou abra o arquivo diretamente no navegador

> Não é necessário instalar dependências — o Tailwind é carregado via CDN.

## 📌 Status

Projeto em desenvolvimento como atividade acadêmica.

## ✍️ Autor

Eduardo Borges
