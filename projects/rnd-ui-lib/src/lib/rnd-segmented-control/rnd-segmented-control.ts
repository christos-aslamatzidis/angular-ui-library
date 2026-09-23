import { Component, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-segmented-control',
  styleUrl: './rnd-segmented-control.css',
  templateUrl: './rnd-segmented-control.html',
})
export class RndSegmentedControl {
  activeValue = model('');
}
