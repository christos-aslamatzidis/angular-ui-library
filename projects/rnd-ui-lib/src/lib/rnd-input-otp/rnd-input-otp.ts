import { Component, ElementRef, computed, input, model, viewChildren } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-input-otp',
  styleUrl: './rnd-input-otp.css',
  templateUrl: './rnd-input-otp.html',
})
export class RndInputOtp {
  length = input(6);
  value = model('');

  protected cells = computed(() => Array.from({ length: this.length() }, (_, i) => i));
  protected digits = computed(() => {
    const value = this.value();
    return this.cells().map((i) => value[i] ?? '');
  });

  private inputs = viewChildren<ElementRef<HTMLInputElement>>('cellInput');

  protected onInput(event: Event, index: number): void {
    const inputEl = event.target as HTMLInputElement;
    const digit = inputEl.value.slice(-1).replace(/[^0-9]/g, '');
    const chars = this.digits().slice();
    chars[index] = digit;
    this.value.set(chars.join(''));

    if (digit && index < this.length() - 1) {
      this.inputs()[index + 1]?.nativeElement.focus();
    }
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.digits()[index] && index > 0) {
      this.inputs()[index - 1]?.nativeElement.focus();
    }
  }
}
