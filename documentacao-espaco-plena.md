# Documentação do Projeto — Espaço Plena
**Site institucional de saúde e estética · São Luís - MA · 2026**

---

## 1. Visão Geral do Projeto

O site do Espaço Plena é uma landing page institucional de página única (single-page) desenvolvida em HTML, CSS e JavaScript puros, sem frameworks ou dependências de servidor. O objetivo central é converter visitantes em leads qualificados via WhatsApp, apresentar os serviços e a equipe da clínica, e estabelecer presença digital profissional e segura.

**Stack tecnológica:**
- HTML5 semântico
- CSS3 com Custom Properties (design system via variáveis)
- JavaScript vanilla (ES6+)
- Font Awesome 6.4.0 (ícones via CDN)
- Netlify (hospedagem recomendada)

**Arquivos do projeto:**
```
📁 espacoplena/
├── index.html                  ← estrutura e conteúdo
├── style.css                   ← visual e responsividade
├── script.js                   ← interatividade e segurança
├── _headers                    ← cabeçalhos de segurança (Netlify)
├── logo-removebg-preview.png   ← logo com fundo transparente
└── favicon.png                 ← ícone da aba do navegador
```

---

## 2. Arquitetura e Estrutura

### 2.1 HTML (index.html)

O documento segue estrutura semântica com 6 seções principais:

| Seção | ID | Função |
|---|---|---|
| Header fixo | — | Navegação e logo |
| Hero | `#home` | Apresentação e CTA principal |
| Sobre | `#sobre` | Propósito e missão |
| Serviços | `#servicos` | 4 cards de serviços |
| Equipe | `#equipe` | 5 cards de profissionais |
| Contato | `#contato` | Formulário de leads + canais |

**Recursos de SEO e metadados presentes:**
- `<meta name="description">` para indexação
- Open Graph tags para preview em redes sociais
- Schema.org JSON-LD (`HealthAndBeautyBusiness`) para dados estruturados no Google
- `<link rel="icon">` para favicon

> ⚠️ **Pendências no HTML:** substituir `https://seusite.com.br` pela URL real em todos os metadados e Schema.org após o deploy; preencher o `@id` do Schema.org com a URL definitiva.

### 2.2 CSS (style.css)

O CSS é organizado em um design system baseado em **CSS Custom Properties** definidas no `:root`. Toda a paleta pode ser alterada modificando apenas as variáveis iniciais.

**Paleta oficial:**
```css
--bg-principal:   #3a5343   /* Verde Oliva Fechado */
--bg-cards:       #2d4134   /* Verde Escuro para cards */
--cor-acento:     #faf8f5   /* Off-white para títulos */
--cor-acento-claro: #4a6b53 /* Verde Sálvia Intermediário */
--texto-principal:#faf8f5   /* Off-white para texto */
--texto-cinza:    #cbd5ce   /* Cinza-verde de suporte */
--cor-icone:      #d4af37   /* Dourado Champagne */
```

**Tipografia:**
```css
--fonte-titulos: 'Georgia', serif
--fonte-texto:   'Segoe UI', Arial, sans-serif
```

**Breakpoints de responsividade:**
```
≤ 900px  → equipe 2 colunas, formulário empilhado
≤ 768px  → navbar empilhado, seções com padding reduzido
≤ 600px  → equipe 1 coluna
```

### 2.3 JavaScript (script.js)

O script é organizado em 3 blocos funcionais:

**Bloco 1 — Ofuscação de contatos (IIFE)**
Monta número de WhatsApp, link do Instagram, e-mail e URL do Maps em tempo de execução via arrays fragmentados. Nada sensível fica exposto no HTML.

**Bloco 2 — Formulário de leads**
Ao submeter, captura nome, telefone e serviço, monta uma mensagem formatada e abre o WhatsApp com o texto pré-preenchido. Não depende de servidor.

**Bloco 3 — Scroll tracking**
Monitora a rolagem da página e aplica sombra e cor sólida ao header quando o usuário rola mais de 50px, melhorando legibilidade do menu.

---

## 3. Segurança

### 3.1 Medidas implementadas

| Medida | Como foi aplicada |
|---|---|
| Ofuscação de contatos | Dados fragmentados em arrays, montados via JS em runtime |
| `noopener,noreferrer` | Aplicado em todos os `window.open()` |
| Cabeçalhos HTTP (`_headers`) | X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| Sem `console.log` em produção | Removido para não expor informações no DevTools |
| `aria-hidden` nos ícones decorativos | Evita leitura desnecessária por leitores de tela |

### 3.2 Conteúdo do arquivo `_headers` (Netlify)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

