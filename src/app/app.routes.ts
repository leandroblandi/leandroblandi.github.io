import { Routes } from '@angular/router';
import { langMatch, langResolver } from './core/lang';
import { DEFAULT_LANG } from './data/profile';
import { HomePage } from './pages/home.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: DEFAULT_LANG },
  {
    path: ':lang',
    canMatch: [langMatch],
    resolve: { lang: langResolver },
    component: HomePage,
  },
  { path: '**', redirectTo: DEFAULT_LANG },
];
