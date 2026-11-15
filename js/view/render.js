import {
  memoriasLocais,
  feedComunidade,
  avaliacoesComunidade,
  recursosJovi,
  perfilUsuario,
  pessoas,
  minhasFotos,
  NIVEL_MAXIMO
} from '../model/data.js';

// ===== ESTRELAS COM 3 ESTADOS =====
export function renderEstrelas(nota) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (nota >= i) {
      html += `<i class="ph-fill ph-star text-yellow-400"></i>`;
    } else if (nota >= i - 0.5) {
      html += `
        <i class="ph-fill ph-star-half text-yellow-400"></i>`;
    } else {
      html += `<i class="ph ph-star text-slate-600"></i>`;
    }
  }
  return html;
}

export function renderMemoriasLocais() {
  const container = document.getElementById('lista-memorias-locais');
  const titulo = document.getElementById('titulo-memorias-locais');

  titulo.textContent = `MEMÓRIAS LOCAIS (${memoriasLocais.length})`;

  container.innerHTML = memoriasLocais.map(item => `
    <li class="flex flex-col">
      <span class="font-semibold">${item.nome}</span>
      <span>${renderEstrelas(item.avaliacao)}</span>
      <span class="text-slate-500">${item.distancia}</span>
    </li>
  `).join('');
}

// ===== FOTO DA CÂMERA (Tela 1) =====

let fotoAtualUrl = null;

export function mostrarFormularioFoto(fotoUrl, localSugerido) {
  fotoAtualUrl = fotoUrl;
  document.getElementById('estado-sem-foto').classList.add('hidden');

  const card = document.getElementById('perfil-foto-card');
  card.classList.remove('hidden');

  document.getElementById('perfil-foto-img').src = fotoUrl;
  document.getElementById('input-local-foto').value = localSugerido?.nome || '';
  document.getElementById('input-feedback-foto').value = '';

  renderEstrelasEditaveis(localSugerido?.avaliacao ? Math.round(localSugerido.avaliacao) : 0);
}

export function resetarFormularioFoto() {
  fotoAtualUrl = null;
  document.getElementById('perfil-foto-card').classList.add('hidden');
  document.getElementById('estado-sem-foto').classList.remove('hidden');
  document.getElementById('input-local-foto').value = '';
  document.getElementById('input-feedback-foto').value = '';
  renderEstrelasEditaveis(0);
}

