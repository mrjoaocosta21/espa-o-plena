# Paleta de cores e tipografia — Espaço Plena

Inventário do estado implementado, revisado em **18 de novembro de 2026**, após as correções de UI/UX. As sugestões remanescentes estão separadas das mudanças já aplicadas.

Fontes: [CSS do projeto](../public/assets/css/style.css), [HTML da página](../public/index.html) e [JavaScript de interação](../public/assets/js/script.js). Este documento registra declarações do código; os pixels da fotografia, da logo filtrada e da suavização de fontes não integram o inventário.

## 1. Direção visual atual

A interface mantém verdes escuros e intermediários, texto off-white, cinza esverdeado e detalhes dourados. Há um único tema com `color-scheme: dark`, sem alternância entre claro e escuro.

WhatsApp e Instagram usam fundos sólidos escuros com texto off-white. O gradiente multicolorido do Instagram e o verde claro anterior do WhatsApp foram substituídos para melhorar o contraste. A imagem do hero é local: [hero-bg.webp](../public/assets/img/hero/hero-bg.webp). Os cards da equipe exibem iniciais decorativas até a disponibilidade de fotos reais autorizadas.

## 2. Tokens de cor e sombra em `:root`

Valores repetidos permanecem em linhas distintas porque representam papéis diferentes.

| Token | Valor declarado | Uso implementado |
|---|---|---|
| `--bg-principal` | `#3a5343` | Corpo, equipe, contato e fundo das iniciais da equipe. |
| `--bg-cards` | `#2d4134` | Cards, rodapé, Maps, fundo de segurança do hero e texto do botão primário. |
| `--cor-acento` | `#faf8f5` | Títulos, botão primário, texto e borda do secundário, texto do Maps e link de salto. |
| `--cor-acento-claro` | `#4a6b53` | Seção Sobre e hover do botão secundário. |
| `--texto-principal` | `#faf8f5` | Texto principal, menu e botões sociais. |
| `--texto-cinza` | `#cbd5ce` | Descrições, slogan, subtítulo, informações, rodapé e fundo do botão primário no hover. |
| `--cor-icone` | `#d4af37` | Ícones, cargos, iniciais e borda dos avatares e sublinhado do menu no hover. |
| `--hero-overlay` | `rgba(45, 65, 52, 0.9)` | Camada verde a 90% sobre a fotografia local do hero. |
| `--whatsapp-bg` | `#146c43` | Fundo normal do link de WhatsApp na área de contato. |
| `--whatsapp-hover` | `#0f5635` | Fundo desse link no hover. |
| `--instagram-bg` | `#8a2458` | Fundo normal do link de Instagram. |
| `--instagram-hover` | `#701d48` | Fundo desse link no hover. |
| `--focus-ring` | `#faf8f5` | Contorno de foco visível dos links. |
| `--header-bg` | `rgba(58, 83, 67, 0.95)` | Cabeçalho no início da página. |
| `--header-scroll` | `#2d4134` | Cabeçalho com a classe `.is-scrolled`. |
| `--shadow-scroll` | `0 4px 18px rgba(0, 0, 0, 0.3)` | Declaração completa de sombra do cabeçalho após rolar. |

### Token de dimensão relacionado

`--header-height` não é uma cor. Seu valor de segurança é `5.1rem` e passa para `10.5rem` até 768px. O JavaScript mede o cabeçalho e atualiza esse token para ajustar a altura mínima do hero e o afastamento das âncoras. As referências de raiz 16px seriam 81,6px e 168px; não devem ser confundidas com uma altura fixa em todos os navegadores.

## 3. Transparências, gradiente e estados

### Bordas e sombras adicionais

| Valor | Uso implementado |
|---|---|
| `rgba(250, 248, 245, 0.03)` | Bordas dos cards de serviços e equipe. |
| `rgba(250, 248, 245, 0.05)` | Bordas do cabeçalho e rodapé. |
| `rgba(250, 248, 245, 0.1)` | Borda do botão Maps. |
| `rgba(0, 0, 0, 0.15)` | Sombras padrão dos cards de serviços e equipe. |
| `rgba(0, 0, 0, 0.25)` | Sombras dos cards no hover. |
| `rgba(0, 0, 0, 0.3)` | Sombras do botão primário, avatares/fotos e cabeçalho. |
| `transparent` | Borda estrutural padrão de `.btn`, substituída pela borda clara no secundário. |

