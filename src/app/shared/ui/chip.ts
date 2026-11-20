import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg',
  },
  template: '<ng-content />',
})
export class Chip {}
