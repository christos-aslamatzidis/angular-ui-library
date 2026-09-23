import { Component, computed, input, model } from '@angular/core';

export type RndTabsVariant = 'underline' | 'pills';

@Component({
  imports: [],
  selector: 'rnd-tabs',
  styleUrl: './rnd-tabs.css',
  templateUrl: './rnd-tabs.html',
})
export class RndTabs {
  activeValue = model('');
  variant = input<RndTabsVariant>('underline');

  protected containerClasses = computed(() =>
    this.variant() === 'pills' ? 'flex items-center gap-2' : 'flex gap-6 border-b border-border',
  );
}
