import { Directive, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out-expo cursor-pointer select-none [&_app-icon]:size-4';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand font-semibold text-black shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 active:translate-y-0',
  secondary: 'glass text-fg hover:bg-surface-strong hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-muted hover:text-fg hover:bg-surface',
};

@Directive({ selector: 'a[appButton], button[appButton]', host: { '[class]': 'classes()' } })
export class Button {
  readonly variant = input<ButtonVariant>('primary', { alias: 'appButton' });
  protected readonly classes = computed(() => `${BASE} ${VARIANTS[this.variant() || 'primary']}`);
}
