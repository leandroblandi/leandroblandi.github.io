# Leandro Blandi · Portfolio

Portfolio one-page bilingüe (ES/EN) — Angular 22, Tailwind CSS v4, Transloco y GSAP. Se prerenderiza a HTML estático (`/es`, `/en`) y se sirve desde S3 + CloudFront.

## Comandos

| Comando | Descripción |
|---|---|
| `npm start` | Dev server en `http://localhost:4200` |
| `npm run build` | Build de producción + prerender en `dist/portfolio/browser` |
| `npm run preview` | Sirve el build con las mismas reglas que CloudFront (`http://localhost:4300`) |
| `npm run lint` | ESLint (angular-eslint) |
| `npm test` | Tests unitarios (Vitest) |
| `npm run format` | Prettier |
| `npm run deploy` | Build + sync a S3 + invalidación de CloudFront (requiere `.env.deploy`) |

## Estructura

- `src/app/data/profile.ts` — datos estructurados (links, fechas, stack, skills). **Editá acá el dominio, LinkedIn y rutas de CV.**
- `src/i18n/{es,en}.json` — todos los textos.
- `src/app/sections/` — Hero, Sobre mí, Experiencia, Educación, Skills, Contacto.
- `src/app/core/` — i18n, tema, scroll-spy, SEO y helper de animaciones (`injectMotion`).
- `src/styles.css` — tokens del sistema de diseño (`@theme`) y utilidades (`glass`, `text-gradient`, `spotlight`).
- `public/cv/` — colocá `leandro-blandi-cv-es.pdf` y `leandro-blandi-cv-en.pdf`.
- `infra/cloudfront-function.js` + `docs/aws-setup.md` — infraestructura AWS.
