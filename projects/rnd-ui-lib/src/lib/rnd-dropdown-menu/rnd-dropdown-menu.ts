import { Component, ElementRef, input, viewChild } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';
import { positionPopoverPanel } from '../popover-position';

let nextMenuId = 0;

@Component({
  imports: [RndIcon],
  selector: 'rnd-dropdown-menu',
  styleUrl: './rnd-dropdown-menu.css',
  templateUrl: './rnd-dropdown-menu.html',
  host: {
    '(window:scroll)': 'onReposition()',
    '(window:resize)': 'onReposition()',
  },
})
export class RndDropdownMenu {
  label = input('Menu');

  protected menuId = `rnd-dropdown-menu-${++nextMenuId}`;

  private trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private panel = viewChild.required<ElementRef<HTMLDivElement>>('panel');

  protected onToggle(event: Event): void {
    const newState = (event as Event & { newState?: string }).newState;

    if (newState !== 'open') {
      return;
    }

    this.reposition();
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
