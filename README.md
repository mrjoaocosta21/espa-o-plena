# Espaço Plena

Site institucional do Espaço Plena, clínica de saúde e estética em São Luís (MA). Apresenta serviços, equipe e informações de atendimento, com contato pelo WhatsApp.

O projeto usa **HTML, CSS e JavaScript puros**, sem framework, banco de dados ou etapa de build. O conteúdo publicado fica em `public/`; a documentação de manutenção fica em `docs/`.

## Executar localmente

Com Python 3 instalado, execute na raiz do repositório:

```sh
python3 -m http.server 8000 --directory public
```

Abra [http://localhost:8000](http://localhost:8000). Encerre o servidor com `Ctrl+C`. Não é necessário instalar pacotes npm.

## Estrutura

```text
.
├── README.md
├── netlify.toml
├── docs/
│   ├── documentacao-espaco-plena.md
│   └── paleta-cores-tipografia.md
└── public/
    ├── index.html
    ├── _headers
    └── assets/
        ├── css/style.css
        ├── js/script.js
        └── img/
            ├── brand/logo.png
            └── hero/hero-bg.webp
```

## Como funciona o contato

- Os links de WhatsApp, Instagram, Maps e e-mail estão no HTML e continuam disponíveis sem JavaScript.
- O contato é iniciado diretamente pelos links: a pessoa escreve sua mensagem no WhatsApp ou usa os outros canais disponíveis.
- O site não coleta dados por formulário nem os grava em banco, cookies ou armazenamento local.
- **Abrir o WhatsApp não confirma o envio da mensagem ou um agendamento.** A pessoa precisa confirmar o envio e combinar o atendimento na conversa.

## Interface e acessibilidade

A interface usa cores definidas por tokens CSS, tipografia de sistema, cards responsivos e navegação que se adapta à largura disponível. A equipe usa iniciais decorativas enquanto as fotos reais não estão disponíveis.

A fotografia de fundo do hero está no projeto em `public/assets/img/hero/hero-bg.webp`, a partir da [imagem já utilizada no site](https://images.unsplash.com/photo-1540555700478-4be289fbecef?fm=webp&q=80&w=1600&fit=crop). Os ícones usam Font Awesome 6.4.0 por CDN, com verificação de integridade SRI; o conteúdo e os rótulos das ações permanecem legíveis se os ícones não carregarem.

As melhorias incluem contraste nos links de ação, foco visível, link para pular ao conteúdo e respeito à preferência por movimento reduzido. A página deve continuar sendo verificada com teclado, zoom e tecnologias assistivas; estas medidas não representam certificação WCAG.

## Manutenção

| O que alterar | Onde |
|---|---|
| Conteúdo, equipe, endereço, horários e links de contato | `public/index.html` |
| Paleta, fontes, componentes e responsividade | `public/assets/css/style.css` |
| Comportamento do cabeçalho | `public/assets/js/script.js` |
| Cabeçalhos HTTP de publicação | `public/_headers` |
| Pasta publicada no Netlify | `netlify.toml` |

Ao trocar o WhatsApp, atualize os links do hero e da seção de contato no HTML e o `telephone` do Schema.org. Mantenha os horários e o endereço do conteúdo visível sincronizados com os dados estruturados.

Leia o [guia técnico e de manutenção](docs/documentacao-espaco-plena.md) e o [inventário de paleta e tipografia](docs/paleta-cores-tipografia.md).

## Publicar no Netlify

Para publicação conectada ao GitHub:

- Diretório base: raiz do repositório.
- Comando de build: vazio.
- Diretório de publicação: `public`, definido no `netlify.toml`.
- Branch de produção sugerida: `main`, configurada no painel do Netlify.

Use uma branch temporária por alteração, abra um Pull Request e confira o Deploy Preview quando a integração estiver habilitada. Integre à `main` depois da revisão. A configuração de produção e dos previews depende do projeto efetivamente conectado ao Netlify.

Para upload manual, envie **somente `public/`**. A documentação fica fora do site publicado, mas continua visível no GitHub se o repositório for público. O servidor Python local não interpreta `_headers`; confira os cabeçalhos após o deploy no Netlify.

## Conferir antes de publicar

- Testar a página em 320, 390, 768, 1024 e 1440 px, sem rolagem horizontal indevida.
- Percorrer os links pelo teclado, conferir o foco e ampliar o texto a 200%.
- Conferir os contatos com JavaScript desabilitado e verificar links externos e recursos locais.
- Revisar domínio, endereço, horários, nomes e especialidades com a clínica.
- Quando disponíveis, adicionar as fotos reais autorizadas, um favicon dedicado e a imagem de compartilhamento.

**Pendências de conteúdo:** confirmar o domínio definitivo e os materiais da equipe. As iniciais são provisórias e não substituem fotografias reais. O projeto não inclui agenda, autenticação, armazenamento de leads ou analytics.

Atualizado em 18 de novembro de 2026.
