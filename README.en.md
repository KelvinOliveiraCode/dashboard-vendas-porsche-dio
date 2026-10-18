
# dashboard-vendas-porsche-dio

![language: JavaScript/TypeScript](https://img.shields.io/badge/language-JS-TS-yellow?logo=javascript)   ![status: done](https://img.shields.io/badge/status-done-green)   ![license: MIT](https://img.shields.io/badge/license-MIT-blue)

## Summary

Web application in JavaScript/TypeScript. Dashboard de vendas Porsche em HTML/CSS/JS puro, zero dependências | Porsche sales dashboard in vanilla JS

## Problem / why it exists

The project delivers a web interface or utility for a specific scope, with focus on the browser as runtime and no dependency on its own server.

## Architecture

- Presentation layer: components and pages that render the interface.
- Logic layer: functions and hooks that process data and state.
- Communication: HTTP requests to external APIs or local data, when applicable.

The build is done with Vite (or equivalent tool), generating static files ready for hosting.

## Technologies

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

- No CI configured in this repository.

No automated tests detected in the scan.

## What it does

Dashboard de vendas Porsche em HTML/CSS/JS puro, zero dependências | Porsche sales dashboard in vanilla JS

## How to run

Requirements: Node.js and npm (or yarn/pnpm).

```
# install dependencies
npm install

# run in development
vite --port=3000 --host=0.0.0.0

# production build
vite build

# run tests
pytest
```

## Project structure

- src/ (9 arquivo(s))
- assets/ (1 arquivo(s))
- .env.example, .gitignore, index.html, metadata.json, package-lock.json, package.json, README.en.md, README.md, tsconfig.json, vite.config.ts


## Trade-offs and decisions

- Static build: easy to host (GitHub Pages, Vercel, Netlify) without a server.
- Minimal dependencies to reduce maintenance surface.
- Browser as the only runtime required.

## Known limitations

- Runs in the browser; depends on internet connection for external resources.
- No automated tests detected.


## Tests

```
pytest
```

## License

Distributed under the MIT License. See the `LICENSE` file in this repository.

## Author

Kelvin Oliveira, https://github.com/KelvinOliveiraCode
Portfolio: https://kelvinoliveiracode.github.io/portfolio/
