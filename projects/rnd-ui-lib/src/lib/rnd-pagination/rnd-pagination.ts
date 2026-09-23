import { Component, computed, input, model } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

const PAGE_BUTTON_BASE_CLASSES =
  'flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all';

const NAV_BUTTON_CLASSES =
  'flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent';

@Component({
  imports: [RndIcon],
  selector: 'rnd-pagination',
  styleUrl: './rnd-pagination.css',
  templateUrl: './rnd-pagination.html',
})
export class RndPagination {
  page = model(1);
  totalPages = input(1);
  maxSize = input(0);
  rotate = input(false);

  protected navButtonClasses = NAV_BUTTON_CLASSES;

  protected pages = computed(() => {
    const total = this.totalPages();
    const size = this.maxSize();

    if (size <= 0 || size >= total) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const current = this.page();
    let start: number;

    if (this.rotate()) {
      start = Math.max(1, current - Math.floor(size / 2));

      if (start + size - 1 > total) {
        start = total - size + 1;
      }
    } else {
      start = Math.floor((current - 1) / size) * size + 1;
    }

    return Array.from({ length: size }, (_, i) => start + i);
  });

  protected pageButtonClasses(p: number): string {
    if (p === this.page()) {
      return [
        PAGE_BUTTON_BASE_CLASSES,
        'bg-gradient-to-r from-secondary to-primary text-white',
      ].join(' ');
    }

    return [PAGE_BUTTON_BASE_CLASSES, 'text-muted hover:bg-white/5 hover:text-foreground'].join(
      ' ',
    );
  }

  protected goTo(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.page.set(page);
  }
}
