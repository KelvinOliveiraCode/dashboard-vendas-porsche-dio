# Porsche Sales Hub

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Canvas 2D API](https://img.shields.io/badge/Canvas%202D%20API-000000)
![Licença MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-green)
![pt-BR](https://img.shields.io/badge/Idioma-pt--BR-blue)

Painel de vendas de veículos Porsche em um único arquivo HTML. Apresenta KPIs, cinco gráficos desenhados em canvas, filtros de busca, tabela paginada e ficha técnica por veículo, sem dependências externas.

## Problema / Por que existe

Dados de vendas de veículos ficam dispersos entre planilhas e telas separadas, forçando o usuário a alternar entre ferramentas para conferir faturamento, estoque, logística e detalhes de cada modelo. Este painel consolida essas informações em uma única visualização estática, aberta diretamente no navegador.

## O que faz

- Exibe cinco KPIs recalculados a cada filtro — faturamento total, veículos vendidos, ticket médio, quilometragem média com percentual de zero km e percentual de entregas despachadas.
- Desenha cinco gráficos em canvas — receita por família de modelos, status das entregas, evolução mensal do faturamento, meios de pagamento e dispersão preço versus quilometragem.
- Filtra por busca de texto (modelo, cidade ou ID da venda), preço máximo, quilometragem máxima, famílias de modelos, anos, formas de pagamento e status de entrega.
- Aplica presets — Série 911, apenas veículos zero km, E-Performance e modelos premium.
- Ordena qualquer coluna da tabela e pagina os resultados em grupos de 12 registros.
- Abre o modal de ficha técnica com especificações de fábrica, dados da transação, recibo e impressão.

O dataset embutido contém 100 registros de vendas (IDs 6 a 105), modelos de 2020 a 2026 e famílias 911, 718 Cayman/Boxster, Cayenne, Macan, Taycan e Panamera.

## Stack

- HTML5 com semântica em português do Brasil
- CSS3 com variáveis CSS, grid, flexbox, media queries e estilos de impressão
- JavaScript ES6+ embutido, sem etapa de build
- API Canvas 2D para renderização de gráficos no cliente
- API Intl para moeda em USD e datas em pt-BR
- Sem dependências externas, gerenciador de pacotes ou servidor necessário

## Como funciona

1. O navegador carrega index.html. Os 100 registros de vendas estão embutidos no script e mapeados para objetos com ID da venda, data, modelo, ano, preço, quilometragem, pagamento, cidade, estado e status de entrega.
2. Na inicialização, os ícones SVG são inseridos no DOM, os filtros são preenchidos com os valores únicos dos dados e a primeira renderização é executada.
3. Toda interação com filtro, preset, ordenação ou paginação recalcula o conjunto filtrado e re-renderiza KPIs, insight, gráficos, tabela e paginação.
4. Os gráficos são desenhados com a API Canvas 2D e redesenhados ao redimensionar a janela, com debounce de 120 milissegundos.
5. Clicar em uma linha da tabela abre o modal com a ficha técnica — motorização, potência, aceleração, tração, dados da transação, recibo e impressão.

## Como rodar

1. Baixe ou clone o repositório.
2. Abra index.html em qualquer navegador atual.
3. Não é necessário instalar dependências, rodar servidor nem compilar nada.

Opcional, sirva o arquivo com qualquer servidor estático, por exemplo python -m http.server, se precisar evitar restrições de ambiente local.

## Estrutura do projeto

```
porsche-sales-hub-dio/
└── index.html
```

Único arquivo contendo HTML, CSS, JavaScript e os 100 registros de vendas.

## Trade-offs e decisões

- Arquivo único — basta copiar o arquivo para compartilhar ou implantar; o lado negativo é que o código fica mais difícil de manter à medida que cresce.
- Dados embutidos — não exige backend nem requisições de rede, mas o dataset é estático e não se atualiza sozinho.
- Canvas 2D sem biblioteca de gráficos — sem dependências e sem aumento de tamanho de pacote, mas a renderização, os tooltips e o redesenho são escritos manualmente.
- Datas marcadas como INVALID no dataset — são excluídas da evolução mensal, mas permanecem visíveis nos KPIs, filtros e tabela.
- Interface e formatação em pt-BR, com moeda em USD através da API Intl.

## Limitações conhecidas

- Não há backend — os dados são estáticos e os filtros não persistem entre sessões.
- Não há testes automatizados.
- O botão de recibo no modal simula a geração de PDF e não gera um arquivo real.
- O desempenho pode cair com datasets muito maiores, pois cada interação re-renderiza todos os gráficos em canvas.
- Projeto de estudo e demonstração; não é um sistema oficial da Porsche AG. Porsche e nomes de modelos são marcas registradas da Dr. Ing. h.c. F. Porsche AG.

## Licença

MIT — uso, cópia, modificação, mesclagem e distribuição permitidos, desde que o aviso de direitos autorais e a licença sejam incluídos em cópias ou partes substanciais do software.

## Autor

Projeto de estudo DIO. Autoria não declarada no repositório.