Espaços na escrita de `rgba()` foram normalizados nesta tabela. Não há cores HEX escritas fora dos tokens no CSS atual.

O único gradiente declarado é a camada uniforme sobre a fotografia do hero:

```css
background-image:
  linear-gradient(var(--hero-overlay), var(--hero-overlay)),
  url('../img/hero/hero-bg.webp');
```

A camada tem a mesma cor nas duas extremidades. O fundo sólido `--bg-cards` permanece disponível caso a fotografia não carregue.

### Estados implementados

| Elemento / estado | Aparência implementada |
|---|---|
| Menu no hover | Texto permanece off-white; aparece sublinhado dourado de 2px. O texto pequeno não passa mais para dourado. |
| Botão primário no hover | Fundo passa de off-white para cinza esverdeado; deslocamento vertical de −2px. O botão não fica translúcido no hover. |
| Botão secundário no hover | Fundo verde intermediário e deslocamento vertical de −2px. |
| Links sociais no hover | Fundos escurecem conforme seus tokens; deslocamento vertical de −2px. |
| Links com foco de teclado | `outline: 3px solid var(--focus-ring)` e `outline-offset: 4px`. |
| Cards no hover | Sombras mais escuras e pequeno deslocamento vertical. |
| Parágrafos da seção Sobre | `opacity: 0.95` no parágrafo inteiro. |
| Logo | Filtro CSS para aparência dourada; outro filtro e `scale(1.04)` no hover. |

O filtro da logo depende dos pixels originais e não equivale a uma pintura exata em `#d4af37`.

Com `prefers-reduced-motion: reduce`, a rolagem fica automática, transições e animações são removidas e os deslocamentos/escala de hover são neutralizados.

## 4. Famílias tipográficas

| Token / recurso | Declaração | Aplicação |
|---|---|---|
| `--fonte-titulos` | `'Georgia', serif` | H1, H2, H3 e iniciais da equipe. |
| `--fonte-texto` | `'Segoe UI', Arial, sans-serif` | Corpo, parágrafos, navegação e links, incluindo os estilizados como botões. |
| Font Awesome | Versão 6.4.0, por CSS externo no HTML | Ícones; não é a família de texto corrido. |

Georgia e Segoe UI não são baixadas pelo projeto. O navegador procura fontes instaladas e passa aos fallbacks. A família declarada não garante a mesma aparência em todos os dispositivos. O CSS local não contém `@font-face` nem arquivos de fontes próprias.

Os links sociais e os CTAs são âncoras com tamanho e entrelinha explícitos. Não há campos nem botões nativos no HTML atual.

## 5. Escala e tratamentos tipográficos

As conversões assumem **1rem = 16px** como referência. O projeto não fixa o tamanho da raiz; preferências do usuário alteram essa equivalência. `rem` se refere à raiz, não aos `1.1rem` do corpo.

| Elemento / seletor | Tamanho declarado | Referência em px | Peso / tratamento |
|---|---|---|---|
| Corpo e texto sem regra própria | `1.1rem` | 17,6px | Peso normal; entrelinha 1,7. |
| `.hero h1` | `clamp(2.5rem, 7vw, 4.5rem)` | 40–72px; termo fluido 7vw | Georgia, peso 400. |
| `h2` | `clamp(2rem, 4vw, 2.6rem)` | 32–41,6px; termo fluido 4vw | Georgia, peso 400, centralizado. |
| `.slogan` | `clamp(1.1rem, 2.5vw, 1.3rem)` | 17,6–20,8px; termo fluido 2,5vw | Fonte de texto, sem itálico. |
| `.servico-card h3` | `1.4rem` | 22,4px | Georgia, peso 400. |
| `.equipe-card h3` | `1.3rem` | 20,8px | Georgia, peso 400. |
| `.equipe-avatar` | `2rem` | 32px | Georgia; iniciais decorativas com `aria-hidden="true"`. |
| `.sobre p` | `1.15rem` | 18,4px | Fonte de texto, opacidade 0,95. |
| `.subtitle` | `1.1rem` | 17,6px | Maiúsculas, `letter-spacing: 3px`. |
| `.section-desc` | Herda `1.1rem` | 17,6px | Itálico e centralizado. |
| `.detalhe`, `footer` | `1rem` | 16px | Fonte de texto. |
| `.nav-links a` | `0.95rem` | 15,2px | Peso 500. |
| `.btn` | `0.95rem` | 15,2px | Peso 600 e entrelinha 1,5. |
| `.contato-link` | `0.95rem` | 15,2px | `bold`, entrelinha 1,5. |
| Parágrafos dos cards de serviço | `0.95rem` | 15,2px | Cor secundária; entrelinha herdada. |
| Parágrafos da equipe | `0.95rem` | 15,2px | Cor secundária e entrelinha 1,6. |
| `.cargo` | `0.95rem` | 15,2px | Peso 600, sem transformação em maiúsculas e sem itálico. |

