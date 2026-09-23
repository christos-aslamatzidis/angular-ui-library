import { Component, computed, input, model } from '@angular/core';

export type RndInputType = 'text' | 'email' | 'password' | 'number';

const BASE_CLASSES =
  'flex h-12 items-center gap-2 border-b-2 bg-black/50 px-4 transition-all duration-200 focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]';

@Component({
  imports: [],
  selector: 'rnd-input',
  styleUrl: './rnd-input.css',
  templateUrl: './rnd-input.html',
})
export class RndInput {
  value = model('');
  type = input<RndInputType>('text');
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

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
