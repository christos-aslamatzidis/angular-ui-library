import { Component, input, model } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

@Component({
  imports: [RndIcon],
  selector: 'rnd-collapsible',
  styleUrl: './rnd-collapsible.css',
  templateUrl: './rnd-collapsible.html',
})
export class RndCollapsible {
  label = input('');
  open = model(false);

  protected toggle(): void {
    this.open.set(!this.open());
  }
}
