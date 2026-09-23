import { Component, ElementRef, viewChild } from '@angular/core';
import { positionPopoverPanel } from '../popover-position';

@Component({
  imports: [],
  selector: 'rnd-popover',
  styleUrl: './rnd-popover.css',
  templateUrl: './rnd-popover.html',
  host: {
    '(window:scroll)': 'onReposition()',
    '(window:resize)': 'onReposition()',
  },
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

    this.reposition();
    panelEl.showPopover();
  }

  protected onReposition(): void {
    if (this.panel().nativeElement.matches(':popover-open')) {
      this.reposition();
    }
  }

  private reposition(): void {
    positionPopoverPanel(
      this.panel().nativeElement,
      this.trigger().nativeElement.getBoundingClientRect(),
    );
  }
}
