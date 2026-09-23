import { Component, ElementRef, input, viewChild } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

let nextMenuId = 0;

@Component({
  imports: [RndIcon],
  selector: 'rnd-dropdown-menu',
  styleUrl: './rnd-dropdown-menu.css',
  templateUrl: './rnd-dropdown-menu.html',
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

    const triggerRect = this.trigger().nativeElement.getBoundingClientRect();
    const panelEl = this.panel().nativeElement;
    panelEl.style.left = `${triggerRect.left}px`;
    panelEl.style.top = `${triggerRect.bottom + 4}px`;
  }
}
