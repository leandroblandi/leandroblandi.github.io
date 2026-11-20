import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { gsap, injectMotion, revealHeading } from '../core/motion';
import { EDUCATION } from '../data/profile';
import { Chip } from '../shared/ui/chip';
import { GlassCard } from '../shared/ui/glass-card';
import { Icon } from '../shared/ui/icon';
import { SectionHeading } from '../shared/ui/section-heading';

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, Chip, GlassCard, Icon, SectionHeading],
  templateUrl: './education.html',
})
export class Education {
  protected readonly edu = EDUCATION;
  protected readonly progress = Math.round(
    ((EDUCATION.currentYear - 0.5) / EDUCATION.totalYears) * 100,
  );

  constructor() {
    injectMotion((root) => {
      revealHeading(root);
      const trigger = root.querySelector('[data-card]');
      const tl = gsap.timeline({ scrollTrigger: { trigger, start: 'top 80%' } });
      tl.from(trigger, { y: 60, opacity: 0, duration: 1, ease: 'expo.out' })
        .from('[data-bar]', { scaleX: 0, duration: 1.4, ease: 'expo.out' }, '-=0.5')
        .from(
          '[data-gpa]',
          { textContent: 0, snap: { textContent: 1 }, duration: 1.2, ease: 'power2.out' },
          '<',
        )
        .from(
          '[data-topic]',
          { y: 12, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power3.out' },
          '<0.2',
        );
    });
  }
}
