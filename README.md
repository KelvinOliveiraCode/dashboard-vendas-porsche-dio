# porsche-sales-dashboard_dio — Dashboard de Vendas Porsche em um Único Arquivo HTML

![Status](https://img.shields.io/badge/Status-Concludido-2EA44F?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live-22272E?style=flat-square&logo=githubpages&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Zero Dependencies](https://img.shields.io/badge/Depend%C3%AAncias-Zero-764ABC?style=flat-square)
![DIO](https://img.shields.io/badge/DIO-Challenge-9046F5?style=flat-square)

> Acesso direto: https://kelvinoliveiracode.github.io/porsche-sales-dashboard_dio/

**Dashboard de vendas Porsche** entregue como desafio DIO de dashboard de vendas — e resolvido da forma mais radical possível: um único `index.html` de ~89 KB, HTML/CSS/JS puro, zero dependências, 100% client-side. Nenhuma biblioteca de gráficos, nenhum framework, nenhum build. As 25 visualizações SVG e 5 canvases são renderizados nativamente pelo próprio JavaScript do arquivo, sobre um layout de painéis em grid de 12 colunas (cards de gráfico ocupando spans 7/5/8/4/12). Os dados (`rawSales`) vivem embutidos no mesmo arquivo, com sujeira realista — datas `INVALID`, entregas em quatro status, meios de pagamento variados — para que o pipeline client-side precise realmente de limpeza e agregação, como num dataset de produção.

---

## 🇧🇷 Português

### O que é

Um dashboard completo de vendas Porsche que roda direto no navegador: basta abrir a URL do GitHub Pages. Toda a análise — filtragem, agregação, renderização de gráficos, interação — acontece no client, sem backend e sem chamadas externas.

### Decisão técnica: single-file, zero dependências

- **Um arquivo só.** `index.html` (~89 KB) contém estrutura, estilos, lógica e dados. Sem `node_modules`, sem CDN, sem build step.
- **25 SVGs + 5 canvases nativos.** Nenhuma lib de gráficos (Chart.js, D3, ECharts): cada visualização é construída à mão em SVG/Canvas puro.
- **Grid de 12 colunas.** Layout em painéis; cada `chart-card` declara seu span (7/5/8/4/12) e o grid acomoda as combinações.
- **Dados embutidos com sujeira realista.** O array `rawSales` traz registros que exigem tratamento real: datas marcadas como `INVALID`, quatro status de entrega, preços, quilometragem e múltiplos meios de pagamento.

### Dados

| Dimensão | Conteúdo |
|---|---|
| Modelos | 718 Cayman, 911 Turbo S, Cayenne Coupe, Macan S, Taycan 4S, Panamera 4, 911 Carrera S |
| Status de entrega | Delivered, Pending, In Transit, Cancelled |
| Meios de pagamento | Credit Card, Wire Transfer, Financing, Cash, Bank Transfer, Lease |
| Localidades | Boston MA, Seattle WA, Austin TX, Denver CO, Los Angeles CA, Miami FL, New York NY |
| Campos de registro | Data (incluindo `INVALID`), preço, quilometragem, modelo, pagamento, cidade/estado, status |

### Painéis

| Painel | Mostra |
|---|---|
| Painel de Filtros | Seleção que restringe todos os demais painéis |
| Receita por Família de Modelos | Faturamento agregado por família |
| Status das Entregas | Distribuição entre Delivered/Pending/In Transit/Cancelled |
| Evolução e Tendência de Faturamento | Série temporal de receita com tendência |
| Meios de Pagamento Preferidos | Ranking de formas de pagamento |
| Análise de Desvalorização: Preço vs. Quilometragem | Dispersão preço × km |
| Listagem Geral de Transações | Tabela detalhada das vendas |
| Cards de apoio | Especificações Técnicas de Fábrica e Registro da Transação |

### Como o dashboard processa os dados

Todo o pipeline é client-side, dentro do mesmo `index.html`:

1. **Carga** — o array `rawSales` já vem embutido no arquivo; nada é baixado.
2. **Limpeza** — registros com data `INVALID` e campos sujos são tratados antes de qualquer agregação, como aconteceria com um dataset real de produção.
3. **Filtragem** — o Painel de Filtros restringe o conjunto ativo; todos os demais painéis recalculam sobre o subconjunto filtrado.
4. **Agregação** — cada painel agrupa os dados pela sua dimensão: família de modelo, status de entrega, período, meio de pagamento, faixa de quilometragem.
5. **Renderização** — os 25 SVGs e 5 canvases são desenhados nativamente pelo JavaScript do arquivo, sem biblioteca de gráficos.
6. **Layout** — cada resultado ocupa um `chart-card` no grid de 12 colunas, com spans 7/5/8/4/12 conforme o peso visual do painel.

### Trade-offs da decisão single-file

| Ganho | Custo |
|---|---|
| Zero dependências, zero build, zero CDN | Sem separação de módulos — manutenção exige disciplina no arquivo único |
| Roda offline com um duplo clique | Dados embutidos: atualizar vendas exige editar o HTML |
| Deploy trivial via GitHub Pages | Sem backend: nenhuma persistência além do arquivo |
| SVG/Canvas puro: controle total do visual | Cada gráfico é código manual — nada pronto de biblioteca |

### Como usar

Abra o live demo no GitHub Pages: https://kelvinoliveiracode.github.io/porsche-sales-dashboard_dio/

Ou, offline: baixe `index.html` e abra com duplo clique — funciona sem servidor, sem internet após o download, sem instalação.

---

## 🇺🇸 English

### What it is

A complete Porsche sales dashboard that runs entirely in the browser — just open the GitHub Pages URL. All analysis (filtering, aggregation, chart rendering, interaction) happens client-side, with no backend and no external calls.

### Technical choice: single-file, zero dependencies

- **One file.** `index.html` (~89 KB) holds structure, styles, logic, and data. No `node_modules`, no CDN, no build step.
- **25 SVGs + 5 native canvases.** No chart library (Chart.js, D3, ECharts): every visualization is hand-built in plain SVG/Canvas.
- **12-column grid.** Panel-based layout; each `chart-card` declares its span (7/5/8/4/12) and the grid composes them.
- **Embedded data with realistic dirt.** The `rawSales` array includes records that force real cleaning: dates flagged `INVALID`, four delivery statuses, prices, mileage, and multiple payment methods.

### Data

| Dimension | Contents |
|---|---|
| Models | 718 Cayman, 911 Turbo S, Cayenne Coupe, Macan S, Taycan 4S, Panamera 4, 911 Carrera S |
| Delivery status | Delivered, Pending, In Transit, Cancelled |
| Payment methods | Credit Card, Wire Transfer, Financing, Cash, Bank Transfer, Lease |
| Locations | Boston MA, Seattle WA, Austin TX, Denver CO, Los Angeles CA, Miami FL, New York NY |
| Record fields | Date (including `INVALID`), price, mileage, model, payment, city/state, status |

### Panels

| Panel | Shows |
|---|---|
| Filter Panel | Selections constraining all other panels |
| Revenue by Model Family | Aggregated revenue per family |
| Delivery Status | Delivered/Pending/In Transit/Cancelled breakdown |
| Revenue Evolution & Trend | Revenue time series with trend |
| Preferred Payment Methods | Payment method ranking |
| Depreciation Analysis: Price vs. Mileage | Price × mileage scatter |
| General Transaction Listing | Detailed sales table |
| Support cards | Factory Technical Specifications and Transaction Record |

### Usage

Open the live demo on GitHub Pages: https://kelvinoliveiracode.github.io/porsche-sales-dashboard_dio/

Offline: download `index.html` and double-click it — works with no server, no internet after download, no install. The full file (data, logic, styles) travels together; nothing is fetched at runtime.

---

## Autor

**Kelvin Oliveira** — [GitHub](https://github.com/KelvinOliveiraCode) · [LinkedIn](https://www.linkedin.com/in/kelvin-oliveira-code/)

## Licença

Projeto educacional, desenvolvido para o desafio da DIO. Sem licença de software formal — os materiais servem como referência de estudo.
