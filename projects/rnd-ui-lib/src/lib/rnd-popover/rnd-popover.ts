import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-popover',
  styleUrl: './rnd-popover.css',
  templateUrl: './rnd-popover.html',
})
export class RndPopover {
  private trigger = viewChild.required<ElementRef<HTMLElement>>('trigger');
  private panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  protected onTriggerClick(): void {
    const panelEl = this.panel().nativeElement;

    if (panelEl.matches(':popover-open')) {
      panelEl.hidePopover();
      return;
    }

    const triggerRect = this.trigger().nativeElement.getBoundingClientRect();
    panelEl.style.left = `${triggerRect.left}px`;
    panelEl.style.top = `${triggerRect.bottom + 4}px`;
    panelEl.showPopover();
  }
}
