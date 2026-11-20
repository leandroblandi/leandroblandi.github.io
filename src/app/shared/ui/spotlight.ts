import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/** Actualiza `--x`/`--y` con la posición del puntero, sin disparar change detection. */
@Directive({ selector: '[appSpotlight]', host: { class: 'spotlight' } })
export class Spotlight {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let frame = 0;
      const onMove = (e: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          el.style.setProperty('--x', `${e.clientX - rect.left}px`);
          el.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
      };
      el.addEventListener('pointermove', onMove, { passive: true });
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        el.removeEventListener('pointermove', onMove);
      });
    });
  }
}
