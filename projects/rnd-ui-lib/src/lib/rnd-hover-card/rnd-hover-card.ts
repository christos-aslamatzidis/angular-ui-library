import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-hover-card',
  styleUrl: './rnd-hover-card.css',
  templateUrl: './rnd-hover-card.html',
})
export class RndHoverCard {
  protected open = signal(false);

  private openTimeout?: ReturnType<typeof setTimeout>;
  private closeTimeout?: ReturnType<typeof setTimeout>;

  protected scheduleOpen(): void {
    clearTimeout(this.closeTimeout);
    this.openTimeout = setTimeout(() => this.open.set(true), 200);
  }

  protected scheduleClose(): void {
    clearTimeout(this.openTimeout);
    this.closeTimeout = setTimeout(() => this.open.set(false), 150);
  }
}
