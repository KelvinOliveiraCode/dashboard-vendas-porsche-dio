# Porsche Sales Hub

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Canvas 2D API](https://img.shields.io/badge/Canvas%202D%20API-000000)
![MIT License](https://img.shields.io/badge/License-MIT-green)
![Language](https://img.shields.io/badge/Language-English-blue)

Porsche vehicle sales dashboard in a single HTML file. Shows KPIs, five canvas-drawn charts, search filters, paginated table, and per-vehicle spec sheet, with no external dependencies.

## Problem / Why it exists

Vehicle sales data is scattered across spreadsheets and separate screens, forcing the user to switch tools to check revenue, inventory, logistics, and details of each model. This dashboard consolidates that information into a single static view, opened directly in the browser.

## What it does

- Displays five KPIs recalculated on each filter — total revenue, vehicles sold, average ticket, average mileage with zero-km percentage, and dispatched delivery percentage.
- Draws five canvas charts — revenue by model family, delivery status, monthly revenue evolution, payment methods, and price versus mileage dispersion.
- Filters by text search (model, city, or sale ID), maximum price, maximum mileage, model families, years, payment methods, and delivery status.
- Applies presets — 911 Series, zero-km only, E-Performance, and premium models.
- Sorts any table column and paginates results in groups of 12 records.
- Opens the spec sheet modal with factory specs, transaction data, receipt, and print.

The embedded dataset contains 100 sale records (IDs 6 to 105), models from 2020 to 2026, and families 911, 718 Cayman/Boxster, Cayenne, Macan, Taycan, and Panamera.

## Stack

- HTML5 with content in Brazilian Portuguese
- CSS3 with CSS variables, grid, flexbox, media queries, and print styles
- Embedded JavaScript ES6+, no build step
- Canvas 2D API for client-side chart rendering
- Intl API for USD currency and Brazilian Portuguese dates
- No external dependencies, package manager, or server required

## How it works

1. The browser loads index.html. The 100 sale records are embedded in the script and mapped to objects with sale ID, date, model, year, price, mileage, payment, city, state, and delivery status.
2. On initialization, SVG icons are inserted into the DOM, filters are populated with unique values from the data, and the first render runs.
3. Every interaction with filters, presets, sorting, or pagination recalculates the filtered set and re-renders KPIs, insight, charts, table, and pagination.
4. Charts are drawn with the Canvas 2D API and redrawn on window resize, with 120-millisecond debounce.
5. Clicking a table row opens the modal with the spec sheet — engine, power, acceleration, traction, transaction data, receipt, and print.

## How to run

1. Download or clone the repository.
2. Open index.html in any modern browser.
3. No need to install dependencies, run a server, or compile anything.

Optional: serve the file with any static server, for example python -m http.server, if you need to avoid local environment restrictions.

## Project structure

```
porsche-sales-hub-dio/
└── index.html
```

Single file containing HTML, CSS, JavaScript, and the 100 sale records.

## Trade-offs and decisions

- Single file — just copy the file to share or deploy; the downside is that the code is harder to maintain as it grows.
- Embedded data — no backend or network requests required, but the dataset is static and does not update itself.
- Canvas 2D without a chart library — no dependencies and no package size increase, but rendering, tooltips, and redraws are hand-written.
- Dates marked as INVALID in the dataset — excluded from monthly evolution, but remain visible in KPIs, filters, and table.
- Interface and formatting in Brazilian Portuguese, with USD currency through the Intl API.

## Known limitations

- No backend — data is static and filters do not persist between sessions.
- No automated tests.
- The receipt button in the modal simulates PDF generation and does not create a real file.
- Performance may drop with much larger datasets, since every interaction re-renders all canvas charts.
- Study and demonstration project; not an official Porsche AG system. Porsche and model names are registered trademarks of Dr. Ing. h.c. F. Porsche AG.

## License

MIT — use, copy, modify, merge, and distribute permitted, provided that the copyright notice and license are included in copies or substantial portions of the software.

## Author

DIO study project. Authorship not declared in the repository.
