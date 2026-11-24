import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { UrlSerializer, provideRouter, withComponentInputBinding } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { routes } from './app.routes';
import { TrailingSlashUrlSerializer } from './core/trailing-slash-url-serializer';
import { InlineTranslocoLoader } from './core/transloco-loader';
import { DEFAULT_LANG, LANGS } from './data/profile';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    { provide: UrlSerializer, useClass: TrailingSlashUrlSerializer },
    provideClientHydration(withEventReplay()),
    provideTransloco({
      config: {
        availableLangs: [...LANGS],
        defaultLang: DEFAULT_LANG,
        fallbackLang: DEFAULT_LANG,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: InlineTranslocoLoader,
    }),
  ],
};
