import {
  renderMemoriasLocais,
  renderFeedComunidade,
  renderResultadosBusca,
  renderAvaliacoes,
  renderRecursos,
  renderPerfil,
  renderFeedbackEvolucao,
  renderDecoracoes,
  renderMinhasFotos,
  mostrarFormularioFoto,
  getNotaSelecionada,
  getFotoAtualUrl,
  adicionarMinhaFoto
} from './view/render.js';

import { memoriasLocais, perfilUsuario } from './model/data.js';

const ordemTelas = ['tela-camera', 'tela-busca', 'tela-avaliacoes', 'tela-recursos', 'tela-perfil'];
let telaAtualIndex = 0;

function mostrarTela(idTela) {
  ordemTelas.forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(idTela).classList.remove('hidden');

  telaAtualIndex = ordemTelas.indexOf(idTela);
  atualizarNavIcones();
}

function atualizarNavIcones() {
  document.querySelectorAll('.nav-dot').forEach((btn, index) => {
    if (index === telaAtualIndex) {
      btn.classList.add('bg-yellow-400', 'text-slate-900');
      btn.classList.remove('bg-slate-800', 'text-slate-400');
    } else {
      btn.classList.remove('bg-yellow-400', 'text-slate-900');
      btn.classList.add('bg-slate-800', 'text-slate-400');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderMemoriasLocais();
  renderFeedComunidade();
  renderResultadosBusca();
  renderAvaliacoes();
  renderRecursos();
  renderPerfil();
  renderFeedbackEvolucao();
  renderDecoracoes();
  renderMinhasFotos();

  document.getElementById('input-busca').addEventListener('input', (e) => {
    renderResultadosBusca(e.target.value);
  });

  document.getElementById('input-foto').addEventListener('change', (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = (evento) => {
      const localSugerido = memoriasLocais[0];
      mostrarFormularioFoto(evento.target.result, localSugerido);
    };
    leitor.readAsDataURL(arquivo);
  });

  document.getElementById('btn-salvar-foto').addEventListener('click', () => {
    const local = document.getElementById('input-local-foto').value;
    const feedback = document.getElementById('input-feedback-foto').value;
    const nota = getNotaSelecionada();
    const fotoUrl = getFotoAtualUrl();

    adicionarMinhaFoto({
      id: Date.now(),
      fotoUrl,
      local,
      avaliacao: nota,
      feedback,
      data: 'Agora'
    });

    perfilUsuario.memorias++;
    renderMinhasFotos();
    renderPerfil();

    alert('Informações da foto salvas!');
  });

  document.getElementById('input-avatar-foto').addEventListener('change', (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = (evento) => {
      perfilUsuario.avatarUrl = evento.target.result;
      renderPerfil();
    };
    leitor.readAsDataURL(arquivo);
  });

  document.getElementById('input-fundo-foto').addEventListener('change', (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = (evento) => {
      perfilUsuario.fundoUrl = evento.target.result;
      renderPerfil();
    };
    leitor.readAsDataURL(arquivo);
  });

  // Editar nome do usuário
  document.getElementById('btn-editar-nome').addEventListener('click', () => {
    document.getElementById('input-novo-nome').value = perfilUsuario.nome;
    document.getElementById('exibir-nome').classList.add('hidden');
    document.getElementById('editar-nome-form').classList.remove('hidden');
  });

  document.getElementById('btn-salvar-nome').addEventListener('click', () => {
    const novoNome = document.getElementById('input-novo-nome').value.trim();
    if (novoNome) {
      perfilUsuario.nome = novoNome;
      renderPerfil();
    }
    document.getElementById('editar-nome-form').classList.add('hidden');
    document.getElementById('exibir-nome').classList.remove('hidden');
  });

  document.querySelectorAll('.nav-dot').forEach(btn => {
    btn.addEventListener('click', () => mostrarTela(btn.dataset.tela));
  });

  document.getElementById('btn-proxima-tela').addEventListener('click', () => {
    const proximoIndex = (telaAtualIndex + 1) % ordemTelas.length;
    mostrarTela(ordemTelas[proximoIndex]);
  });

  atualizarNavIcones();
});