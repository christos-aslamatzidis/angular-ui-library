import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-empty-state',
  styleUrl: './rnd-empty-state.css',
  templateUrl: './rnd-empty-state.html',
})
export class RndEmptyState {
  title = input.required<string>();
  description = input<string>();
}