// Evita injetar HTML vindo do usuário (nome do local etc.) nos templates
export function escapeHtml(texto = '') {
  return String(texto).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export function getFotoAtualUrl() {
  return fotoAtualUrl;
}

export function adicionarMinhaFoto(foto) {
  minhasFotos.push(foto);
}

let notaSelecionada = 0;

export function renderEstrelasEditaveis(notaInicial = 0) {
  notaSelecionada = notaInicial;
  const container = document.getElementById('estrelas-editaveis');

  container.innerHTML = [1, 2, 3, 4, 5].map(i => `
    <span data-valor="${i}" class="${i <= notaSelecionada ? 'text-yellow-400' : 'text-slate-600'}"><i class="${i <= notaSelecionada ? 'ph-fill' : 'ph'} ph-star"></i></span>
  `).join('');

  container.querySelectorAll('span').forEach(estrela => {
    estrela.addEventListener('click', () => {
      notaSelecionada = Number(estrela.dataset.valor);
      renderEstrelasEditaveis(notaSelecionada);
    });
  });
}

export function getNotaSelecionada() {
  return notaSelecionada;
}

// ===== FEEDBACK + EVOLUÇÃO =====
export function renderFeedbackEvolucao() {
  document.getElementById('evolucao-xp').textContent =
    `XP: ${perfilUsuario.xpTotal.toLocaleString('pt-BR')}`;
  document.getElementById('evolucao-nivel').textContent = `NÍVEL ${perfilUsuario.nivel}`;

  const percentualXp = Math.min((perfilUsuario.xpAtual / perfilUsuario.xpMeta) * 100, 100);
  document.getElementById('evolucao-barra').style.width = `${percentualXp}%`;

  const [feitos, meta] = perfilUsuario.desafios.split('/').map(Number);
  const percentualDesafio = meta > 0 ? (feitos / meta) * 100 : 0;
  document.getElementById('desafio-barra').style.width = `${percentualDesafio}%`;
  document.getElementById('desafio-label').textContent = `${perfilUsuario.desafios} Fotos`;
  document.getElementById('feedback-fotos-label').textContent = `${perfilUsuario.desafios} Fotos`;
}

export function renderFeedComunidade() {
  const container = document.getElementById('lista-feed-comunidade');
  container.innerHTML = feedComunidade.map(post => `
    <li class="bg-slate-900 rounded-xl p-3">
      <p class="font-semibold text-sm">${post.autor}</p>
      <p class="text-xs text-slate-400">${post.texto}</p>
    </li>
  `).join('');
}

// ===== BUSCA (pessoas + lugares) - TELA 2 =====

let resultadoExpandidoId = null;

function gerarIniciais(nome) {
  return nome.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

function labelAmizade(status) {
  if (status === 'amigo') return { texto: 'Amigos', cor: 'text-lime-400' };
  if (status === 'pendente') return { texto: 'Solicitação enviada', cor: 'text-yellow-400' };
  return { texto: 'Sem conexão', cor: 'text-slate-500' };
}

export function renderResultadosBusca(termo = '') {
  const container = document.getElementById('lista-resultados-busca');
  const buscaLower = termo.toLowerCase();

  const lugaresEncontrados = memoriasLocais
    .filter(item => item.nome.toLowerCase().includes(buscaLower))
    .map(item => ({ ...item, tipoResultado: 'lugar' }));

  const pessoasEncontradas = pessoas
    .filter(item =>
      item.nome.toLowerCase().includes(buscaLower) ||
      item.usuario.toLowerCase().includes(buscaLower)
    )
    .map(item => ({ ...item, tipoResultado: 'pessoa' }));

  const resultados = [...pessoasEncontradas, ...lugaresEncontrados];

  if (resultados.length === 0) {
    container.innerHTML = `
      <li class="empty-state">
        <i class="ph ph-magnifying-glass"></i>
        <p>Nada encontrado para “${escapeHtml(termo)}”</p>
        <span>Tente outro nome de pessoa ou lugar.</span>
      </li>`;
    return;
  }

  container.innerHTML = resultados.map(item => {
    const expandido = resultadoExpandidoId === `${item.tipoResultado}-${item.id}`;
    return item.tipoResultado === 'pessoa'
      ? renderResultadoPessoa(item, expandido)
      : renderResultadoLugar(item, expandido);
  }).join('');

  ligarEventosResultados();
}

function renderResultadoPessoa(item, expandido) {
  const status = labelAmizade(item.amizade);

  return `
    <li class="bg-slate-900 rounded-xl overflow-hidden">
      <button data-id="pessoa-${item.id}" class="btn-expandir w-full flex items-center gap-3 p-3 text-left">
        <span class="w-9 h-9 rounded-full bg-blue-800 flex items-center justify-center text-xs font-bold shrink-0">
          ${gerarIniciais(item.nome)}
        </span>
        <div class="flex-1">
          <p class="font-semibold text-sm">${item.nome} <span class="text-slate-500 font-normal">${item.usuario}</span></p>
          <p class="text-[11px] text-slate-500">Pessoa</p>
        </div>
        <span class="text-slate-500 text-xs"><i class="ph ph-caret-${expandido ? 'up' : 'down'}"></i></span>
      </button>

      ${expandido ? `
        <div class="px-3 pb-3 border-t border-slate-800 pt-3">
          <p class="text-xs ${status.cor} mb-2">${status.texto}</p>

          ${item.amizade === 'nenhuma' ? `
            <button data-id="${item.id}" class="btn-solicitar-amizade bg-yellow-400 text-slate-900 text-xs font-semibold rounded-lg px-3 py-2 mb-3">
              Solicitar amizade
            </button>
          ` : ''}

          ${item.amizade === 'amigo' ? `
            <div class="grid grid-cols-3 gap-2">
              ${item.fotos.map(foto => `
                <div class="bg-slate-800 rounded-lg h-16 flex items-center justify-center text-[10px] text-slate-400 text-center p-1">
                  ${foto.legenda}
                </div>
              `).join('')}
            </div>
          ` : `
            <p class="text-xs text-slate-500">
              <i class="ph-fill ph-lock-simple"></i> As fotos deste perfil são privadas. Adicione ${item.nome.split(' ')[0]} como amigo para visualizar.
            </p>
          `}
        </div>
      ` : ''}
    </li>
  `;
}

function renderResultadoLugar(item, expandido) {
  return `
    <li class="bg-slate-900 rounded-xl overflow-hidden">
      <button data-id="lugar-${item.id}" class="btn-expandir w-full flex items-center gap-3 p-3 text-left">
        <span class="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-base shrink-0">
          <i class="ph-fill ph-${item.icone}"></i>
        </span>
        <div class="flex-1">
          <p class="font-semibold text-sm">${item.nome}</p>
          <p class="text-[11px] text-slate-500">${item.distancia}</p>
        </div>
        <span class="text-slate-500 text-xs"><i class="ph ph-caret-${expandido ? 'up' : 'down'}"></i></span>
      </button>

      ${expandido ? `
        <div class="px-3 pb-3 border-t border-slate-800 pt-3">
          <p class="text-xs text-slate-400 mb-2">${item.info}</p>
          <div class="grid grid-cols-3 gap-2">
            <div class="bg-slate-800 rounded-lg h-16 flex items-center justify-center text-[10px] text-slate-500">
              Sem fotos ainda
            </div>
          </div>
        </div>
      ` : ''}
    </li>
  `;
}

function ligarEventosResultados() {
  document.querySelectorAll('.btn-expandir').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      resultadoExpandidoId = resultadoExpandidoId === id ? null : id;
      renderResultadosBusca(document.getElementById('input-busca').value);
    });
  });

  document.querySelectorAll('.btn-solicitar-amizade').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      const pessoa = pessoas.find(p => p.id === id);
      if (pessoa) pessoa.amizade = 'pendente';
      renderResultadosBusca(document.getElementById('input-busca').value);
    });
  });
}

