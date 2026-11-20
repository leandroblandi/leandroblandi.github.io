import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LANGS, Lang, SITE } from '../data/profile';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update(lang: Lang, title: string, description: string) {
    const url = `${SITE.url}/${lang}`;
    this.document.documentElement.lang = lang;
    this.title.setTitle(title);
    const tags: Record<string, string> = {
      description,
      'og:title': title,
      'og:description': description,
      'og:url': url,
      'og:type': 'website',
      'og:site_name': SITE.name,
      'og:locale': lang === 'es' ? 'es_AR' : 'en_US',
      'twitter:card': 'summary',
      'twitter:title': title,
      'twitter:description': description,
    };
    for (const [key, content] of Object.entries(tags)) {
      const attr = key.startsWith('og:') ? 'property' : 'name';
      this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
    }
    this.setLink('canonical', url);
    for (const alt of LANGS) this.setLink('alternate', `${SITE.url}/${alt}`, alt);
    this.setLink('alternate', `${SITE.url}/es`, 'x-default');
  }

  private setLink(rel: string, href: string, hreflang?: string) {
    const selector = `link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`;
    let link = this.document.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) link.hreflang = hreflang;
      this.document.head.appendChild(link);
    }
    link.href = href;
  }
}
