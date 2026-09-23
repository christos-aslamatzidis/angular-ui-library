import { Component, computed, input } from '@angular/core';

export type RndAssetRowTrend = 'up' | 'down' | 'neutral';

@Component({
  imports: [],
  selector: 'rnd-asset-row',
  styleUrl: './rnd-asset-row.css',
  templateUrl: './rnd-asset-row.html',
})
export class RndAssetRow {
  name = input.required<string>();
  symbol = input.required<string>();
  balance = input.required<string>();
  value = input<string>();
  delta = input<number>();

  protected trend = computed<RndAssetRowTrend>(() => {
    const delta = this.delta();

    if (delta === undefined || delta === 0) {
      return 'neutral';
    }

    return delta > 0 ? 'up' : 'down';
  });

  protected deltaClasses = computed(() => {
    const trend = this.trend();

    if (trend === 'up') {
      return 'text-success';
    }

    if (trend === 'down') {
      return 'text-error';
    }

    return 'text-muted';
  });
}
