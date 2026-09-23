import { Component, computed, inject, input } from '@angular/core';
import { RndTabs } from '../rnd-tabs/rnd-tabs';

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

  protected onClick(): void {
    this.tabs.activeValue.set(this.value());
  }
}
