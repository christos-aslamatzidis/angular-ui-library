import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-timeline-item',
  styleUrl: './rnd-timeline-item.css',
  templateUrl: './rnd-timeline-item.html',
})
export class RndTimelineItem {
  step = input.required<number>();
  title = input.required<string>();
  description = input<string>();
}
