import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

@Component({
  imports: [RndIcon],
  selector: 'rnd-split-button',
  styleUrl: './rnd-split-button.css',
  templateUrl: './rnd-split-button.html',
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

    const rect = this.trigger().nativeElement.getBoundingClientRect();
    panelEl.style.left = `${rect.left}px`;
    panelEl.style.top = `${rect.bottom + 4}px`;
    panelEl.showPopover();
  }
}
