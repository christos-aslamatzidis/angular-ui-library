import { Component, input } from '@angular/core';

export type RndDividerOrientation = 'horizontal' | 'vertical';

@Component({
  imports: [],
  selector: 'rnd-divider',
  styleUrl: './rnd-divider.css',
  templateUrl: './rnd-divider.html',
})
export class RndDivider {
  orientation = input<RndDividerOrientation>('horizontal');
  label = input<string>();
}
