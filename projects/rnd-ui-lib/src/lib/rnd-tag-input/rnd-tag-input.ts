import { Component, input, model, signal } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

@Component({
  imports: [RndIcon],
  selector: 'rnd-tag-input',
  styleUrl: './rnd-tag-input.css',
  templateUrl: './rnd-tag-input.html',
})
export class RndTagInput {
  tags = model<string[]>([]);
  placeholder = input('Add a tag...');

  protected draft = signal('');

  protected onInput(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag();
    } else if (event.key === 'Backspace' && !this.draft() && this.tags().length > 0) {
      this.removeTag(this.tags().length - 1);
    }
  }

  protected removeTag(index: number): void {
    this.tags.set(this.tags().filter((_, i) => i !== index));
  }

  private addTag(): void {
    const value = this.draft().trim();

    if (value && !this.tags().includes(value)) {
      this.tags.set([...this.tags(), value]);
    }

    this.draft.set('');
  }
}
