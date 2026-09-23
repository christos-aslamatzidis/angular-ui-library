import { Component, computed, input } from '@angular/core';

export type RndCardVariant = 'standard' | 'glass';

const BASE_CLASSES = 'rounded-2xl border border-border transition-all duration-300';

const VARIANT_CLASSES: Record<RndCardVariant, string> = {
  standard: 'bg-surface',
  glass: 'bg-white/5 backdrop-blur-lg',
};

const HOVERABLE_CLASSES =
  'hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)]';

@Component({
  imports: [],
  selector: 'rnd-card',
  styleUrl: './rnd-card.css',
  templateUrl: './rnd-card.html',
})
export class RndCard {
  variant = input<RndCardVariant>('standard');
  hoverable = input(false);

  protected classes = computed(() => {
    const classes = [BASE_CLASSES, VARIANT_CLASSES[this.variant()]];

    if (this.hoverable()) {
      classes.push(HOVERABLE_CLASSES);
    }

    return classes.join(' ');
  });
}
