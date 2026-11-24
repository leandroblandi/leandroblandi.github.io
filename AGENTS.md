# AGENTS.md

## Verificación
- `npm run lint`, `npx ng test --watch=false`, `npm run build` deben pasar.
- Tras el build, `dist/portfolio/browser/{es,en}/index.html` deben contener el contenido traducido (título real, no claves `meta.title`).
- `npm run preview` hace `build:pages` y sirve el resultado en `http://localhost:4300` imitando GitHub Pages (`/es` → `/es/`, `404.html`).
- Los links internos usan barra final (`/es/#about`): GitHub Pages redirige `/es` → `/es/`.

## Convenciones
- Componentes standalone, `OnPush`, signals, zoneless. Textos siempre vía Transloco (`src/i18n`), datos en `src/app/data/profile.ts`.
- Animaciones sólo con `injectMotion` (`src/app/core/motion.ts`): corre en browser, respeta `prefers-reduced-motion`. El contenido debe verse completo sin JS.
- Dependencias: versiones fijadas con ≥7 días de publicadas (`npm install --before=<fecha>`).
