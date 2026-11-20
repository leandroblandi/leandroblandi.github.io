import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { ScrollSpyService } from '../core/scroll-spy.service';
import { Lang, SECTIONS } from '../data/profile';
import { Footer } from '../layout/footer';
import { Navbar } from '../layout/navbar';
import { About } from '../sections/about';
import { Contact } from '../sections/contact';
import { Education } from '../sections/education';
import { Experience } from '../sections/experience';
import { Hero } from '../sections/hero';
import { Skills } from '../sections/skills';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, Footer, Hero, About, Experience, Education, Skills, Contact],
  template: `
    <app-navbar [lang]="lang()" />
    <main id="main" tabindex="-1" class="outline-none">
      <app-hero [lang]="lang()" />
      <app-about [lang]="lang()" />
      <app-experience [lang]="lang()" />
      <app-education />
      <app-skills />
      <app-contact [lang]="lang()" />
    </main>
    <app-footer />
  `,
})
export class HomePage {
  readonly lang = input.required<Lang>();

  constructor() {
    const spy = inject(ScrollSpyService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => destroyRef.onDestroy(spy.observe(SECTIONS)));
  }
}
