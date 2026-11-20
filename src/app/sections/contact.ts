import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { gsap, injectMotion } from '../core/motion';
import { Lang, SITE } from '../data/profile';
import { Button } from '../shared/ui/button';
import { Icon } from '../shared/ui/icon';
import { Spotlight } from '../shared/ui/spotlight';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, Button, Icon, Spotlight],
  templateUrl: './contact.html',
})
export class Contact {
  readonly lang = input.required<Lang>();
  protected readonly site = SITE;
  protected readonly copied = signal(false);
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
    injectMotion((root) => {
      gsap
        .timeline({ scrollTrigger: { trigger: '[data-panel]', start: 'top 80%' } })
        .from('[data-panel]', { scale: 0.92, opacity: 0, duration: 1.2, ease: 'expo.out' })
        .from(
          '[data-cta]',
          { y: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' },
          '-=0.8',
        );
      gsap.to('[data-orb]', {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
        scrollTrigger: { trigger: root, toggleActions: 'play pause resume pause' },
      });
    });
  }

  protected async copyEmail() {
    await navigator.clipboard.writeText(SITE.email);
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 2000);
  }
}
