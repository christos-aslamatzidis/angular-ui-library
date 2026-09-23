import { Component, computed, inject, input } from '@angular/core';
import { RndSegmentedControl } from '../rnd-segmented-control/rnd-segmented-control';

const BASE_CLASSES =
  'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

@Component({
  imports: [],
  selector: 'rnd-segmented-option',
  styleUrl: './rnd-segmented-option.css',
  templateUrl: './rnd-segmented-option.html',
})
export class RndSegmentedOption {
  value = input.required<string>();

  protected control = inject(RndSegmentedControl);

  protected active = computed(() => this.control.activeValue() === this.value());

  protected classes = computed(() =>
    this.active()
      ? `${BASE_CLASSES} bg-gradient-to-r from-secondary to-primary text-white`
      : `${BASE_CLASSES} text-muted hover:text-foreground`,
  );

  protected onClick(): void {
    this.control.activeValue.set(this.value());
  }
}
