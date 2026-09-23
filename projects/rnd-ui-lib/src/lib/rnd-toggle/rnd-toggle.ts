import { Component, computed, input, model } from '@angular/core';

const BASE_CLASSES =
  'inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50';

@Component({
  imports: [],
  selector: 'rnd-toggle',
  styleUrl: './rnd-toggle.css',
  templateUrl: './rnd-toggle.html',
})
export class RndToggle {
  pressed = model(false);
  disabled = input(false);
  ariaLabel = input<string>();

  protected classes = computed(() =>
    this.pressed()
      ? `${BASE_CLASSES} border-primary bg-primary/15 text-primary`
      : `${BASE_CLASSES} border-white/20 bg-transparent text-muted hover:bg-white/5 hover:text-foreground`,
  );

  protected toggle(): void {
    if (!this.disabled()) {
      this.pressed.set(!this.pressed());
    }
  }
}
