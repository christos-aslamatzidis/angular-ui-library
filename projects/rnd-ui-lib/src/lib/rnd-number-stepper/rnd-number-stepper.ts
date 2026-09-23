import { Component, computed, input, model } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

@Component({
  imports: [RndIcon],
  selector: 'rnd-number-stepper',
  styleUrl: './rnd-number-stepper.css',
  templateUrl: './rnd-number-stepper.html',
})
export class RndNumberStepper {
  value = model(0);
  min = input(-Infinity);
  max = input(Infinity);
  step = input(1);
  disabled = input(false);

  protected canDecrement = computed(
    () => !this.disabled() && this.value() - this.step() >= this.min(),
  );
  protected canIncrement = computed(
    () => !this.disabled() && this.value() + this.step() <= this.max(),
  );

  protected decrement(): void {
    if (this.canDecrement()) {
      this.value.set(this.value() - this.step());
    }
  }

  protected increment(): void {
    if (this.canIncrement()) {
      this.value.set(this.value() + this.step());
    }
  }

  protected onInput(event: Event): void {
    const raw = Number((event.target as HTMLInputElement).value);

    if (!Number.isNaN(raw)) {
      this.value.set(Math.min(this.max(), Math.max(this.min(), raw)));
    }
  }
}
