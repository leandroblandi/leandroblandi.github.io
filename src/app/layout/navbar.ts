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
import { ScrollSpyService } from '../core/scroll-spy.service';
import { Lang, SECTIONS } from '../data/profile';
import { Icon } from '../shared/ui/icon';
import { LangSwitcher } from './lang-switcher';
import { ThemeToggle } from './theme-toggle';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, Icon, LangSwitcher, ThemeToggle],
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly lang = input.required<Lang>();
  protected readonly spy = inject(ScrollSpyService);
  protected readonly sections = SECTIONS;
  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = () => this.scrolled.set(window.scrollY > 24);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  protected href(id: string) {
    return `/${this.lang()}#${id}`;
  }
}
