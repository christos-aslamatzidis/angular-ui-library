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

  protected navButtonClasses = NAV_BUTTON_CLASSES;

  protected pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

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
