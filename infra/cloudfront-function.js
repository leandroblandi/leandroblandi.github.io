// CloudFront Function (runtime cloudfront-js-2.0), evento "Viewer request".
// - "/"            -> 302 a /es o /en según Accept-Language.
// - "/es", "/en/"  -> sirve /es/index.html (rutas prerenderizadas).
// - rutas sin extensión desconocidas -> /index.csr.html (el router de Angular redirige).
var LANGS = ['es', 'en'];

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri === '/' || uri === '') {
    var header = request.headers['accept-language'];
    var lang = header && /^en/i.test(header.value) ? 'en' : 'es';
    return {
      statusCode: 302,
      statusDescription: 'Found',
      headers: { location: { value: '/' + lang }, 'cache-control': { value: 'no-cache' } },
    };
  }

  var clean = uri.replace(/\/+$/, '');
  var first = clean.split('/')[1];
  if (LANGS.indexOf(first) !== -1 && clean === '/' + first) {
    request.uri = clean + '/index.html';
  } else if (clean.indexOf('.') === -1) {
    request.uri = '/index.csr.html';
  }
  return request;
}
