import { Component, computed, input, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-accordion',
  styleUrl: './rnd-accordion.css',
  templateUrl: './rnd-accordion.html',
})
export class RndAccordion {
  expandedValues = model<string[]>([]);
  multiple = input(false);
  flush = input(false);

  protected containerClasses = computed(() =>
    this.flush()
      ? 'flex flex-col divide-y divide-border'
      : 'flex flex-col divide-y divide-border rounded-xl border border-border',
  );

  toggle(value: string): void {
    const current = this.expandedValues();

    if (current.includes(value)) {
      this.expandedValues.set(current.filter((v) => v !== value));
      return;
    }

    this.expandedValues.set(this.multiple() ? [...current, value] : [value]);
  }
}
