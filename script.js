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
  const linkWhatsApp = $('#form-whatsapp-link');
  const conteudoForaDoMenu = document.querySelectorAll('main, .footer, .brand, .skip-link');
  const servicos = {
    estetica: 'Estética Avançada',
    fisioterapia: 'Fisioterapia',
    pilates: 'Pilates',
    massoterapia: 'Massoterapia'
  };

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
  function definirMenu(aberto, restaurarFoco = false) {
    if (!menuToggle || !navLinks || !navOverlay) return;
    navLinks.classList.toggle('active', aberto);
    navOverlay.classList.toggle('active', aberto);
    menuToggle.classList.toggle('active', aberto);
    menuToggle.setAttribute('aria-expanded', String(aberto));
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', aberto);
    conteudoForaDoMenu.forEach(elemento => { elemento.inert = aberto; });
    if (aberto) {
      navLinks.querySelector('a')?.focus({ preventScroll: true });
    } else if (restaurarFoco) {
      menuToggle.focus({ preventScroll: true });
    }
  }
  menuToggle?.addEventListener('click', () => definirMenu(!menuAberto(), true));
  navOverlay?.addEventListener('click', () => definirMenu(false, true));
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => definirMenu(false)));
  document.addEventListener('keydown', (evento) => {
    if (!menuAberto()) return;
    if (evento.key === 'Escape') {
      evento.preventDefault();
      definirMenu(false, true);
    } else if (evento.key === 'Tab') {
      const primeiroLink = navLinks.querySelector('a');
      if (evento.shiftKey && document.activeElement === primeiroLink) {
        evento.preventDefault();
        menuToggle.focus();
      } else if (!evento.shiftKey && document.activeElement === menuToggle) {
        evento.preventDefault();
        primeiroLink?.focus();
      }
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
        seletor.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });

  function telefoneBrasileiroValido(telefone) {
    // Aceita formatação usual e o DDI opcional, sem descartar letras.
    if (!/^\+?[\d\s().-]+$/.test(telefone)) return false;
    const digitos = telefone.replace(/\D/g, '');
    const incluiDdi = digitos.length === 12 || digitos.length === 13;
    if (telefone.startsWith('+') && !incluiDdi) return false;
    if ((telefone.startsWith('+') || incluiDdi) && !digitos.startsWith('55')) return false;
    const numero = incluiDdi ? digitos.slice(2) : digitos;
    return /^[1-9]{2}(?:[2-5]\d{7}|9\d{8})$/.test(numero);
  }

  function erroDoCampo(campo) {
    const valor = campo.value.trim();
    if (campo.id === 'nome' && valor.length < 2) {
      return 'Informe seu nome com pelo menos dois caracteres.';
    }
    if (campo.id === 'telefone' && !telefoneBrasileiroValido(valor)) {
      return 'Informe um telefone brasileiro válido com DDD, como (98) 99999-9999. O +55 é opcional.';
    }
    if (campo.id === 'servico' && !Object.prototype.hasOwnProperty.call(servicos, valor)) {
      return 'Selecione o serviço de seu interesse.';
    }
    return '';
  }

  function mostrarFeedback(mensagem, erro = false) {
    if (feedback) {
      feedback.hidden = !mensagem;
      feedback.textContent = mensagem;
      feedback.classList.toggle('is-error', erro);
    }
  }

  function limparContinuacao() {
    mostrarFeedback('');
    if (linkWhatsApp) {
      linkWhatsApp.hidden = true;
      linkWhatsApp.removeAttribute('href');
    }
  }

  // Mantém as restrições HTML e apresenta os erros por campo ao enviar.
  // Sem JavaScript, a validação nativa do HTML continua habilitada.
  if (formulario) formulario.noValidate = true;

  function aoEditarCampo(evento) {
    const campo = evento.target;
    if (!campo.matches('input, select')) return;
    campo.setCustomValidity('');
    campo.removeAttribute('aria-invalid');
    limparContinuacao();
  }
  formulario?.addEventListener('input', aoEditarCampo);
  formulario?.addEventListener('change', aoEditarCampo);
  formulario?.addEventListener('reset', () => {
    formulario.querySelectorAll('input, select').forEach(campo => {
      campo.setCustomValidity('');
      campo.removeAttribute('aria-invalid');
    });
    limparContinuacao();
  });

  formulario?.addEventListener('submit', (evento) => {
    evento.preventDefault();
    limparContinuacao();
    const campos = [...formulario.querySelectorAll('input, select')];
    campos.forEach(campo => {
      campo.setCustomValidity(erroDoCampo(campo));
      campo.setAttribute('aria-invalid', String(!campo.validity.valid));
    });
    const primeiroInvalido = campos.find(campo => !campo.validity.valid);
    if (primeiroInvalido) {
      mostrarFeedback(primeiroInvalido.validationMessage, true);
      primeiroInvalido.reportValidity();
      return;
    }

    const nome = $('#nome').value.trim();
    const telefone = $('#telefone').value.trim();
    const servico = $('#servico').value;
    const mensagem = `Olá! Meu nome é ${nome} e tenho interesse em ${servicos[servico]}. Meu WhatsApp é ${telefone}. Gostaria de receber informações sobre agendamento.`;
    const url = whatsappUrl(mensagem);
    if (linkWhatsApp) {
      linkWhatsApp.href = url;
      linkWhatsApp.hidden = false;
    }
    mostrarFeedback('Sua mensagem está pronta. Se o WhatsApp não abriu, use o link abaixo.');
    abrirUrl(url);
    // Não limpamos o formulário: se o navegador bloquear a nova aba,
    // a pessoa não perderá os dados digitados.
  });

  const ano = $('#ano-atual');
  if (ano) ano.textContent = String(new Date().getFullYear());
})();
