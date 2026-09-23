import { Component, input, model } from '@angular/core';

let nextGroupId = 0;

@Component({
  imports: [],
  selector: 'rnd-radio-group',
  styleUrl: './rnd-radio-group.css',
  templateUrl: './rnd-radio-group.html',
})
export class RndRadioGroup {
  name = input(`rnd-radio-group-${++nextGroupId}`);
  value = model('');
  disabled = input(false);
}
