import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslocoDirective, translateSignal } from '@jsverse/transloco';
import { gsap, injectMotion, revealHeading } from '../core/motion';
import { Lang } from '../data/profile';
import { GlassCard } from '../shared/ui/glass-card';
import { Icon, IconName } from '../shared/ui/icon';
import { SectionHeading } from '../shared/ui/section-heading';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, GlassCard, Icon, SectionHeading],
  templateUrl: './about.html',
})
export class About {
  readonly lang = input.required<Lang>();
  private readonly body = translateSignal('about.body');
  protected readonly words = computed(() => this.body().split(' '));
  protected readonly facts: { key: string; icon: IconName }[] = [
    { key: 'location', icon: 'map-pin' },
    { key: 'company', icon: 'briefcase' },
    { key: 'languages', icon: 'languages' },
    { key: 'gpa', icon: 'award' },
  ];

  constructor() {
    injectMotion(
      (root) => {
        revealHeading(root);
        gsap.fromTo(
          '[data-w]',
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-body]',
              start: 'top 80%',
              end: 'bottom 50%',
              scrub: true,
            },
          },
        );
        gsap.from('[data-fact]', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.querySelector('[data-facts]'), start: 'top 85%' },
        });
      },
      () => this.words(),
    );
  }
}
