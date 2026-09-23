import { Component, computed, inject, input } from '@angular/core';
import { RndRadioGroup } from '../rnd-radio-group/rnd-radio-group';

const BASE_CLASSES =
  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background';

@Component({
  imports: [],
  selector: 'rnd-radio-option',
  styleUrl: './rnd-radio-option.css',
  templateUrl: './rnd-radio-option.html',
})
export class RndRadioOption {
  value = input.required<string>();
  label = input<string>();

  protected group = inject(RndRadioGroup);

  protected checked = computed(() => this.group.value() === this.value());

  protected boxClasses = computed(() =>
    [BASE_CLASSES, this.checked() ? 'border-primary' : 'border-white/20 bg-black/50'].join(' '),
  );

  protected onChange(): void {
    this.group.value.set(this.value());
  }
}
