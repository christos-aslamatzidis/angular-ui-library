import { Component, computed, input } from '@angular/core';

export type RndProgressBarSize = 'sm' | 'md' | 'lg';

const TRACK_SIZE_CLASSES: Record<RndProgressBarSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

@Component({
  imports: [],
  selector: 'rnd-progress-bar',
  styleUrl: './rnd-progress-bar.css',
  templateUrl: './rnd-progress-bar.html',
})
export class RndProgressBar {
  value = input(0);
  size = input<RndProgressBarSize>('md');
  indeterminate = input(false);
  striped = input(false);
  animated = input(false);

  protected trackClasses = computed(() =>
    ['w-full overflow-hidden rounded-full bg-surface', TRACK_SIZE_CLASSES[this.size()]].join(' '),
  );

  protected fillClasses = computed(() => {
    const classes = ['h-full rounded-full bg-gradient-to-r from-secondary to-primary'];

    if (this.striped()) {
      classes.push(
        'bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]',
      );
    }

    if (this.animated()) {
      classes.push('rnd-progress-bar-animated');
    }

    classes.push(
      this.indeterminate()
        ? 'w-1/3 animate-[rnd-progress-indeterminate_1.2s_ease-in-out_infinite]'
        : '',
    );

    return classes.join(' ');
  });

  protected widthPercent = computed(() => Math.min(100, Math.max(0, this.value())));
}
