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
├── README.md                             ← início rápido e publicação
├── netlify.toml                          ← configuração de publicação
├── docs/
│   ├── documentacao-espaco-plena.md       ← guia de manutenção
│   └── paleta-cores-tipografia.md         ← inventário visual
└── public/                               ← conteúdo publicado no Netlify
    ├── index.html                        ← estrutura e conteúdo
    ├── _headers                          ← cabeçalhos HTTP
    └── assets/
        ├── css/
        │   └── style.css                 ← visual e responsividade
        ├── js/
        │   └── script.js                 ← estado visual do cabeçalho
        └── img/
            ├── brand/
            │   └── logo.png              ← logo e favicon provisório
            └── hero/
                └── hero-bg.webp          ← fotografia local do hero
```

A pasta `public/` contém os arquivos entregues ao navegador. A documentação fica fora da pasta publicada e não é incluída no deploy do site. Isso não torna o documento privado no GitHub: se o repositório for público, seu conteúdo também poderá ser consultado lá.

A equipe usa iniciais decorativas enquanto as fotos reais autorizadas não estão disponíveis. As iniciais não são apresentadas como fotografias. Não há retratos de banco de imagens associados às profissionais.

A fotografia do hero está em `public/assets/img/hero/hero-bg.webp`. Seu caminho no CSS é relativo ao arquivo de estilos: `url('../img/hero/hero-bg.webp')`.

---

## 2. Arquitetura e Estrutura

### 2.1 HTML (`public/index.html`)

O documento segue estrutura semântica com 6 seções principais:

| Seção | ID | Função |
|---|---|---|
| Cabeçalho | — | Navegação e logo |
| Hero | `#home` | Apresentação e CTA principal |
| Sobre | `#sobre` | Propósito e missão |
| Serviços | `#servicos` | 4 cards de serviços |
| Equipe | `#equipe` | 5 cards de profissionais |
| Contato | `#contato` | Informações e canais diretos de atendimento |

**Recursos de SEO e metadados presentes:**
- `<meta name="description">` para indexação
- Open Graph básico: título, descrição, tipo e localidade; imagem e URL absolutas aguardam o domínio definitivo
- Schema.org JSON-LD (`HealthAndBeautyBusiness`) para dados estruturados no Google
- `<link rel="icon">` usando a logo existente como favicon provisório

A logo do cabeçalho e o favicon usam `assets/img/brand/logo.png`. Metadados dependentes de uma URL absoluta devem ser preenchidos quando o domínio definitivo estiver confirmado; não use um domínio de exemplo na versão pública.

> **Pendências de conteúdo:** confirmar domínio, nomes, especialidades e materiais da equipe. Quando o domínio estiver definido, incluir as URLs definitivas de compartilhamento e do Schema.org. Criar um favicon dedicado e uma imagem Open Graph própria. O endereço e os horários dos dados estruturados devem refletir o conteúdo visível.

### 2.2 CSS (`public/assets/css/style.css`)

O CSS usa **CSS Custom Properties** definidas no `:root` para paleta, tipografia e estados. Consulte o [inventário de paleta e tipografia](paleta-cores-tipografia.md) para os valores implementados e contrastes; atualize esse documento quando os tokens mudarem.

**Tipografia:**
```css
--fonte-titulos: 'Georgia', serif
--fonte-texto:   'Segoe UI', Arial, sans-serif
```

**Breakpoints de responsividade:**
```
≤ 900px  → equipe 2 colunas
≤ 768px  → navbar empilhado, contato em 1 coluna, seções com padding reduzido
≤ 600px  → equipe 1 coluna
```

A equipe usa flexbox com quebra de linha e centralização, sem regras `nth-child` para posicionar profissionais. A seção de contato usa um contêiner centralizado de até 900px; endereço, e-mail e horários ficam em três colunas em telas maiores e em uma coluna até 768px, com os links de ação abaixo. O cabeçalho fica aderente ao topo em telas maiores e volta ao fluxo normal em até 600px, liberando espaço durante a rolagem no celular. A navegação permite quebra de linha em todas as larguras.

O foco de teclado é explícito, os links e botões têm áreas de interação ampliadas e as animações respeitam `prefers-reduced-motion`. Os botões de contato têm tamanho tipográfico definido. O inventário visual deve ser conferido junto ao CSS após mudanças de cores ou escala.

### 2.3 JavaScript (`public/assets/js/script.js`)

O script cuida apenas do estado visual do cabeçalho. Ele alterna a classe `.is-scrolled` conforme a rolagem; cores e sombra continuam definidas no CSS. A altura medida do cabeçalho atualiza `--header-height` para ajustar a posição das âncoras.

Os contatos são links reais no HTML e não dependem do script para funcionar. A pessoa abre o WhatsApp e escreve sua mensagem diretamente na conversa. O site não coleta dados por formulário, não recebe confirmação de envio e não confirma agendamentos.

---

## 3. Segurança

### 3.1 Medidas implementadas

| Medida | Como foi aplicada |
|---|---|
| Contatos explícitos | URLs de contato públicas no HTML, sem ofuscação como suposta proteção de segredos |
| `rel="noopener noreferrer"` | Aplicado aos links externos que abrem em nova aba |
| Cabeçalhos HTTP (`public/_headers`) | X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| Contato direto | A página fornece links de atendimento e não coleta ou persiste dados por formulário |
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

