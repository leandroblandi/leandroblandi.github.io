// Post-build para GitHub Pages:
// - index.html raíz: redirige a /es/ o /en/ según el idioma del navegador (sin JS, a /es/).
// - 404.html: shell de la app; el router de Angular redirige rutas desconocidas a /es.
import { copyFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(import.meta.dirname, '../dist/portfolio/browser');

writeFileSync(
  join(dist, 'index.html'),
  `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Leandro Blandi · Backend Engineer</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="https://leandroblandi.me/es/" />
    <script>
      var langs = navigator.languages || [navigator.language];
      var lang = langs.find(function (l) { return /^(es|en)/i.test(l); });
      location.replace('/' + (lang && /^en/i.test(lang) ? 'en' : 'es') + '/' + location.hash);
    </script>
    <noscript><meta http-equiv="refresh" content="0; url=/es/" /></noscript>
  </head>
  <body></body>
</html>
`,
);
copyFileSync(join(dist, 'index.csr.html'), join(dist, '404.html'));
console.log('GitHub Pages: index.html (redirect) y 404.html generados.');
