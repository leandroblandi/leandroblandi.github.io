import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { gsap, injectMotion, revealHeading } from '../core/motion';
import { SKILL_GROUPS } from '../data/profile';
import { Chip } from '../shared/ui/chip';
import { GlassCard } from '../shared/ui/glass-card';
import { SectionHeading } from '../shared/ui/section-heading';
import { Tilt } from '../shared/ui/tilt';

const LAYOUT: Record<string, string> = {
  aws: 'md:col-span-2 md:row-span-2',
  frontend: 'md:col-span-2',
};

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, Chip, GlassCard, SectionHeading, Tilt],
  templateUrl: './skills.html',
})
export class Skills {
  protected readonly groups = SKILL_GROUPS.map((g) => ({ ...g, layout: LAYOUT[g.id] ?? '' }));

  constructor() {
    injectMotion((root) => {
      revealHeading(root);
      gsap.utils.toArray<HTMLElement>('[data-cell]').forEach((cell, i) => {
        gsap
          .timeline({ scrollTrigger: { trigger: cell, start: 'top 85%' } })
          .from(cell, { y: 50, opacity: 0, duration: 0.9, ease: 'expo.out', delay: (i % 3) * 0.08 })
          .from(
            cell.querySelectorAll('[data-skill]'),
            { scale: 0.6, opacity: 0, duration: 0.4, ease: 'back.out(2)', stagger: 0.04 },
            '-=0.5',
          );
      });
    });
  }
}
