import { Component, input } from '@angular/core';

export interface RndBreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  imports: [],
  selector: 'rnd-breadcrumb',
  styleUrl: './rnd-breadcrumb.css',
  templateUrl: './rnd-breadcrumb.html',
})
export class RndBreadcrumb {
  items = input<RndBreadcrumbItem[]>([]);
}
