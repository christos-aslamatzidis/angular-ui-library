import { Component, computed, input, output } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

export type RndToastVariant = 'info' | 'success' | 'warning' | 'error';

const VARIANT_CLASSES: Record<RndToastVariant, string> = {
  info: 'border-info/40 text-info',
  success: 'border-success/40 text-success',
  warning: 'border-warning/40 text-warning',
  error: 'border-error/40 text-error',
};

@Component({
  imports: [RndIcon],
  selector: 'rnd-toast',
  styleUrl: './rnd-toast.css',
  templateUrl: './rnd-toast.html',
})
export class RndToast {
  message = input.required<string>();
  variant = input<RndToastVariant>('info');

  dismiss = output<void>();

  protected classes = computed(() =>
    [
      'flex items-center gap-3 rounded-xl border bg-[#0f1115]/95 px-4 py-3 text-sm text-foreground shadow-[0_0_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-lg',
      VARIANT_CLASSES[this.variant()],
    ].join(' '),
  );
}
