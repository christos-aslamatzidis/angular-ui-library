import { Component, input, model } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

@Component({
  imports: [RndIcon],
  selector: 'rnd-search-input',
  styleUrl: './rnd-search-input.css',
  templateUrl: './rnd-search-input.html',
})
export class RndSearchInput {
  value = model('');
  placeholder = input('Search...');
  disabled = input(false);

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected clear(): void {
    this.value.set('');
  }
}
