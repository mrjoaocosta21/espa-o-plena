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
espacoplena/
├── netlify.toml                          ← configuração de publicação
├── docs/
│   └── documentacao-espaco-plena.md       ← guia de manutenção
└── public/                               ← conteúdo publicado no Netlify
    ├── index.html                        ← estrutura e conteúdo
    ├── _headers                          ← cabeçalhos HTTP
    └── assets/
        ├── css/
        │   └── style.css                 ← visual e responsividade
        ├── js/
        │   └── script.js                 ← interatividade e contatos
        └── img/
            └── brand/
                └── logo.png              ← logo, favicon e preview provisórios
```

A pasta `public/` contém os arquivos entregues ao navegador. A documentação fica fora da pasta publicada e não é incluída no deploy do site. Isso não torna o documento privado no GitHub: se o repositório for público, seu conteúdo também poderá ser consultado lá.

As imagens do hero e da equipe continuam hospedadas no Unsplash. As pastas `assets/img/hero/` e `assets/img/equipe/` serão criadas quando houver imagens locais; não há arquivos vazios para recursos futuros.

---

## 2. Arquitetura e Estrutura

### 2.1 HTML (`public/index.html`)

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
- `<link rel="icon">` usando a logo existente como favicon provisório

A logo do cabeçalho e o favicon usam `assets/img/brand/logo.png`. Os campos `og:image` e `image` do Schema.org apontam provisoriamente para `https://seusite.com.br/assets/img/brand/logo.png`.

> ⚠️ **Pendências no HTML:** substituir `https://seusite.com.br` pela URL real em todos os metadados e Schema.org, preencher o `@id` com a URL definitiva e atualizar o endereço do Schema.org. Criar um favicon dedicado e uma imagem Open Graph própria quando os materiais estiverem disponíveis.

### 2.2 CSS (`public/assets/css/style.css`)

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

Quando houver uma imagem local para o hero em `public/assets/img/hero/hero-bg.webp`, o caminho dentro deste CSS será `url('../img/hero/hero-bg.webp')`. A imagem externa atual permanece até essa substituição.

### 2.3 JavaScript (`public/assets/js/script.js`)

O script é organizado em 3 blocos funcionais:

**Bloco 1 — Ofuscação de contatos (IIFE)**
Monta número de WhatsApp, link do Instagram, e-mail e URL do Maps em tempo de execução via arrays fragmentados. A ofuscação não protege segredos: esses contatos podem ser recuperados no JavaScript, e o telefone também consta no Schema.org do HTML.

**Bloco 2 — Formulário de leads**
Ao submeter, captura nome, telefone e serviço, monta uma mensagem formatada e abre o WhatsApp com o texto pré-preenchido. Não depende de servidor. A pessoa ainda precisa enviar a mensagem no WhatsApp; o site não recebe confirmação desse envio nem armazena os dados.

**Bloco 3 — Scroll tracking**
Monitora a rolagem da página e aplica sombra e cor sólida ao header quando o usuário rola mais de 50px, melhorando legibilidade do menu.

---

## 3. Segurança

### 3.1 Medidas implementadas

| Medida | Como foi aplicada |
|---|---|
| Ofuscação de contatos | Dados fragmentados em arrays e montados via JS; não impede a leitura dos contatos |
| `noopener,noreferrer` | Aplicado em todos os `window.open()` |
| Cabeçalhos HTTP (`public/_headers`) | X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| Sem `console.log` em produção | Removido para não expor informações no DevTools |
| `aria-hidden` nos ícones decorativos | Evita leitura desnecessária por leitores de tela |

### 3.2 Conteúdo do arquivo `public/_headers` (Netlify)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

```
O arquivo deve permanecer na raiz da pasta publicada, que neste projeto é `public/`. Depois do deploy, confira a aplicação dos cabeçalhos nas respostas HTTP do Netlify.

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
- Criar um favicon dedicado e uma imagem `public/assets/img/brand/og-image.jpg` (1200×630px) para compartilhamento, substituindo os usos provisórios da logo
- Adicionar `public/robots.txt` e `public/sitemap.xml` quando o domínio definitivo estiver definido
- Adicionar menu hambúrguer no mobile
- Implementar Google Analytics 4 ou Microsoft Clarity (mapa de calor gratuito) para entender como os visitantes usam o site

**Médio prazo:**
- Avaliar uma página `public/obrigado.html` quando houver um fluxo apropriado de confirmação. No fluxo atual, medir a abertura do WhatsApp como intenção de contato; isso não comprova o envio da mensagem ou um agendamento
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

O formulário abre o WhatsApp com uma mensagem formatada. Após a pessoa enviá-la, a clínica pode aproveitar o contato da seguinte forma:

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
Os contatos de WhatsApp, Instagram, Maps e e-mail são montados no arquivo `public/assets/js/script.js`, nas linhas iniciais da IIFE. O número de WhatsApp também aparece no bloco do formulário nesse script e no campo `telephone` do Schema.org em `public/index.html`; mantenha as três ocorrências sincronizadas. Esses contatos são públicos, e a ofuscação não os torna secretos.

```js
const waParts  = ['55', '98', '970', '285', '212']; // número do WhatsApp
const igParts  = ['espacop', 'lenaslz'];             // usuário do Instagram
const emParts  = ['espacoplenaslz', 'gmail.com'];   // e-mail
const mapsUrl  = 'https://...';                     // link do Google Maps
```

### Atualizar horários
Dois lugares precisam ser atualizados em sincronia:
1. HTML (`public/index.html`) — seção `#contato`, bloco `.info-item` do relógio
2. Schema.org (`public/index.html`) — bloco `<script type="application/ld+json">`

