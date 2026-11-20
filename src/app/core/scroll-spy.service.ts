import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly document = inject(DOCUMENT);
  readonly active = signal<string | null>(null);

  /** Observa las secciones y marca como activa la que cruza el centro del viewport. Devuelve la función de limpieza. */
  observe(ids: readonly string[]): () => void {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) this.active.set(hit.target.id);
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    ids.map((id) => this.document.getElementById(id)).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }
}
