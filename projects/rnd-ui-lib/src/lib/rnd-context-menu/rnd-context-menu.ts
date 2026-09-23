import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-context-menu',
  styleUrl: './rnd-context-menu.css',
  templateUrl: './rnd-context-menu.html',
})
export class RndContextMenu {
  private panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  protected onContextMenu(event: MouseEvent): void {
    event.preventDefault();

    const panelEl = this.panel().nativeElement;
    panelEl.style.left = `${event.clientX}px`;
    panelEl.style.top = `${event.clientY}px`;
    panelEl.showPopover();
  }
}
