import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-table',
  styleUrl: './rnd-table.css',
  templateUrl: './rnd-table.html',
})
export class RndTable {
  striped = input(false);
  hoverable = input(false);

  protected tableClasses = computed(() => {
    const classes = ['w-full text-left text-sm'];

    if (this.striped()) {
      classes.push('[&>tbody>tr:nth-child(odd)]:bg-white/5');
    }

    if (this.hoverable()) {
      classes.push('[&>tbody>tr]:transition-colors [&>tbody>tr:hover]:bg-white/10');
    }

    return classes.join(' ');
  });
}
