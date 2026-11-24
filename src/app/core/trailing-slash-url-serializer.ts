import { Injectable } from '@angular/core';
import { DefaultUrlSerializer, UrlTree } from '@angular/router';

/**
 * GitHub Pages sirve cada página como carpeta (`/es/`) y redirige `/es` → `/es/`. Por defecto el
 * router reescribe la URL sin barra final, lo que convierte los links `/es/#about` en recargas.
 * Este serializer mantiene la barra final en todas las URLs que escribe el router.
 */
@Injectable()
export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
  override serialize(tree: UrlTree): string {
    const url = super.serialize(tree);
    const end = url.search(/[?#]/);
    const path = end === -1 ? url : url.slice(0, end);
    return path.endsWith('/') ? url : `${path}/${url.slice(path.length)}`;
  }
}
