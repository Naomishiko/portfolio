[![Netlify Status](https://api.netlify.com/api/v1/badges/dfdb13d9-bc3d-4631-8613-fa2668086d69/deploy-status)](https://app.netlify.com/sites/courageous-alpaca-e90fb6/deploys)

# Naomi's Portfolio

Personal portfolio site built with React and Tailwind CSS. Highlights projects,
skills, and a contact form.

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the app in development mode |
| `npm test` | Launch the test runner in watch mode |
| `npm run build` | Build the production bundle to `build/` |
| `npm run eject` | Eject from Create React App (one-way, avoid) |

## Deployment

Pushing to `main` deploys automatically via Netlify. The production build can
also be generated locally with `npm run build` and served from `build/`.

## Project structure

```
src/
  components/   Page sections (Home, About, Portfolio, Experience, Contact, ...)
  assets/       Images and icons used by the components
  App.js        Composes the page sections
  index.js      App entry point
```

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).
