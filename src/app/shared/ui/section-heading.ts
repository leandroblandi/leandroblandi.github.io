import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mb-12 block md:mb-16' },
  template: `
    <p class="mono-label mb-4" data-heading>// {{ index() }} · {{ label() }}</p>
    <h2 class="text-h2 font-semibold tracking-tight" data-heading>{{ title() }}</h2>
    @if (subtitle()) {
      <p class="mt-4 max-w-2xl text-lg text-muted" data-heading>{{ subtitle() }}</p>
    }
  `,
})
export class SectionHeading {
  readonly index = input.required<string>();
  readonly label = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
