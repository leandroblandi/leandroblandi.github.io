import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { REDUCED_MOTION, ScrollTrigger, gsap, injectMotion } from '../core/motion';
import { Lang, ROLES, SITE } from '../data/profile';
import { Button } from '../shared/ui/button';
import { Icon } from '../shared/ui/icon';
import { Spotlight } from '../shared/ui/spotlight';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, Button, Icon, Spotlight],
  templateUrl: './hero.html',
})
export class Hero {
  readonly lang = input.required<Lang>();
  protected readonly site = SITE;
  protected readonly roles = ROLES;
  protected readonly typed = signal(ROLES[0]);

  constructor() {
    injectMotion((root) => {
      const blobs = gsap.utils.toArray<HTMLElement>('[data-blob]').map((blob) =>
        gsap.to(blob, {
          x: 'random(-140, 140)',
          y: 'random(-90, 90)',
          scale: 'random(0.8, 1.3)',
          duration: 'random(7, 12)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        }),
      );
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: ({ isActive }) => blobs.forEach((t) => t.paused(!isActive)),
      });

      gsap
        .timeline({ defaults: { ease: 'expo.out', duration: 1.2 } })
        .fromTo(
          '[data-word]',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.12 },
        )
        .fromTo(
          '[data-reveal]:not([data-word])',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          '-=0.9',
        );

      gsap.to('[data-content]', {
        yPercent: -12,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });
    });

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (matchMedia(REDUCED_MOTION).matches) return;
      let timer: ReturnType<typeof setTimeout>;
      let role = 0;
      let length = ROLES[0].length;
      let deleting = true;
      const tick = () => {
        const full = ROLES[role];
        length += deleting ? -1 : 1;
        this.typed.set(full.slice(0, length));
        let delay = deleting ? 45 : 85;
        if (!deleting && length === full.length) {
          deleting = true;
          delay = 2200;
        } else if (deleting && length === 0) {
          deleting = false;
          role = (role + 1) % ROLES.length;
          delay = 300;
        }
        timer = setTimeout(tick, delay);
      };
      timer = setTimeout(tick, 3000);
      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
