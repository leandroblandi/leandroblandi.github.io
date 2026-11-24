# Leandro Blandi · Portfolio

Portfolio one-page bilingüe (ES/EN) — Angular 22, Tailwind CSS v4, Transloco y GSAP. Se prerenderiza a HTML estático (`/es`, `/en`) y se publica en GitHub Pages (`https://leandroblandi.me`).

## Comandos

| Comando | Descripción |
|---|---|
| `npm start` | Dev server en `http://localhost:4200` |
| `npm run build` | Build de producción + prerender en `dist/portfolio/browser` |
| `npm run build:pages` | `build` + redirect raíz (`index.html`) y `404.html` para GitHub Pages |
| `npm run preview` | `build:pages` + servidor local con las reglas de GitHub Pages (`http://localhost:4300`) |
| `npm run lint` | ESLint (angular-eslint) |
| `npm test` | Tests unitarios (Vitest) |
| `npm run format` | Prettier |

## Estructura

- `src/app/data/profile.ts` — datos estructurados (links, fechas, stack, skills). **Editá acá el dominio, LinkedIn y rutas de CV.**
- `src/i18n/{es,en}.json` — todos los textos.
- `src/app/sections/` — Hero, Sobre mí, Experiencia, Educación, Skills, Contacto.
- `src/app/core/` — i18n, tema, scroll-spy, SEO y helper de animaciones (`injectMotion`).
- `src/styles.css` — tokens del sistema de diseño (`@theme`) y utilidades (`glass`, `text-gradient`, `spotlight`).
- `public/cv/` — colocá `leandro-blandi-cv-es.pdf` y `leandro-blandi-cv-en.pdf`.
- `.github/workflows/deploy.yml` — CI/CD: lint, tests, build y deploy a GitHub Pages en cada push a `main`.

## Deploy (GitHub Pages)

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. **Settings → Pages → Custom domain:** `leandroblandi.me` → activar **Enforce HTTPS** cuando GitHub emita el certificado.
3. DNS (Namecheap): registros `A` del apex a `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` y `CNAME` de `www` a `leandroblandi.github.io`.
4. Cada push a `main` publica el sitio; también se puede correr a mano desde **Actions → Deploy to GitHub Pages → Run workflow**.
