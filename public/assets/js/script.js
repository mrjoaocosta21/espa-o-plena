// ==========================================================
// CAPTURA DE DEPENDÊNCIAS DO DOM
// ==========================================================
const header = document.querySelector('header');

// ==========================================================
// SEGURANÇA: OFUSCAÇÃO DOS LINKS DE CONTATO
// Número, e-mail e links montados em tempo de execução.
// Invisíveis para bots que varrem o HTML em busca de contatos.
// ==========================================================
(function() {
    const waParts  = ['55', '98', '970', '285', '212'];
    const igParts  = ['espacop', 'lenaslz'];
    const igQuery  = 'igsh=cGdqeng4M2sxbGty';
    const emParts  = ['espacoplenaslz', 'gmail.com'];
    const mapsUrl  = 'https://www.google.com/maps?q=-2.5085350,-44.2589870&hl=pt-BR&gl=br&entry=gps&lucs=,47071704,47084304&g_ep=CAISDDYuOTYuMS4zMDU4MBgAINeCAyoSLDQ3MDcxNzA0LDQ3MDg0MzA0QgJCUg%3D%3D&g_st=iw';

    const waNumber = waParts.join('');
    const waUrl    = 'https://wa' + '.me/' + waNumber;
    const igUrl    = 'https://www.instagram.com/' + igParts.join('') + '?' + igQuery;
    const emailFull = emParts.join('@');

    function abrirLink(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    // Exibe o e-mail no HTML de forma segura (sem expor no código-fonte)
    const txtEmail = document.getElementById('txt-email');
    if (txtEmail) txtEmail.textContent = emailFull;

    // Vincula os botões
    const btnHero    = document.getElementById('btn-whatsapp-hero');
    const btnContato = document.getElementById('btn-whatsapp-contato');
    const btnIg      = document.getElementById('btn-instagram');
    const btnMaps    = document.getElementById('btn-maps');

    if (btnHero)    btnHero.addEventListener('click',    () => abrirLink(waUrl));
    if (btnContato) btnContato.addEventListener('click', () => abrirLink(waUrl));
    if (btnIg)      btnIg.addEventListener('click',      () => abrirLink(igUrl));
    if (btnMaps)    btnMaps.addEventListener('click',    () => abrirLink(mapsUrl));
})();

// ==========================================================
// FORMULÁRIO DE CAPTURA DE LEADS
// Envia os dados do formulário diretamente via WhatsApp
// ==========================================================
const formAgendamento = document.getElementById('form-agendamento');
if (formAgendamento) {
    formAgendamento.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome     = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const servico  = document.getElementById('servico').value;

        const servicoTexto = {
            estetica:     'Estética Avançada',
            fisioterapia: 'Fisioterapia',
            pilates:      'Pilates',
            massoterapia: 'Massoterapia'
        }[servico] || servico;

        // Monta a mensagem e abre o WhatsApp com os dados preenchidos
        const waParts  = ['55', '98', '970', '285', '212'];
        const waNumber = waParts.join('');
        const mensagem = `Olá! Meu nome é ${nome} e tenho interesse em ${servicoTexto}. Meu WhatsApp é ${telefone}.`;
        const waUrl    = 'https://wa' + '.me/' + waNumber + '?text=' + encodeURIComponent(mensagem);

        window.open(waUrl, '_blank', 'noopener,noreferrer');
        formAgendamento.reset();
    });
}

// ==========================================================
// SCROLL TRACKING (EFEITO DINÂMICO NO CABEÇALHO AO ROLAR)
// ==========================================================
function ajustarMenuScroll() {
    if (window.scrollY > 50) {
        header.style.boxShadow    = 'var(--shadow-scroll)';
        header.style.backgroundColor = 'var(--header-scroll)';
    } else {
        header.style.boxShadow    = 'none';
        header.style.backgroundColor = 'var(--header-bg)';
    }
}
window.addEventListener('scroll', ajustarMenuScroll);