O antigo tamanho de 13,33px dos botões sociais não descreve mais o estado atual: agora `.contato-link` declara `0.95rem`.

Os pesos explícitos são **400**, **500**, **600** e **bold**, normalmente 700. `<strong>` usa o destaque de peso do navegador. Famílias instaladas podem mapear ou sintetizar pesos que não possuam como arquivos próprios.

### Entrelinhas, letras e ícones

- O corpo usa entrelinha sem unidade `1.7`; com 17,6px, a referência é 29,92px.
- Botões primários/secundários e links sociais usam `1.5`; com 15,2px, a referência é 22,8px.
- Textos da equipe usam `1.6`; com 15,2px, a referência é 24,32px.
- Apenas `.section-desc` conserva itálico no CSS atual.
- O espaçamento entre letras explícito é `3px` no subtítulo. Os cargos não usam mais `letter-spacing: 1px`.
- `.card-icon` usa `2.2rem` (35,2px); `.info-item i` usa `1.8rem` (28,8px). Os demais ícones seguem o contexto e os estilos do Font Awesome.
- Links usam `text-underline-offset: 0.2em`; o sublinhado dourado do menu no hover tem 2px.

## 6. Regras responsivas e navegação

| Condição | Efeito implementado |
|---|---|
| Todas as larguras | H1, H2 e slogan variam com `clamp()`. Navegação permite quebra de linha. Serviços usam grid adaptável com largura mínima limitada a 100% do espaço disponível. |
| Acima de 900px | Equipe em linhas de até três cards, por Flexbox, com linhas incompletas centralizadas. Informações de contato em três colunas. |
| Até 900px | Equipe em linhas de até dois cards. |
| Até 768px | Navbar e informações de contato em uma coluna; menor gap entre links; padding das seções passa para 60px/6%. |
| Até 600px | Equipe em uma coluna; cabeçalho deixa de ser sticky e usa `position: relative`; CTAs do hero e contatos ocupam a largura disponível. |
| Preferência por movimento reduzido | Rolagem automática e remoção de animações/transições e transformações de hover. |

O conflito anterior entre os breakpoints da equipe foi removido. O layout não depende mais de regras para o quarto/quinto card. No menu, os alvos têm altura mínima de 44px; CTAs e contatos têm altura mínima de 48px. A página inclui link de salto para o conteúdo.

## 7. Contraste das combinações atuais

Método: luminância relativa sRGB e razão `(Lmais_clara + 0.05) / (Lmais_escura + 0.05)`. Os valores são mostrados com duas casas, sem arredondar antes de comparar com os limiares.

Referências WCAG AA: texto comum **4,5:1**, texto grande **3:1**; texto grande corresponde, aproximadamente, a 24px normal ou 18,67px em negrito. Informações visuais necessárias para identificar controles/estados têm requisitos próprios de **3:1**. Texto de logotipos e controles inativos têm exceções específicas. Isso não equivale a uma declaração de conformidade da página inteira.

