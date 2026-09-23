import { Component, computed, input, output } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

export type RndAlertVariant = 'info' | 'success' | 'warning' | 'error';

const BASE_CLASSES = 'flex gap-3 rounded-xl border-l-4 p-4';

const VARIANT_CLASSES: Record<RndAlertVariant, string> = {
  info: 'border-info bg-info/10 text-info',
  success: 'border-success bg-success/10 text-success',
  warning: 'border-warning bg-warning/10 text-warning',
  error: 'border-error bg-error/10 text-error',
};

@Component({
  imports: [RndIcon],
  selector: 'rnd-alert',
  styleUrl: './rnd-alert.css',
  templateUrl: './rnd-alert.html',
})
export class RndAlert {
  variant = input<RndAlertVariant>('info');
  dismissible = input(false);

  dismiss = output<void>();

  protected classes = computed(() => [BASE_CLASSES, VARIANT_CLASSES[this.variant()]].join(' '));
}
