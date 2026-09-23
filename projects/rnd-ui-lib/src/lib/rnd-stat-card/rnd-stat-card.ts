import { Component, computed, input } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

export type RndStatCardTrend = 'up' | 'down' | 'neutral';

@Component({
  imports: [RndIcon],
  selector: 'rnd-stat-card',
  styleUrl: './rnd-stat-card.css',
  templateUrl: './rnd-stat-card.html',
})
export class RndStatCard {
  label = input.required<string>();
  value = input.required<string>();
  delta = input<number>();
  trend = input<RndStatCardTrend>();

  protected resolvedTrend = computed<RndStatCardTrend>(() => {
    const trend = this.trend();

    if (trend) {
      return trend;
    }

    const delta = this.delta();

    if (delta === undefined || delta === 0) {
      return 'neutral';
    }

    return delta > 0 ? 'up' : 'down';
  });

  protected deltaClasses = computed(() => {
    const trend = this.resolvedTrend();

    if (trend === 'up') {
      return 'text-success';
    }

    if (trend === 'down') {
      return 'text-error';
    }

    return 'text-muted';
  });
}
