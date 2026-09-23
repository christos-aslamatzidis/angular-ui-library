import { Component, computed, input, model } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

export interface RndSelectOption {
  label: string;
  value: string;
}

const BASE_CLASSES =
  'relative flex h-12 items-center border-b-2 bg-black/50 px-4 transition-all duration-200 focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]';

@Component({
  imports: [RndIcon],
  selector: 'rnd-select',
  styleUrl: './rnd-select.css',
  templateUrl: './rnd-select.html',
})
export class RndSelect {
  options = input<RndSelectOption[]>([]);
  value = model('');
  placeholder = input('');
  disabled = input(false);
  invalid = input(false);

  protected containerClasses = computed(() => {
    const classes = [BASE_CLASSES];

    classes.push(
      this.invalid()
        ? 'border-error focus-within:border-error'
        : 'border-white/20 focus-within:border-primary',
    );

    if (this.disabled()) {
      classes.push('cursor-not-allowed opacity-50');
    }

    return classes.join(' ');
  });

  protected onChange(event: Event): void {
    this.value.set((event.target as HTMLSelectElement).value);
  }
}
