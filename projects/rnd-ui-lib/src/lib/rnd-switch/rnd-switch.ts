import { Component, computed, input, model } from '@angular/core';

const BASE_CLASSES =
  'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

@Component({
  imports: [],
  selector: 'rnd-switch',
  styleUrl: './rnd-switch.css',
  templateUrl: './rnd-switch.html',
})
export class RndSwitch {
  checked = model(false);
  disabled = input(false);
  ariaLabel = input<string>();

  protected trackClasses = computed(() => {
    const classes = [
      BASE_CLASSES,
      this.checked() ? 'bg-gradient-to-r from-secondary to-primary' : 'bg-white/20',
    ];

    if (this.disabled()) {
      classes.push('cursor-not-allowed opacity-50');
    }

    return classes.join(' ');
  });

  protected thumbClasses = computed(() =>
    this.checked() ? 'translate-x-5 bg-white' : 'translate-x-0.5 bg-white',
  );

  protected toggle(): void {
    if (this.disabled()) {
      return;
    }

    this.checked.set(!this.checked());
  }
}
