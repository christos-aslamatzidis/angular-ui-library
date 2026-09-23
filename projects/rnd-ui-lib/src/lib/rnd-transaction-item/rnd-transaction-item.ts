import { Component, computed, input } from '@angular/core';

export type RndTransactionDirection = 'in' | 'out';
export type RndTransactionStatus = 'confirmed' | 'pending' | 'failed';

const STATUS_CLASSES: Record<RndTransactionStatus, string> = {
  confirmed: 'text-success',
  pending: 'text-warning',
  failed: 'text-error',
};

@Component({
  imports: [],
  selector: 'rnd-transaction-item',
  styleUrl: './rnd-transaction-item.css',
  templateUrl: './rnd-transaction-item.html',
})
export class RndTransactionItem {
  direction = input.required<RndTransactionDirection>();
  title = input.required<string>();
  amount = input.required<string>();
  status = input<RndTransactionStatus>('confirmed');
  timestamp = input<string>();

  protected statusClasses = computed(() => STATUS_CLASSES[this.status()]);

  protected iconWrapperClasses = computed(() =>
    this.direction() === 'in'
      ? 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/15 text-success'
      : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-muted',
  );

  protected amountClasses = computed(() =>
    this.direction() === 'in' ? 'text-success' : 'text-foreground',
  );

  protected amountPrefix = computed(() => (this.direction() === 'in' ? '+' : '-'));
}
