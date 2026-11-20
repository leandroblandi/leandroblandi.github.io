import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { of } from 'rxjs';
import en from '../../i18n/en.json';
import es from '../../i18n/es.json';

const TRANSLATIONS: Record<string, Translation> = { es, en };

/** Traducciones empaquetadas: carga síncrona, sin HTTP, compatible con prerender. */
@Injectable({ providedIn: 'root' })
export class InlineTranslocoLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    return of(TRANSLATIONS[lang] ?? es);
  }
}
