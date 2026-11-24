// Sirve dist/ con las mismas reglas que GitHub Pages: /es -> 301 /es/, carpetas -> index.html,
// rutas inexistentes -> 404.html. Correr después de `npm run build:pages`.
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = join(import.meta.dirname, '../dist/portfolio/browser');
const port = Number(process.env.PORT ?? 4300);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let path = normalize(join(root, decodeURIComponent(url.pathname)));
  if (!path.startsWith(root)) return res.writeHead(403).end();
  if (existsSync(path) && statSync(path).isDirectory()) {
    if (!url.pathname.endsWith('/')) {
      return res.writeHead(301, { location: `${url.pathname}/${url.search}` }).end();
    }
    path = join(path, 'index.html');
  }
  const found = existsSync(path);
  if (!found) path = join(root, '404.html');
  res.writeHead(found ? 200 : 404, {
    'content-type': types[extname(path)] ?? 'application/octet-stream',
  });
  createReadStream(path).pipe(res);
}).listen(port, () => console.log(`Preview: http://localhost:${port}`));
