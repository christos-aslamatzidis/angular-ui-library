import { Component, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-tabs',
  styleUrl: './rnd-tabs.css',
  templateUrl: './rnd-tabs.html',
})
export class RndTabs {
  activeValue = model('');
}
