import { Component, computed, input } from '@angular/core';

export type RndSkeletonShape = 'text' | 'circle' | 'rect';

const SHAPE_CLASSES: Record<RndSkeletonShape, string> = {
  text: 'rounded-md',
  circle: 'rounded-full',
  rect: 'rounded-lg',
};

@Component({
  imports: [],
  selector: 'rnd-skeleton',
  styleUrl: './rnd-skeleton.css',
  templateUrl: './rnd-skeleton.html',
})
export class RndSkeleton {
  shape = input<RndSkeletonShape>('text');
  width = input('100%');
  height = input('1rem');

  protected classes = computed(() =>
    ['animate-pulse bg-surface', SHAPE_CLASSES[this.shape()]].join(' '),
  );
}