Fontes oficiais: [contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) e [tamanho mínimo dos alvos](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

### Texto, bordas e fundos sólidos

| Primeiro plano | Fundo | Razão | Aplicação / leitura |
|---|---|---|---|
| Off-white `#faf8f5` | Principal `#3a5343` | 7,93:1 | Texto principal e menu em fundo sólido equivalente. |
| Off-white `#faf8f5` | Cards `#2d4134` | 10,33:1 | Títulos e texto do Maps. |
| Off-white `#faf8f5` | Sobre `#4a6b53` | 5,63:1 | Texto antes da aplicação de opacidade. |
| Off-white com opacidade 0,95 | Sobre `#4a6b53` | 5,27:1 | Composição declarada nos parágrafos da seção Sobre. |
| Cinza `#cbd5ce` | Principal `#3a5343` | 5,58:1 | Textos de apoio. |
| Cinza `#cbd5ce` | Cards `#2d4134` | 7,28:1 | Descrições dos cards. |
| Dourado `#d4af37` | Cards `#2d4134` | 5,21:1 | Cargos; atende texto comum nesse par. |
| Dourado `#d4af37` | Principal `#3a5343` | 4,00:1 | Iniciais grandes e detalhes gráficos; não usar como aprovação para texto comum pequeno. A razão exata é aproximadamente 3,9974:1. |
| Verde escuro `#2d4134` | Off-white `#faf8f5` | 10,33:1 | Botão primário e link de salto. |
| Verde escuro `#2d4134` | Cinza `#cbd5ce` | 7,28:1 | Botão primário no hover. |
| Off-white `#faf8f5` | WhatsApp `#146c43` | 6,08:1 | Link de WhatsApp normal. |
| Off-white `#faf8f5` | WhatsApp hover `#0f5635` | 8,24:1 | Link de WhatsApp no hover. |
| Off-white `#faf8f5` | Instagram `#8a2458` | 8,01:1 | Link de Instagram normal. |
| Off-white `#faf8f5` | Instagram hover `#701d48` | 10,12:1 | Link de Instagram no hover. |
| Foco `#faf8f5` | Principal `#3a5343` | 7,93:1 | Indicador de foco contra esse fundo. |

O anel off-white identifica o foco de teclado dos links. Bordas decorativas a 3% e 5% não recebem automaticamente os mesmos requisitos de um limite necessário para identificar um controle. A borda sutil do Maps é complementada pelo botão preenchido e texto identificável; sua avaliação completa considera todo o componente.

### Camadas sobre fotografia

A cor final do cabeçalho e do hero depende da composição com o fundo. Para o overlay atual `rgba(45,65,52,0.9)`, a composição sobre branco puro produz aproximadamente RGB(66, 84, 72), arredondado: o texto cinza tem **5,38:1**, e o off-white, **7,64:1**. Sobre preto puro, esses valores são aproximadamente **7,98:1** e **11,33:1**.

Esses extremos calculados ajudam a verificar a camada escolhida; não inventariam cada pixel da fotografia nem substituem conferência de foco, estado e sobreposição no navegador.

## 8. Correções aplicadas e próximos cuidados

### Aplicado nesta revisão

- Fundos sociais escuros com contraste suficiente nos pares de texto calculados.
- Menu mantém texto claro no hover, com sublinhado de destaque.
- Foco explícito nos links de navegação e de contato.
- Tipografia dos contatos padronizada; cargos maiores sem maiúsculas/itálico obrigatórios.
- Escala fluida para títulos e slogan; equipe com distribuição responsiva sem o conflito antigo.
- Imagem de fundo local, iniciais decorativas e suporte a movimento reduzido.

### Cuidados remanescentes

1. Conferir teclado, zoom, foco e links nos navegadores e sistemas usados pelo público, além de testes com tecnologias assistivas.
2. Manter a documentação sincronizada ao adicionar fotos reais, alterar estados ou introduzir novas cores.
3. Se a identidade exigir fontes idênticas em todos os dispositivos, avaliar fontes licenciadas hospedadas localmente e seu custo de carregamento.
4. Revalidar o contraste ao substituir a fotografia, alterar overlay ou reutilizar o dourado em textos pequenos sobre outro fundo.

Este inventário descreve a implementação e os pares calculados; não certifica conformidade WCAG global.