- **HTTPS:** conferir o certificado e as configurações do domínio no Netlify após a publicação.
- **Dependências externas:** manter os recursos de terceiros revisados; ao usar CDN, conferir integridade e disponibilidade.
- **Recebimento de dados:** se houver uma API de agendamento ou armazenamento de leads no futuro, projetar validação no servidor, controles de abuso e tratamento adequado dos dados. A validação do navegador não substitui essas medidas.

---

## 4. Overview Técnico — Pontos Fortes e Fracos

### Pontos fortes
- Site estático, sem servidor de aplicação ou banco de dados próprios
- Design system sustentável com variáveis CSS — manutenção fácil
- Contato direto com WhatsApp, Instagram, Maps e e-mail
- Links de contato disponíveis sem JavaScript
- Layout adaptável, foco visível e preferência por movimento reduzido
- Metadados de SEO e Schema.org presentes

### Pontos que podem ser evoluídos
- Fotos reais da equipe ainda precisam ser fornecidas e autorizadas
- Domínio definitivo e imagem de compartilhamento ainda precisam ser confirmados
- Fontes são locais ao sistema; a aparência pode variar conforme os fallbacks disponíveis
- Não há analytics implementado (Google Analytics, Clarity, etc.)

---

## 5. Dicas de Futuras Melhorias Técnicas

**Curto prazo (antes ou logo após o lançamento):**
- Substituir as iniciais por fotos reais autorizadas das profissionais quando os arquivos estiverem disponíveis
- Confirmar o domínio definitivo e manter endereço e horários sincronizados no conteúdo e no Schema.org
- Criar um favicon dedicado e uma imagem `public/assets/img/brand/og-image.jpg` (1200×630px) para compartilhamento
- Adicionar `public/robots.txt` e `public/sitemap.xml` quando o domínio definitivo estiver definido
- Repetir as verificações de navegação, teclado e layout após alterações de conteúdo
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

### 6.1 Atendimento via WhatsApp

Os links do site abrem a conversa no WhatsApp, onde a pessoa escreve sua mensagem. Após receber o contato, a clínica pode conduzir o atendimento da seguinte forma:

- **Responda em menos de 15 minutos** — estudos mostram que leads respondidos nesse prazo têm taxa de conversão até 7x maior
- **Ajude a pessoa a explicar sua necessidade** — pergunte como prefere ser chamada e qual serviço deseja conhecer: *"Olá! Como podemos chamar você e em qual serviço tem interesse?"*
- **Crie um script de atendimento** para cada serviço (Estética, Fisioterapia, Pilates, Massoterapia) — padroniza a qualidade e acelera o atendimento

### 6.2 O site como ferramenta de vendas

- A seção de equipe com profissionais nomeados gera **confiança antes do primeiro contato** — mantenha as fotos e descrições atualizadas
- O CTA principal do hero deve explicar que a próxima etapa é uma conversa no WhatsApp; mantenha a promessa alinhada ao atendimento oferecido
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
- Organize os contatos recebidos pelos canais de atendimento para acompanhar retornos e evitar esquecimentos

---

## 7. Guia de Manutenção

### Atualizar informações de contato
Edite os `href` dos links de WhatsApp, Instagram, Maps e e-mail em `public/index.html`. Atualize o texto visível quando necessário. Os contatos são públicos.

Os links de WhatsApp devem usar o formato `https://wa.me/NUMERO`, com código do país e número sem pontuação. Ao alterar o contato, revise o link do hero, o link `#btn-whatsapp-contato` e o campo `telephone` do Schema.org. Os destinos não são definidos no JavaScript.

### Atualizar horários
Dois lugares precisam ser atualizados em sincronia:
1. HTML (`public/index.html`) — seção `#contato`, bloco `.info-item` do relógio
2. Schema.org (`public/index.html`) — bloco `<script type="application/ld+json">`

### Adicionar ou remover profissionais da equipe
No `public/index.html`, cada profissional é um `.equipe-card` dentro de `.equipe-grid`. Revise o nome e a especialidade no conteúdo e atualize as iniciais decorativas quando houver troca de profissional. Ao adicionar fotos reais, use arquivos locais autorizados e textos alternativos coerentes; não associe retratos genéricos a pessoas reais. Confira o alinhamento e a quebra dos cards em cada largura após mudar a quantidade.

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
- Links de WhatsApp, Instagram, Maps e e-mail abrindo os destinos esperados.
- Links de contato disponíveis sem JavaScript; navegação por teclado, foco e zoom sem perda de conteúdo.
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
7. Configure o domínio próprio e siga as instruções de DNS e HTTPS apresentadas pelo Netlify. Quando o domínio estiver confirmado, adicione as URLs definitivas aos metadados e ao Schema.org em `public/index.html`.

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

*Documentação gerada em 9 de julho de 2026. Revisada em 18 de novembro de 2026 para a organização em `public/` e `docs/`, o fluxo de branches e as melhorias de interface e contato. Atualizar sempre que houver mudanças relevantes na estrutura ou nos dados do projeto.*