// ===== TELA 3 - AVALIAÇÕES DA COMUNIDADE =====

let avaliacaoExpandidaId = null;
let comentariosExpandidosId = null;

function gerarIniciaisAvaliador(nome) {
  return nome.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

function resumoFeedback(texto, limite = 45) {
  return texto.length > limite ? texto.slice(0, limite).trim() + '...' : texto;
}

export function renderAvaliacoes() {
  const container = document.getElementById('lista-avaliacoes');

  container.innerHTML = avaliacoesComunidade.map(item => {
    const expandida = avaliacaoExpandidaId === item.id;
    const comentariosAbertos = comentariosExpandidosId === item.id;
    const temComentarios = item.comentarios.length > 0;

    return `
      <li class="bg-slate-900 rounded-xl overflow-hidden">

        <button data-id="${item.id}" class="btn-expandir-avaliacao w-full flex items-start gap-3 p-3 text-left">
          <span class="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold shrink-0">
            ${gerarIniciaisAvaliador(item.nome)}
          </span>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm">${item.nome} <span class="text-slate-500 font-normal">${item.usuario}</span></p>
            <p class="text-sm">${renderEstrelas(item.avaliacao)}</p>
            ${!expandida ? `<p class="text-xs text-slate-500 truncate">${resumoFeedback(item.feedback)}</p>` : ''}
          </div>
          <span class="text-slate-500 text-xs shrink-0"><i class="ph ph-caret-${expandida ? 'up' : 'down'}"></i></span>
        </button>

        ${expandida ? `
          <div class="px-3 pb-3 border-t border-slate-800 pt-3 space-y-2">
            <p class="text-xs text-slate-400"><i class="ph-fill ph-map-pin"></i> ${item.local}</p>

            ${item.fotoLocal
              ? `<img src="${item.fotoLocal}" class="w-full h-32 object-cover rounded-lg" alt="${item.local}">`
              : `<div class="w-full h-24 bg-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-500">Sem foto</div>`
            }

            <p class="text-sm text-slate-300">${item.feedback}</p>
            <p class="text-[11px] text-slate-500">${item.data}</p>

            <button data-id="${item.id}" class="btn-toggle-comentarios flex items-center gap-1 text-xs ${temComentarios ? 'text-slate-400' : 'text-slate-600'} mt-2">
              <i class="ph ph-chat-circle-text"></i> ${temComentarios ? `${item.comentarios.length} comentário${item.comentarios.length > 1 ? 's' : ''}` : 'Sem comentários'}
              ${temComentarios ? `<i class="ph ph-caret-${comentariosAbertos ? 'up' : 'down'}"></i>` : ''}
            </button>

            ${temComentarios && comentariosAbertos ? `
              <ul class="space-y-2 mt-2">
                ${item.comentarios.map(c => `
                  <li class="bg-slate-800 rounded-lg p-2">
                    <p class="text-xs font-semibold">${c.autor}</p>
                    <p class="text-xs text-slate-400">${c.texto}</p>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        ` : ''}
      </li>
    `;
  }).join('');

  ligarEventosAvaliacoes();
}

function ligarEventosAvaliacoes() {
  document.querySelectorAll('.btn-expandir-avaliacao').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      avaliacaoExpandidaId = avaliacaoExpandidaId === id ? null : id;
      comentariosExpandidosId = null;
      renderAvaliacoes();
    });
  });

  document.querySelectorAll('.btn-toggle-comentarios').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      comentariosExpandidosId = comentariosExpandidosId === id ? null : id;
      renderAvaliacoes();
    });
  });
}

// ===== TELA 4 - RECURSOS DO JOVI =====

