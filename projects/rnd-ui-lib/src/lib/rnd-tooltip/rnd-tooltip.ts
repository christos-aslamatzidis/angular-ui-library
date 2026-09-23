import { Component, computed, input } from '@angular/core';

export type RndTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

const PLACEMENT_CLASSES: Record<RndTooltipPlacement, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
};

const BASE_CLASSES =
  'pointer-events-none absolute z-50 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs whitespace-nowrap text-foreground opacity-0 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100';

@Component({
  imports: [],
  selector: 'rnd-tooltip',
  styleUrl: './rnd-tooltip.css',
  templateUrl: './rnd-tooltip.html',
})
export class RndTooltip {
  text = input.required<string>();
  placement = input<RndTooltipPlacement>('top');

  protected tooltipClasses = computed(() =>
    [BASE_CLASSES, PLACEMENT_CLASSES[this.placement()]].join(' '),
  );
}
