import { Component, computed, input, model } from '@angular/core';

const BASE_CLASSES =
  'flex items-start gap-2 border-b-2 bg-black/50 px-4 py-3 transition-all duration-200 focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]';

@Component({
  imports: [],
  selector: 'rnd-textarea',
  styleUrl: './rnd-textarea.css',
  templateUrl: './rnd-textarea.html',
})
export class RndTextarea {
  value = model('');
  placeholder = input('');
  disabled = input(false);
  invalid = input(false);
  rows = input(3);

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
    this.value.set((event.target as HTMLTextAreaElement).value);
  }
}
