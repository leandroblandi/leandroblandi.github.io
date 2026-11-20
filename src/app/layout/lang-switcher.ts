import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { LANGS, Lang } from '../data/profile';

@Component({
  selector: 'app-lang-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslocoDirective],
  template: `
    <div
      *transloco="let t"
      class="flex items-center rounded-full border border-line p-0.5 font-mono text-xs"
      role="group"
      [attr.aria-label]="t('a11y.lang')"
    >
      @for (l of langs; track l) {
        <a
          [routerLink]="['/', l]"
          [attr.hreflang]="l"
          [attr.lang]="l"
          [attr.aria-current]="l === lang() ? 'true' : null"
          class="rounded-full px-2.5 py-1.5 uppercase transition-colors"
          [class]="l === lang() ? 'bg-surface-strong text-fg' : 'text-muted hover:text-fg'"
          >{{ l }}</a
        >
      }
    </div>
  `,
})
export class LangSwitcher {
  readonly lang = input.required<Lang>();
  protected readonly langs = LANGS;
}
