import { DestroyRef, ElementRef, afterRenderEffect, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Ejecuta `setup` (sólo en el browser, tras renderizar) dentro de un contexto GSAP acotado al host.
 * Sólo corre si el usuario no pidió reducir movimiento. Se revierte y vuelve a ejecutar cuando cambian
 * las señales leídas en `track` (p. ej. el idioma), y se limpia al destruir el componente.
 */
export function injectMotion(
  setup: (root: HTMLElement) => void | (() => void),
  track?: () => unknown,
) {
  const root = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  let mm: gsap.MatchMedia | undefined;

  afterRenderEffect(() => {
    track?.();
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    mm?.revert();
    mm = gsap.matchMedia(root);
    mm.add('(prefers-reduced-motion: no-preference)', () => setup(root));
  });

  inject(DestroyRef).onDestroy(() => mm?.revert());
}

export { gsap, ScrollTrigger };

/** Revela los elementos `[data-heading]` de un SectionHeading al entrar en viewport. */
export function revealHeading(root: HTMLElement) {
  const items = root.querySelectorAll('[data-heading]');
  if (!items.length) return;
  gsap.from(items, {
    y: 24,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: { trigger: items[0], start: 'top 85%' },
  });
}
