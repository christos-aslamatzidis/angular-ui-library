import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';
import { positionPopoverPanel } from '../popover-position';

@Component({
  imports: [RndIcon],
  selector: 'rnd-split-button',
  styleUrl: './rnd-split-button.css',
  templateUrl: './rnd-split-button.html',
  host: {
    '(window:scroll)': 'onReposition()',
    '(window:resize)': 'onReposition()',
  },
})
export class RndSplitButton {
  label = input.required<string>();
  disabled = input(false);

  action = output<void>();

  private trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  protected onToggleClick(): void {
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
