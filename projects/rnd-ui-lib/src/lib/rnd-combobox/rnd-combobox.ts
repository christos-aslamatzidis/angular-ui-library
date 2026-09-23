import { Component, ElementRef, computed, input, model, signal, viewChild } from '@angular/core';

export interface RndComboboxOption {
  label: string;
  value: string;
}

@Component({
  imports: [],
  selector: 'rnd-combobox',
  styleUrl: './rnd-combobox.css',
  templateUrl: './rnd-combobox.html',
})
export class RndCombobox {
  options = input<RndComboboxOption[]>([]);
  placeholder = input('Search...');
  value = model('');

  protected query = signal('');
  protected highlightedIndex = signal(0);

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

  protected onFocus(): void {
    this.query.set('');
    this.highlightedIndex.set(0);

    const panelEl = this.panel().nativeElement;
    const triggerRect = this.trigger().nativeElement.getBoundingClientRect();
    panelEl.style.left = `${triggerRect.left}px`;
    panelEl.style.top = `${triggerRect.bottom + 4}px`;
    panelEl.style.width = `${triggerRect.width}px`;

    // A focus-triggered showPopover() call races the browser's light-dismiss check for the
    // same click gesture and gets immediately auto-closed; deferring to the next task avoids it.
    setTimeout(() => panelEl.showPopover());
  }

  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.highlightedIndex.set(0);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const options = this.filteredOptions();

    if (options.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.highlightedIndex.set((this.highlightedIndex() + 1) % options.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.highlightedIndex.set((this.highlightedIndex() - 1 + options.length) % options.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.chooseOption(options[this.highlightedIndex()]);
    }
  }

  protected chooseOption(option: RndComboboxOption): void {
    this.value.set(option.value);
    this.query.set('');
    this.panel().nativeElement.hidePopover();
  }
}
