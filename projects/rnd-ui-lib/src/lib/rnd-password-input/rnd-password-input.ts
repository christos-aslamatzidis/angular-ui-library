import { Component, computed, input, model, signal } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

const BASE_CLASSES =
  'flex h-12 items-center gap-2 border-b-2 bg-black/50 px-4 transition-all duration-200 focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]';

@Component({
  imports: [RndIcon],
  selector: 'rnd-password-input',
  styleUrl: './rnd-password-input.css',
  templateUrl: './rnd-password-input.html',
})
export class RndPasswordInput {
  value = model('');
  placeholder = input('');
  disabled = input(false);
  invalid = input(false);

  protected visible = signal(false);

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

  protected toggleVisibility(): void {
    this.visible.set(!this.visible());
  }
}
