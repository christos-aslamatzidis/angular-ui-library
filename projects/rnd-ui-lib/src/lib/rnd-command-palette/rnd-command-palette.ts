import {
  Component,
  ElementRef,
  computed,
  effect,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';
import { RndKbd } from '../rnd-kbd/rnd-kbd';

export interface RndCommandItem {
  id: string;
  label: string;
  description?: string;
}

@Component({
  imports: [RndIcon, RndKbd],
  selector: 'rnd-command-palette',
  styleUrl: './rnd-command-palette.css',
  templateUrl: './rnd-command-palette.html',
  host: {
    '(document:keydown)': 'onGlobalKeydown($event)',
  },
})
export class RndCommandPalette {
  items = input<RndCommandItem[]>([]);
  open = model(false);

  select = output<string>();

  protected query = signal('');
  protected highlightedIndex = signal(0);

  protected filteredItems = computed(() => {
    const query = this.query().trim().toLowerCase();

    if (!query) {
      return this.items();
    }

    return this.items().filter(
      (item) =>
        item.label.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query),
    );
  });

  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const dialogEl = this.dialog().nativeElement;

      if (this.open()) {
        if (!dialogEl.open) {
          dialogEl.showModal();
        }
      } else if (dialogEl.open) {
        dialogEl.close();
      }
    });
  }

  protected onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.query.set('');
      this.highlightedIndex.set(0);
      this.open.set(true);
    }
  }

  protected onDialogClose(): void {
    this.open.set(false);
  }

  protected onQueryInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.highlightedIndex.set(0);
  }

  protected onListKeydown(event: KeyboardEvent): void {
    const items = this.filteredItems();

    if (items.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.highlightedIndex.set((this.highlightedIndex() + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.highlightedIndex.set((this.highlightedIndex() - 1 + items.length) % items.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = items[this.highlightedIndex()];

      if (item) {
        this.chooseItem(item.id);
      }
    }
  }

  protected chooseItem(id: string): void {
    this.select.emit(id);
    this.open.set(false);
  }
}
