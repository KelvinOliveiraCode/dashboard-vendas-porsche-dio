# dashboard-vendas-porsche-dio

![JavaScript/TypeScript](https://img.shields.io/badge/JS-TS-yellow?logo=javascript)   ![status: concluido](https://img.shields.io/badge/status-concluido-green)   ![licenca: MIT](https://img.shields.io/badge/licenca-MIT-blue)

## Resumo

Aplicacao web em JavaScript/TypeScript. Dashboard de vendas Porsche em HTML/CSS/JS puro, zero dependências | Porsche sales dashboard in vanilla JS

## Problema / por que existe

O projeto entrega uma interface ou utilitario web para um recorte especifico, com foco em navegador como ambiente de execucao e sem dependencia de servidor proprio.

## Arquitetura

- Camada de apresentacao: componentes e paginas que renderizam a interface.
- Camada de logica: funcoes e hooks que processam dados e estado.
- Comunicacao: requisicoes HTTP a APIs externas ou dados locais, quando aplicavel.

O build e feito com Vite (ou ferramenta equivalente), gerando arquivos estaticos prontos para hospedagem.

## Tecnologias

- JavaScript / TypeScript
- @google/genai
- @tailwindcss/vite
- @vitejs/plugin-react
- dotenv
- express
- lucide-react
- motion
- react
- react-dom
- recharts
- vite
- @types/express
- @types/node
- autoprefixer

- Sem CI configurado neste repositorio.

Nenhum teste automatizado detectado na varredura.

## O que faz

Dashboard de vendas Porsche em HTML/CSS/JS puro, zero dependências | Porsche sales dashboard in vanilla JS

## Como rodar

Requisitos: Node.js e npm (ou yarn/pnpm).

```
# instalar dependencias
npm install

# rodar em desenvolvimento
vite --port=3000 --host=0.0.0.0

# build para producao
vite build

# rodar testes
pytest
```

## Estrutura do projeto

- src/ (9 arquivo(s))
- assets/ (1 arquivo(s))
- .env.example, .gitignore, index.html, metadata.json, package-lock.json, package.json, README.en.md, README.md, tsconfig.json, vite.config.ts


## Trade-offs e decisões

- Build estatico: facil de hospedar (GitHub Pages, Vercel, Netlify) sem servidor.
- Dependencias minimas para reduzir superficie de manutencao.
- Navegador como unico ambiente de execucao necessario.

## Limitações conhecidas

- Funciona no navegador; depende de conexao a internet para recursos externos.
- Nenhum teste automatizado detectado.


## Testes

```
pytest
```

## Licença

Distribuído sob a licenca MIT. Consulte o arquivo `LICENSE` do repositorio.

## Autor

Kelvin Oliveira, https://github.com/KelvinOliveiraCode
Portfolio: https://kelvinoliveiracode.github.io/portfolio/
