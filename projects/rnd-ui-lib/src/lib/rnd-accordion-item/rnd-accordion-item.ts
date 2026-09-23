import { Component, computed, inject, input } from '@angular/core';
import { RndAccordion } from '../rnd-accordion/rnd-accordion';
import { RndIcon } from '../rnd-icon/rnd-icon';

@Component({
  imports: [RndIcon],
  selector: 'rnd-accordion-item',
  styleUrl: './rnd-accordion-item.css',
  templateUrl: './rnd-accordion-item.html',
})
export class RndAccordionItem {
  value = input.required<string>();
  label = input('');

  protected accordion = inject(RndAccordion);

  protected expanded = computed(() => this.accordion.expandedValues().includes(this.value()));

  protected onToggle(): void {
    this.accordion.toggle(this.value());
  }
}