### Adicionar ou remover profissionais da equipe
No `public/index.html`, cada profissional é um `.equipe-card` dentro de `.equipe-grid`. Ao ter 5 profissionais, o CSS posiciona os cards 4 e 5 centralizados na segunda linha automaticamente. Se mudar para 4 ou 6, remova as regras `nth-child(4)` e `nth-child(5)` do `public/assets/css/style.css`.

### Atualizar a paleta de cores
Todas as cores estão nas variáveis no início do `public/assets/css/style.css`. Alterar apenas o bloco `:root` atualiza o visual inteiro.

### Executar e conferir localmente

Na raiz do repositório, com Python 3 instalado, execute:

```sh
python3 -m http.server 8000 --directory public
```

Abra `http://localhost:8000/`. Para encerrar o servidor, use `Ctrl+C`.

Após mover arquivos ou alterar caminhos, confira:

- Página inicial, logo e favicon carregando; sem respostas 404 para CSS, JavaScript e imagens locais na aba de rede do navegador.
- Layout em desktop e celular, navegação entre seções e comportamento do cabeçalho ao rolar.
- Botões de contato abrindo os destinos esperados e formulário preenchendo a mensagem do WhatsApp corretamente.
- Ausência de erros no console do navegador.
- URL `/docs/documentacao-espaco-plena.md` retornando 404 ao servir `public/`.
- Metadados e URLs do domínio revisados antes da publicação definitiva; cabeçalhos HTTP verificados no Netlify, pois o servidor Python não interpreta `_headers`.

---

## 8. Deploy no Netlify

### Publicação conectada ao GitHub

1. No [Netlify](https://netlify.com), importe o repositório do GitHub.
2. Configure `main` como branch de produção e mantenha o diretório base na raiz do repositório.
3. Deixe o comando de build vazio: os arquivos HTML, CSS e JavaScript já estão prontos para publicação.
4. Use `public` como diretório de publicação. O arquivo `netlify.toml` na raiz registra essa configuração:

   ```toml
   [build]
     publish = "public"
   ```

5. Habilite os Deploy Previews para revisar Pull Requests direcionados à `main` antes de integrar alterações.
6. Após o deploy, confira os arquivos, links e cabeçalhos HTTP. O Netlify lê `public/_headers` como arquivo de configuração da pasta publicada.
7. Configure o domínio próprio e siga as instruções de DNS e HTTPS apresentadas pelo Netlify. Atualize depois as URLs provisórias em `public/index.html`.

Estas são instruções de configuração; a presença do `netlify.toml` no repositório não comprova que a integração remota ou os Deploy Previews já foram habilitados.

### Upload manual

Para um deploy manual, envie **somente a pasta `public/`**. Ela contém a página inicial, os assets e `_headers`. Não envie a raiz completa do projeto, pois a documentação não faz parte do conteúdo publicado. Nesse fluxo, `netlify.toml` fica fora do upload; `_headers` acompanha os arquivos públicos.

Consulte a documentação oficial sobre [diretório de publicação](https://docs.netlify.com/build/configure-builds/overview/), [cabeçalhos HTTP](https://docs.netlify.com/manage/routing/headers/) e [Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/).

---

## 9. Fluxo de trabalho no GitHub

Para este site, use `main` como versão estável e branches temporárias para cada alteração. Não é necessária uma branch `dev` permanente no fluxo atual.

1. Parta de uma `main` atualizada e crie uma branch com nome descritivo, por exemplo `chore/organizar-estrutura`.
2. Faça as alterações, valide o site localmente e registre os commits.
3. Envie a branch ao GitHub e abra um Pull Request para `main`.
4. Revise as mudanças e o Deploy Preview, quando a integração do Netlify estiver configurada.
5. Integre o Pull Request após a validação. Com a publicação automática configurada, a atualização da `main` inicia o deploy de produção.
6. Exclua a branch temporária após a integração; o histórico permanece na `main` e no Pull Request.

O fluxo segue o [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow). As etapas de revisão e publicação dependem das configurações efetivamente habilitadas no repositório e no Netlify.

---

*Documentação gerada em 9 de julho de 2026. Revisada em 18 de novembro de 2026 para a organização em `public/` e `docs/` e o fluxo de branches. Atualizar sempre que houver mudanças relevantes na estrutura ou nos dados do projeto.*
