# Paleta de Cores — Espaço Plena
**Guia de referência cromática (HEX e RGB) · Saúde e Estética**

---

## 1. Paleta Implementada no Site (`style.css`)

Cores atualmente configuradas nas variáveis `:root` do projeto (tema noturno/oliva):

| Papel / Descrição | Variável CSS | HEX | RGB | Aplicação no Site |
| :--- | :--- | :--- | :--- | :--- |
| **Verde Oliva Principal** | `--bg-principal` | `#3A5343` | `rgb(58, 83, 67)` | Fundo principal da página, inputs do formulário e base dos overlays |
| **Verde Floresta Escuro** | `--bg-cards` / `--header-scroll` | `#2D4134` | `rgb(45, 65, 52)` | Fundo dos cards (serviços, equipe, formulário), rodapé, cabeçalho ao rolar e texto do botão primário |
| **Verde Sálvia Intermediário** | `--cor-acento-claro` | `#4A6B53` | `rgb(74, 107, 83)` | Fundo da seção *Sobre* (`#sobre`) e hover do botão secundário |
| **Off-White Suave** | `--cor-acento` / `--texto-principal` | `#FAF8F5` | `rgb(250, 248, 245)` | Títulos (`h1`, `h2`, `h3`), textos principais, fundo do botão primário e borda do botão secundário |
| **Cinza-Verde Claro** | `--texto-cinza` | `#CBD5CE` | `rgb(203, 213, 206)` | Subtítulos, slogans, descrições dos cards, labels e textos de apoio |
| **Dourado Ouro Nobre** | `--cor-icone` | `#D4AF37` | `rgb(212, 175, 55)` | Ícones, cargos da equipe, borda das fotos, foco dos inputs e hover do menu |

### Transparências e Sobreposições (`RGBA`)

| Variável CSS | Cor Base (HEX) | Valor RGBA | Aplicação |
| :--- | :--- | :--- | :--- |
| `--hero-overlay` | `#3A5343` | `rgba(58, 83, 67, 0.85)` | Camada de contraste sobre a imagem de fundo do Hero |
| `--header-bg` | `#3A5343` | `rgba(58, 83, 67, 0.95)` | Fundo translúcido do cabeçalho fixo no topo |
| `--shadow-scroll` | `#000000` | `rgba(0, 0, 0, 0.30)` | Sombra projetada pelo cabeçalho ao rolar a página |
| *Borda sutil clara* | `#FAF8F5` | `rgba(250, 248, 245, 0.03)` a `0.10` | Contornos discretos em cards, header, footer e campos de formulário |

---

## 2. Paleta Oficial da Identidade Visual (Manual da Marca)

Cores extraídas diretamente da prancha de identidade visual do **Espaço Plena**:

| Cor da Marca | HEX | RGB | Uso Recomendado na Marca |
| :--- | :--- | :--- | :--- |
| **Verde Folha / Oliva Natural** | `#618849` | `rgb(97, 136, 73)` | Cor primária institucional, fundos de peças gráficas e versão verde do logotipo |
| **Verde Mata Profundo** | `#0B1703` | `rgb(11, 23, 3)` | Contrastes altos, fundos escuros e versão escura do logotipo |
| **Branco Puro** | `#FFFFFF` | `rgb(255, 255, 255)` | Fundos limpos, tipografia sobre fundos escuros e versão negativa do logotipo |
| **Bege Areia / Champanhe** | `#E8C897` | `rgb(232, 200, 151)` | Detalhes sofisticados, palavra *"espaço"* sobre fundo escuro e versão dourada clara do logotipo |

---

## 3. Cores de Botões Sociais (Terceiros)

Cores aplicadas exclusivamente nos botões de conversão externa:

| Elemento | HEX | RGB | Observação |
| :--- | :--- | :--- | :--- |
| **Botão WhatsApp** | `#25D366` | `rgb(37, 211, 102)` | Cor oficial da plataforma |
| **Gradiente Instagram (Stop 1)** | `#F09433` | `rgb(240, 148, 51)` | Amarelo/Laranja (`0%`) |
| **Gradiente Instagram (Stop 2)** | `#E6683C` | `rgb(230, 104, 60)` | Laranja avermelhado (`25%`) |
| **Gradiente Instagram (Stop 3)** | `#DC2743` | `rgb(220, 39, 67)` | Vermelho rosado (`50%`) |
| **Gradiente Instagram (Stop 4)** | `#CC2366` | `rgb(204, 35, 102)` | Magenta (`75%`) |
| **Gradiente Instagram (Stop 5)** | `#BC1888` | `rgb(188, 24, 136)` | Roxo (`100%`) |

---

## 4. Nota de Alinhamento Visual

Atualmente, o CSS do site utiliza tons de verde-oliva mais fechados e acinzentados (`#3A5343` e `#2D4134`) combinados com dourado metálico (`#D4AF37`), enquanto o manual da marca define tons mais botânicos e quentes (`#618849`, `#0B1703` e `#E8C897`). Caso deseje alinhar o site 100% ao manual da marca no futuro, basta substituir os valores no bloco `:root` do `style.css`.