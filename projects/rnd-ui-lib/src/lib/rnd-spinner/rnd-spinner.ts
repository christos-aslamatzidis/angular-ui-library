import { Component, computed, input } from '@angular/core';

export type RndSpinnerSize = 'sm' | 'md' | 'lg';
export type RndSpinnerVariant = 'primary' | 'foreground' | 'muted';

const SIZE_CLASSES: Record<RndSpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
};

const VARIANT_CLASSES: Record<RndSpinnerVariant, string> = {
  primary: 'text-primary',
  foreground: 'text-foreground',
  muted: 'text-muted',
};

@Component({
  imports: [],
  selector: 'rnd-spinner',
  styleUrl: './rnd-spinner.css',
  templateUrl: './rnd-spinner.html',
})
export class RndSpinner {
  size = input<RndSpinnerSize>('md');
  variant = input<RndSpinnerVariant>('primary');

  protected classes = computed(() =>
    ['animate-spin', SIZE_CLASSES[this.size()], VARIANT_CLASSES[this.variant()]].join(' '),
  );
}
