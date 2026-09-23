import { Component, computed, input, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-slider',
  styleUrl: './rnd-slider.css',
  templateUrl: './rnd-slider.html',
})
export class RndSlider {
  value = model(50);
  min = input(0);
  max = input(100);
  step = input(1);

  protected fillPercent = computed(() => {
    const min = this.min();
    const max = this.max();

    if (max === min) {
      return 0;
    }

    return ((this.value() - min) / (max - min)) * 100;
  });

  protected trackStyle = computed(
    () =>
      `background: linear-gradient(to right, var(--color-secondary) 0%, var(--color-primary) ${this.fillPercent()}%, rgba(255,255,255,0.1) ${this.fillPercent()}%)`,
  );

  protected onInput(event: Event): void {
    this.value.set(Number((event.target as HTMLInputElement).value));
  }
}
