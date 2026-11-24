/* ============================================================
   ESPAÇO PLENA — INTERAÇÕES
   Menu responsivo, agendamento e canais de atendimento.
   Os dados de contato vieram do projeto fornecido.
   ============================================================ */
(() => {
  'use strict';

  // Centralize as informações caso a clínica altere os contatos.
  // Dividir textos no JavaScript NÃO é uma proteção contra coleta automatizada.
  const contato = {
    whatsapp: ['55', '98', '970', '285', '212'].join(''),
    instagram: 'https://www.instagram.com/espacoplenaslz',
    email: ['espacoplenaslz', 'gmail.com'].join('@'),
    maps: 'https://www.google.com/maps?q=-2.5085350,-44.2589870'
  };

  const $ = (seletor) => document.querySelector(seletor);
  const header = $('.site-header');
  const menuToggle = $('#menu-toggle');
  const navLinks = $('#nav-links');
  const navOverlay = $('#nav-overlay');
  const formulario = $('#form-agendamento');
  const feedback = $('#form-feedback');

  function abrirUrl(url) {
    // Apenas URLs preparadas pelo próprio projeto são usadas aqui.
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function whatsappUrl(mensagem = '') {
    const base = `https://wa.me/${contato.whatsapp}`;
    return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
  }

  function atualizarCabecalho() {
    header?.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', atualizarCabecalho, { passive: true });
  atualizarCabecalho();

  // Menu mobile: atualiza atributos de acessibilidade e bloqueia o scroll.
  function menuAberto() {
    return !!navLinks?.classList.contains('active');
  }
  function definirMenu(aberto) {
    if (!menuToggle || !navLinks || !navOverlay) return;
    navLinks.classList.toggle('active', aberto);
    navOverlay.classList.toggle('active', aberto);
    menuToggle.classList.toggle('active', aberto);
    menuToggle.setAttribute('aria-expanded', String(aberto));
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', aberto);
  }
  menuToggle?.addEventListener('click', () => definirMenu(!menuAberto()));
  navOverlay?.addEventListener('click', () => definirMenu(false));
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => definirMenu(false)));
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menuAberto()) {
      definirMenu(false);
      menuToggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 840 && menuAberto()) definirMenu(false);
  });

  // Botões gerais: nenhum dado é enviado a um servidor próprio.
  $('#btn-whatsapp-hero')?.addEventListener('click', () => abrirUrl(whatsappUrl('Olá! Gostaria de saber mais sobre os atendimentos do Espaço Plena.')));
  $('#btn-whatsapp-contato')?.addEventListener('click', () => abrirUrl(whatsappUrl('Olá! Gostaria de informações sobre os atendimentos do Espaço Plena.')));
  $('#btn-instagram')?.addEventListener('click', () => abrirUrl(contato.instagram));
  $('#btn-maps')?.addEventListener('click', () => abrirUrl(contato.maps));

  const email = $('#txt-email');
  if (email) email.textContent = contato.email;

  // Botões dos serviços levam ao formulário já com o interesse selecionado.
  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      const seletor = $('#servico');
      const valor = link.getAttribute('data-service');
      if (seletor && [...seletor.options].some(opcao => opcao.value === valor)) {
        seletor.value = valor;
      }
    });
  });

  formulario?.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = $('#nome').value.trim();
    const telefone = $('#telefone').value.trim();
    const servico = $('#servico').value;
    const digitos = telefone.replace(/\D/g, '');
    const opcoes = {
      estetica: 'Estética Avançada',
      fisioterapia: 'Fisioterapia',
      pilates: 'Pilates',
      massoterapia: 'Massoterapia'
    };

    // Validação mínima, não tenta avaliar informações clínicas.
    if (nome.length < 2 || !/^[0-9]{10,11}$/.test(digitos) || !Object.hasOwn(opcoes, servico)) {
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = 'Confira o nome, o WhatsApp com DDD e o serviço de interesse.';
      }
      return;
    }

    if (feedback) {
      feedback.hidden = true;
      feedback.textContent = '';
    }
    const mensagem = `Olá! Meu nome é ${nome} e tenho interesse em ${opcoes[servico]}. Meu WhatsApp é ${telefone}. Gostaria de receber informações sobre agendamento.`;
    abrirUrl(whatsappUrl(mensagem));
    // Não limpamos o formulário: se o navegador bloquear a nova aba,
    // a pessoa não perderá os dados digitados.
  });

  const ano = $('#ano-atual');
  if (ano) ano.textContent = String(new Date().getFullYear());
})();
