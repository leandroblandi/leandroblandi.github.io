import { inject } from '@angular/core';
import { CanMatchFn, ResolveFn } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { map } from 'rxjs';
import { Lang, isLang } from '../data/profile';
import { SeoService } from './seo.service';

export const langMatch: CanMatchFn = (_route, segments) => isLang(segments[0]?.path);

export const langResolver: ResolveFn<Lang> = (route) => {
  const lang = route.paramMap.get('lang') as Lang;
  const transloco = inject(TranslocoService);
  const seo = inject(SeoService);
  return transloco.load(lang).pipe(
    map(() => {
      transloco.setActiveLang(lang);
      seo.update(
        lang,
        transloco.translate('meta.title', {}, lang),
        transloco.translate('meta.description', {}, lang),
      );
      return lang;
    }),
  );
};
