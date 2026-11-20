import { RenderMode, ServerRoute } from '@angular/ssr';
import { LANGS } from './data/profile';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => LANGS.map((lang) => ({ lang })),
  },
  { path: '**', renderMode: RenderMode.Client },
];
