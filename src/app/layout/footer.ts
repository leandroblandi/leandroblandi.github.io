import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { SITE } from '../data/profile';
import { Icon } from '../shared/ui/icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, TranslocoDirective],
  template: `
    <footer *transloco="let t" class="border-t border-line">
      <div
        class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row"
      >
        <p>© {{ year }} {{ site.name }} · {{ t('footer.built') }}</p>
        <div class="flex items-center gap-4">
          <a
            [href]="site.github"
            target="_blank"
            rel="noopener"
            class="hover:text-fg"
            aria-label="GitHub"
          >
            <app-icon name="github" class="size-5" />
          </a>
          @if (site.linkedin) {
            <a
              [href]="site.linkedin"
              target="_blank"
              rel="noopener"
              class="hover:text-fg"
              aria-label="LinkedIn"
            >
              <app-icon name="linkedin" class="size-5" />
            </a>
          }
          <a [href]="'mailto:' + site.email" class="hover:text-fg" aria-label="Email">
            <app-icon name="mail" class="size-5" />
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
