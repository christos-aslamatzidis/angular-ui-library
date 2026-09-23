import { Component, computed, inject, input } from '@angular/core';
import { RndTabs } from '../rnd-tabs/rnd-tabs';

const UNDERLINE_BASE_CLASSES =
  'relative flex items-center gap-2 px-1 pb-3 font-body text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const PILLS_BASE_CLASSES =
  'flex items-center gap-2 rounded-full px-4 py-1.5 font-body text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

@Component({
  imports: [],
  selector: 'rnd-tab',
  styleUrl: './rnd-tab.css',
  templateUrl: './rnd-tab.html',
})
export class RndTab {
  value = input.required<string>();

  protected tabs = inject(RndTabs);

  protected active = computed(() => this.tabs.activeValue() === this.value());

  protected classes = computed(() => {
    if (this.tabs.variant() === 'pills') {
      return this.active()
        ? `${PILLS_BASE_CLASSES} bg-gradient-to-r from-secondary to-primary text-white`
        : `${PILLS_BASE_CLASSES} text-muted hover:text-foreground`;
    }

    return this.active()
      ? `${UNDERLINE_BASE_CLASSES} text-foreground`
      : `${UNDERLINE_BASE_CLASSES} text-muted`;
  });

  protected onClick(): void {
    this.tabs.activeValue.set(this.value());
  }
}
