import { Component, computed, input, signal } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

@Component({
  imports: [RndIcon],
  selector: 'rnd-copy-field',
  styleUrl: './rnd-copy-field.css',
  templateUrl: './rnd-copy-field.html',
})
export class RndCopyField {
  value = input.required<string>();
  truncate = input(false);

  protected copied = signal(false);

  protected displayValue = computed(() => {
    const value = this.value();

    if (!this.truncate() || value.length <= 14) {
      return value;
    }

    return `${value.slice(0, 8)}...${value.slice(-4)}`;
  });

  protected async onCopy(): Promise<void> {
    await navigator.clipboard.writeText(this.value());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
