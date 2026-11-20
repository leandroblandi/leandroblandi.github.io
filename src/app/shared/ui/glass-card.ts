import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Spotlight } from './spotlight';

@Component({
  selector: 'app-glass-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [Spotlight],
  host: {
    class: 'glass gradient-border block rounded-2xl p-6 md:p-8',
  },
  template: '<ng-content />',
})
export class GlassCard {}