export function renderRecursos() {
  const container = document.getElementById('lista-recursos');
  container.innerHTML = recursosJovi.map(item => `
    <li class="flex items-center gap-3 bg-slate-900 rounded-xl p-3">
      <span class="w-8 h-8 bg-red-600 rounded-lg shrink-0 flex items-center justify-center text-base">
        <i class="ph-fill ph-${item.icone}"></i>
      </span>
      <div>
        <p class="font-semibold text-sm">${item.titulo}</p>
        <p class="text-xs text-slate-500">${item.desc}</p>
      </div>
    </li>
  `).join('');
}

// ===== TELA 5 - PERFIL =====

const decoracoesDisponiveis = [
  { id: null, label: 'Padrão', classe: '' },
  { id: 'dourada', label: 'Dourada', classe: 'ring-4 ring-yellow-400' },
  { id: 'roxa', label: 'Roxa', classe: 'ring-4 ring-purple-500' },
  { id: 'verde', label: 'Verde', classe: 'ring-4 ring-lime-400' }
];

export function renderPerfil() {
  document.getElementById('perfil-nome').textContent = perfilUsuario.nome;
  document.getElementById('perfil-nivel').textContent =
    `Nível ${perfilUsuario.nivel} · ${perfilUsuario.tituloNivel}`;
  document.getElementById('perfil-xp').textContent = perfilUsuario.xpTotal.toLocaleString('pt-BR');
  document.getElementById('perfil-memorias').textContent = perfilUsuario.memorias;
  document.getElementById('perfil-desafios').textContent = perfilUsuario.desafios;

  const proximoLabel = Math.min(perfilUsuario.proximoNivel, NIVEL_MAXIMO);
  document.getElementById('perfil-nivel-atual').textContent = `Nível ${perfilUsuario.nivel}`;
  document.getElementById('perfil-proxima-meta').textContent =
    perfilUsuario.nivel >= NIVEL_MAXIMO
      ? 'Nível máximo atingido!'
      : `${perfilUsuario.xpAtual} XP p/ nível ${proximoLabel}`;

  const percentual = Math.min((perfilUsuario.xpAtual / perfilUsuario.xpMeta) * 100, 100);
  document.getElementById('barra-progresso').style.width = `${percentual}%`;

  const fundo = document.getElementById('perfil-fundo');
  fundo.style.backgroundImage = perfilUsuario.fundoUrl ? `url(${perfilUsuario.fundoUrl})` : 'none';
  fundo.style.backgroundSize = 'cover';
  fundo.style.backgroundPosition = 'center';

  const avatar = document.getElementById('avatar-perfil');
  avatar.style.backgroundImage = perfilUsuario.avatarUrl ? `url(${perfilUsuario.avatarUrl})` : 'none';
  avatar.style.backgroundSize = 'cover';
  avatar.style.backgroundPosition = 'center';

  const decoracaoAtual = decoracoesDisponiveis.find(d => d.id === perfilUsuario.decoracao) || decoracoesDisponiveis[0];
  avatar.className = `w-20 h-20 rounded-full bg-blue-900 ${decoracaoAtual.classe}`;
}

export function renderDecoracoes() {
  const container = document.getElementById('lista-decoracoes');

  container.innerHTML = decoracoesDisponiveis.map(dec => `
    <button data-id="${dec.id ?? ''}" class="btn-decoracao text-[10px] px-3 py-1 rounded-full ${
      perfilUsuario.decoracao === dec.id ? 'bg-yellow-400 text-slate-900' : 'bg-slate-800 text-slate-400'
    }">
      ${dec.label}
    </button>
  `).join('');

  container.querySelectorAll('.btn-decoracao').forEach(btn => {
    btn.addEventListener('click', () => {
      perfilUsuario.decoracao = btn.dataset.id === '' ? null : btn.dataset.id;
      renderPerfil();
      renderDecoracoes();
    });
  });
}

export function renderMinhasFotos() {
  const container = document.getElementById('grid-minhas-fotos');
  const vazio = document.getElementById('minhas-fotos-vazio');

  if (minhasFotos.length === 0) {
    container.innerHTML = '';
    vazio.classList.remove('hidden');
    return;
  }

  vazio.classList.add('hidden');
  container.innerHTML = minhasFotos.map(foto => `
    <div class="relative rounded-lg overflow-hidden h-24">
      <img src="${foto.fotoUrl}" class="w-full h-full object-cover" alt="${escapeHtml(foto.local)}">
      <div class="absolute bottom-0 left-0 right-0 bg-slate-900/80 px-1 py-0.5">
        <p class="text-[9px] truncate">${escapeHtml(foto.local) || 'Sem local'}</p>
      </div>
    </div>
  `).join('');
}