```
> ⚠️ A linha em branco ao final é obrigatória para o Netlify processar corretamente.

### 3.3 O que ainda falta (próximas etapas)

- **HTTPS:** garantido automaticamente pelo Netlify ao publicar — nenhuma ação necessária
- **SRI no Font Awesome:** adicionar `integrity` e `crossorigin` ao link do CDN (hash disponível em cdnjs.com)
- **Subresource Integrity:** protege contra CDN comprometido
- **Rate limiting do formulário:** atualmente não há limite de envios — considerar debounce ou CAPTCHA se houver abuso

---

## 4. Overview Técnico — Pontos Fortes e Fracos

### Pontos fortes
- Zero dependência de servidor — site completamente estático, custo zero de hospedagem
- Design system sustentável com variáveis CSS — manutenção fácil
- Formulário de leads funcional sem backend
- Segurança acima da média para sites do segmento
- Responsivo em 3 breakpoints
- Metadados de SEO e Schema.org presentes

### Pontos que podem ser evoluídos
- Imagens da equipe são placeholders do Unsplash — substituir por fotos reais
- Menu mobile sem hambúrguer — navegação difícil em telas pequenas
- Fonte do título (Georgia) é genérica — a identidade visual usa tipografia personalizada
- Imagem de fundo do hero vem de CDN externo sem fallback
- Não há analytics implementado (Google Analytics, Clarity, etc.)

---

## 5. Dicas de Futuras Melhorias Técnicas

**Curto prazo (antes ou logo após o lançamento):**
- Substituir as fotos placeholder da equipe por fotos reais dos profissionais
- Preencher o endereço e URL reais em todos os metadados e Schema.org
- Criar um `og-image.jpg` (imagem de preview 1200×630px) para compartilhamento
- Adicionar menu hambúrguer no mobile
- Implementar Google Analytics 4 ou Microsoft Clarity (mapa de calor gratuito) para entender como os visitantes usam o site

**Médio prazo:**
- Criar página de agradecimento após envio do formulário (`/obrigado.html`) para rastrear conversões no Analytics
- Adicionar seção de **depoimentos** de clientes — elemento de prova social muito eficaz para clínicas
- Adicionar seção de **perguntas frequentes (FAQ)** — reduz dúvidas antes do contato e melhora SEO
- Criar um **blog simples** com dicas de saúde e estética — aumenta tráfego orgânico ao longo do tempo
- Integrar com Google Meu Negócio para aparecer no Maps com informações completas

**Longo prazo:**
- Sistema de agendamento online (Calendly, por exemplo) integrado diretamente ao site
- Chat ao vivo ou chatbot para atendimento fora do horário comercial
- Versão em inglês para atender turistas médicos

---

## 6. Dicas de Vendas e Atendimento ao Cliente

### 6.1 Aproveitando o formulário de leads

O formulário envia uma mensagem formatada para o WhatsApp da clínica. Para aproveitar ao máximo:

- **Responda em menos de 15 minutos** — estudos mostram que leads respondidos nesse prazo têm taxa de conversão até 7x maior
- **Não responda só "Olá"** — a mensagem já vem com nome, serviço e contato; use esses dados: *"Olá Beatriz! Vi seu interesse em Pilates, temos horários disponíveis esta semana. Posso te contar mais sobre como funciona?"*
- **Crie um script de atendimento** para cada serviço (Estética, Fisioterapia, Pilates, Massoterapia) — padroniza a qualidade e acelera o atendimento

### 6.2 O site como ferramenta de vendas

- A seção de equipe com profissionais nomeados gera **confiança antes do primeiro contato** — mantenha as fotos e descrições atualizadas
- O botão "Agendar Consulta" no hero é o CTA principal — se possível, ofereça uma **avaliação gratuita** como gancho inicial
- O endereço e o botão Google Maps ajudam clientes a confirmar a localização antes de ir, reduzindo desistências

### 6.3 Usando o Instagram como funil

O site já linka para o Instagram. Para fechar o ciclo:
- Mantenha uma frequência mínima de 3 posts por semana
- Stories com **antes e depois** de procedimentos (com autorização) convertem muito bem para estética
- Adicione o link do site na bio do Instagram com o texto "Agende sua avaliação"
- Use o recurso de **Link na Bio** para direcionar tráfego do Instagram direto para a seção `#contato`

### 6.4 Retenção e fidelização

- Peça avaliações no **Google Meu Negócio** após cada atendimento — impacta diretamente no ranqueamento local
- Crie um **programa de indicação**: cliente que indica ganha desconto na próxima sessão
- Salve os dados dos leads do formulário em uma planilha para acompanhamento — atualmente os dados chegam só pelo WhatsApp e podem se perder

---

## 7. Guia de Manutenção

### Atualizar informações de contato
Todos os dados sensíveis (WhatsApp, Instagram, Maps, e-mail) estão no arquivo `script.js` nas linhas iniciais da IIFE. Não estão no HTML por segurança.

```js
const waParts  = ['55', '98', '970', '285', '212']; // número do WhatsApp
const igParts  = ['espacop', 'lenaslz'];             // usuário do Instagram
const emParts  = ['espacoplenaslz', 'gmail.com'];   // e-mail
const mapsUrl  = 'https://...';                     // link do Google Maps
```

### Atualizar horários
Dois lugares precisam ser atualizados em sincronia:
1. HTML (`index.html`) — seção `#contato`, bloco `.info-item` do relógio
2. Schema.org (`index.html`) — bloco `<script type="application/ld+json">`

### Adicionar ou remover profissionais da equipe
No `index.html`, cada profissional é um `.equipe-card` dentro de `.equipe-grid`. Ao ter 5 profissionais, o CSS posiciona os cards 4 e 5 centralizados na segunda linha automaticamente. Se mudar para 4 ou 6, remova as regras `nth-child(4)` e `nth-child(5)` do `style.css`.

### Atualizar a paleta de cores
Todas as cores estão nas variáveis no início do `style.css`. Alterar apenas o bloco `:root` atualiza o visual inteiro.

---

## 8. Deploy no Netlify (passo a passo)

1. Crie uma conta gratuita em [netlify.com](https://netlify.com)
2. Clique em **"Add new site" → "Deploy manually"**
3. Arraste a pasta completa do projeto para a área indicada
4. O site vai ao ar em segundos com URL automática (ex: `espacoplena.netlify.app`)
5. Para domínio próprio: vá em **Domain settings → Add custom domain** e siga as instruções para apontar o DNS do Registro.br para o Netlify
6. HTTPS é ativado automaticamente — nenhuma configuração necessária
7. O arquivo `_headers` é lido automaticamente pelo Netlify

---

*Documentação gerada em 9 de julho de 2026. Atualizar sempre que houver mudanças relevantes na estrutura ou nos dados do projeto.*
