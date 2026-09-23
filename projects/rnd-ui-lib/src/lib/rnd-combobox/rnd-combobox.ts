import { Component, ElementRef, computed, input, model, signal, viewChild } from '@angular/core';
import { positionPopoverPanel } from '../popover-position';

export interface RndComboboxOption {
  label: string;
  value: string;
}

let nextComboboxId = 0;

@Component({
  imports: [],
  selector: 'rnd-combobox',
  styleUrl: './rnd-combobox.css',
  templateUrl: './rnd-combobox.html',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(window:scroll)': 'onReposition()',
    '(window:resize)': 'onReposition()',
  },
})
export class RndCombobox {
  options = input<RndComboboxOption[]>([]);
  placeholder = input('Search...');
  value = model('');

  protected panelId = `rnd-combobox-${++nextComboboxId}`;

  protected query = signal('');
  protected highlightedIndex = signal(0);
  protected isOpen = signal(false);

  private trigger = viewChild.required<ElementRef<HTMLElement>>('trigger');
  private panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  protected selectedLabel = computed(
    () => this.options().find((option) => option.value === this.value())?.label ?? '',
  );

  protected filteredOptions = computed(() => {
    const query = this.query().trim().toLowerCase();

    if (!query) {
      return this.options();
    }

    return this.options().filter((option) => option.label.toLowerCase().includes(query));
  });

  protected optionId(index: number): string {
    return `${this.panelId}-option-${index}`;
  }

  protected onActivate(): void {
    if (this.isOpen()) {
      return;
    }

    this.query.set('');
    this.highlightedIndex.set(0);
    this.openPanel();
  }

  protected onBlur(event: FocusEvent): void {
    const nextTarget = event.relatedTarget as Node | null;

    if (nextTarget && this.panel().nativeElement.contains(nextTarget)) {
      return;
    }

    this.closePanel();
    this.query.set('');
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) {
      return;
    }

    const target = event.target as Node;

    if (this.trigger().nativeElement.contains(target) || this.panel().nativeElement.contains(target)) {
      return;
    }

    this.closePanel();
    this.query.set('');
  }

  protected onReposition(): void {
    if (this.isOpen()) {
      this.reposition();
    }
  }

  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.highlightedIndex.set(0);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const options = this.filteredOptions();

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closePanel();
      return;
    }

    if (options.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.highlightedIndex.set((this.highlightedIndex() + 1) % options.length);
      this.scrollHighlightedIntoView();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.highlightedIndex.set((this.highlightedIndex() - 1 + options.length) % options.length);
      this.scrollHighlightedIntoView();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.chooseOption(options[this.highlightedIndex()]);
    }
  }

  protected chooseOption(option: RndComboboxOption): void {
    this.value.set(option.value);
    this.query.set('');
    this.closePanel();
  }

  private openPanel(): void {
    this.reposition();
    this.panel().nativeElement.showPopover();
    this.isOpen.set(true);
  }

  private closePanel(): void {
    if (!this.isOpen()) {
      return;
    }

    this.panel().nativeElement.hidePopover();
    this.isOpen.set(false);
  }

  private reposition(): void {
    positionPopoverPanel(
      this.panel().nativeElement,
      this.trigger().nativeElement.getBoundingClientRect(),
      { matchWidth: true },
    );
  }

  private scrollHighlightedIntoView(): void {
    const buttons = this.panel().nativeElement.querySelectorAll('button');
    buttons[this.highlightedIndex()]?.scrollIntoView({ block: 'nearest' });
  }
}
