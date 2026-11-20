import { DOCUMENT, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';
const THEME_COLORS: Record<Theme, string> = { dark: '#0a0a0a', light: '#fafaf9' };

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(
    this.isBrowser && !this.document.documentElement.classList.contains('dark') ? 'light' : 'dark',
  );

  toggle() {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.document.documentElement.classList.toggle('dark', next === 'dark');
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[next]);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* almacenamiento no disponible */
    }
  }
}
