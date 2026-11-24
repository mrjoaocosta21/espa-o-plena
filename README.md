# Espaço Plena — landing page atualizada

Redesign da landing page utilizando a harmonia análoga enviada e a distribuição visual **60/30/10**:

- **60% — bases claras:** `#E8F0E3` (verde claro), `#F9F8F2` (creme) e branco, para superfícies e áreas de leitura.
- **30% — identidade:** `#112B11` (verde floresta) e `#5F8F5B` (verde folha), para textos, navegação, botões e ícones.
- **10% — destaque:** `#EFD7A3` (bege suave), para toques de contraste e chamadas secundárias.

> **Observação sobre a referência:** o código hexadecimal da primeira amostra de verde na imagem está ilegível/inválido. Em vez de inventá-lo, foi usado `#5F8F5B`, um verde legível da mesma referência, como tom principal de folhas/sage.

## Arquivos

- `index.html` — todas as seções do site, SEO e formulário.
- `style.css` — identidade visual e layout responsivo.
- `script.js` — menu mobile, links de contato e pré-seleção de serviços no formulário.
- `favicon.svg` — favicon provisório em vetor, criado para substituir a dependência de um arquivo de favicon não enviado.

## Como executar

1. Extraia o ZIP e mantenha todos os arquivos na mesma pasta.
2. Abra `index.html` no navegador. O site funciona localmente sem servidor.
3. Para publicar, envie a pasta para uma hospedagem de sites estáticos, como Netlify ou GitHub Pages.

No Netlify, `netlify.toml` publica a raiz (`publish = "."`), onde estão `index.html`, os estilos, o script e `_headers`.

**Dependências externas:** Google Fonts, Font Awesome e imagens demonstrativas hospedadas no Unsplash. Essas mídias precisam de internet e devem ser substituídas por arquivos oficiais/locais para uma versão de produção autossuficiente.

## O que mudou

- Saiu o fundo verde escuro dominante; entrou uma interface predominantemente clara e acolhedora.
- Hero redesenhado em duas colunas, com chamadas de agendamento mais evidentes.
- Cabeçalho fixo, menu adaptado para telas menores, botões e formulários com foco visível. O menu mantém o foco dentro dele enquanto aberto e fecha por Escape ou clique na sobreposição.
- Cards de serviços mais claros, com links que selecionam o serviço no formulário.
- Melhor contraste em textos, inputs, links e botões.
- Mantidos os nomes, categorias de serviços e contatos do HTML/JS originais, com ajustes editoriais de redação.
- Removidos metadados com URL falsa `seusite.com.br`, até que o domínio público seja definido.
- Formulário com erros por campo, suporte ao prefixo brasileiro `+55` e link de continuação caso a nova aba do WhatsApp não abra. Alterar os dados limpa o link anterior.

## Antes de publicar

- **Marca:** `logo.png` está disponível na raiz. O cabeçalho usa uma composição tipográfica provisória, que pode ser substituída pela arte oficial.
- **Fotos:** as fotos são imagens ilustrativas externas, não retratos confirmados da equipe. O perfil de Ivana exibe iniciais porque a imagem anterior estava indisponível. Substitua as ilustrações por imagens autorizadas, inclusive no hero.
- **Dados da clínica:** confirme nomes, credenciais e especializações dos profissionais, endereço, telefone e horários antes da divulgação pública.
- **SEO:** adicione a URL oficial nos metadados Open Graph e, se desejar, uma `og-image` oficial.
- **Privacidade:** o formulário abre o WhatsApp com os dados digitados; não envia dados para um servidor do site. A mensagem só é enviada ao contato quando a pessoa confirmar o envio no aplicativo.

## Personalização rápida

Edite as variáveis CSS no início de `style.css`, na seção `:root`.
Para atualizar o WhatsApp, Instagram, e-mail e mapa, altere o objeto `contato` no início de `script.js`.
O conteúdo, os serviços e os perfis estão em `index.html`.
