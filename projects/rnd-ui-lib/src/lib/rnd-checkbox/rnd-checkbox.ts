import { Component, computed, input, model } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

const BASE_CLASSES =
  'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background';

@Component({
  imports: [RndIcon],
  selector: 'rnd-checkbox',
  styleUrl: './rnd-checkbox.css',
  templateUrl: './rnd-checkbox.html',
})
export class RndCheckbox {
  checked = model(false);
  indeterminate = input(false);
  disabled = input(false);
  label = input<string>();

  protected boxClasses = computed(() => {
    const classes = [BASE_CLASSES];

    classes.push(
      this.checked() || this.indeterminate()
        ? 'border-primary bg-primary'
        : 'border-white/20 bg-black/50',
    );

    if (this.disabled()) {
      classes.push('cursor-not-allowed opacity-50');
    }

    return classes.join(' ');
  });

  protected onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
