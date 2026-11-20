import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslocoDirective, translateObjectSignal, translateSignal } from '@jsverse/transloco';
import { DurationLabels, formatDuration, formatMonth, monthsBetween } from '../core/duration';
import { gsap, injectMotion, revealHeading } from '../core/motion';
import { EXPERIENCE, Lang } from '../data/profile';
import { Chip } from '../shared/ui/chip';
import { GlassCard } from '../shared/ui/glass-card';
import { SectionHeading } from '../shared/ui/section-heading';
import { Tilt } from '../shared/ui/tilt';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, Chip, GlassCard, SectionHeading, Tilt],
  templateUrl: './experience.html',
})
export class Experience {
  readonly lang = input.required<Lang>();
  private readonly present = translateSignal('experience.present');
  private readonly labels = translateObjectSignal('duration');

  protected readonly items = computed(() => {
    const lang = this.lang();
    const labels = this.labels() as DurationLabels;
    return EXPERIENCE.map((job) => ({
      ...job,
      current: !job.end,
      range: `${formatMonth(job.start, lang)} — ${job.end ? formatMonth(job.end, lang) : this.present()}`,
      duration: formatDuration(monthsBetween(job.start, job.end ?? new Date()), labels),
    }));
  });

  constructor() {
    injectMotion(
      (root) => {
        revealHeading(root);
        gsap.fromTo(
          '[data-line]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-timeline]',
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
            },
          },
        );
        gsap.utils.toArray<HTMLElement>('[data-job]').forEach((job) =>
          gsap.from(job, {
            x: -40,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: job, start: 'top 85%' },
          }),
        );
        gsap.from('[data-dot]', {
          scale: 0,
          duration: 0.6,
          ease: 'back.out(3)',
          stagger: 0.2,
          scrollTrigger: { trigger: '[data-timeline]', start: 'top 75%' },
        });
      },
      () => this.items(),
    );
  }
}
