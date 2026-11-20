import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ThemeService } from '../core/theme.service';
import { Icon } from '../shared/ui/icon';

@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, TranslocoDirective],
  template: `
    <button
      *transloco="let t"
      type="button"
      class="grid size-10 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
      [attr.aria-label]="t('a11y.theme')"
      [title]="t('a11y.theme')"
      (click)="theme.toggle()"
    >
      <span class="hidden dark:contents"><app-icon name="sun" class="size-5" /></span>
      <span class="contents dark:hidden"><app-icon name="moon" class="size-5" /></span>
    </button>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
