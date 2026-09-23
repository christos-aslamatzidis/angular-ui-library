import { Component, computed, input } from '@angular/core';

export type RndSparklineTrend = 'up' | 'down' | 'neutral';

const STROKE_CLASSES: Record<RndSparklineTrend, string> = {
  up: 'text-success',
  down: 'text-error',
  neutral: 'text-primary',
};

@Component({
  imports: [],
  selector: 'rnd-sparkline',
  styleUrl: './rnd-sparkline.css',
  templateUrl: './rnd-sparkline.html',
})
export class RndSparkline {
  data = input<number[]>([]);
  width = input(100);
  height = input(32);
  trend = input<RndSparklineTrend>('neutral');

  protected strokeClasses = computed(() => STROKE_CLASSES[this.trend()]);

  protected points = computed(() => {
    const data = this.data();

    if (data.length < 2) {
      return '';
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = this.width();
    const height = this.height();
    const stepX = width / (data.length - 1);

    return data
      .map((value, i) => {
        const x = i * stepX;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');
  });
}
