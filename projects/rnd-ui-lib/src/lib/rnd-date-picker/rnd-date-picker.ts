import { Component, ElementRef, computed, input, model, viewChild } from '@angular/core';
import { RndCalendar } from '../rnd-calendar/rnd-calendar';
import { RndIcon } from '../rnd-icon/rnd-icon';

@Component({
  imports: [RndCalendar, RndIcon],
  selector: 'rnd-date-picker',
  styleUrl: './rnd-date-picker.css',
  templateUrl: './rnd-date-picker.html',
})
export class RndDatePicker {
  selected = model<Date | null>(null);
  placeholder = input('Select date');

  private trigger = viewChild.required<ElementRef<HTMLElement>>('trigger');
  private panel = viewChild.required('panel', { read: ElementRef<HTMLElement> });

  protected formattedDate = computed(
    () =>
      this.selected()?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }) ?? '',
  );

  protected onTriggerClick(): void {
    const panelEl = this.panel().nativeElement;

    if (panelEl.matches(':popover-open')) {
      panelEl.hidePopover();
      return;
    }

    const rect = this.trigger().nativeElement.getBoundingClientRect();
    panelEl.style.left = `${rect.left}px`;
    panelEl.style.top = `${rect.bottom + 4}px`;
    panelEl.showPopover();
  }

  protected onSelect(date: Date | null): void {
    this.selected.set(date);
    this.panel().nativeElement.hidePopover();
  }
}
