import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { REDUCED_MOTION, gsap } from '../../core/motion';

/**
 * Tilt card: rota el elemento en 3D según la posición del puntero, con un leve zoom y un reflejo
 * de luz que sigue al cursor. Usa GSAP para componer la rotación con las animaciones de entrada.
 * Sólo en dispositivos con puntero fino; con movimiento reducido la inclinación es la mitad.
 */
@Directive({ selector: '[appTilt]' })
export class Tilt {
  /** Inclinación máxima en grados. */
  readonly max = input(10, { alias: 'appTilt', transform: (v: unknown) => numberAttribute(v, 10) });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const factor = matchMedia(REDUCED_MOTION).matches ? 0.5 : 1;

      const glare = document.createElement('span');
      glare.className = 'tilt-glare';
      glare.setAttribute('aria-hidden', 'true');
      el.appendChild(glare);

      const to = (prop: string) => gsap.quickTo(el, prop, { duration: 0.6, ease: 'power3.out' });
      const rotateX = to('rotationX');
      const rotateY = to('rotationY');
      const scaleX = to('scaleX');
      const scaleY = to('scaleY');
      const scale = (value: number) => {
        scaleX(value);
        scaleY(value);
      };
      let rect = el.getBoundingClientRect();

      const onEnter = () => {
        gsap.set(el, { transformPerspective: 1000 });
        rect = el.getBoundingClientRect();
        glare.style.opacity = '1';
        scale(1.03);
      };
      const onMove = (e: PointerEvent) => {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const max = this.max() * factor;
        rotateY(x * max * 2);
        rotateX(-y * max * 2);
        glare.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
        glare.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
      };
      const onLeave = () => {
        rotateX(0);
        rotateY(0);
        scale(1);
        glare.style.opacity = '0';
      };

      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointermove', onMove, { passive: true });
      el.addEventListener('pointerleave', onLeave);
      destroyRef.onDestroy(() => {
        el.removeEventListener('pointerenter', onEnter);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
        glare.remove();
      });
    });
  }
}
