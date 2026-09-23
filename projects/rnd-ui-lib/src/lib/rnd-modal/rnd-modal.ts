import { Component, ElementRef, effect, input, model, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-modal',
  styleUrl: './rnd-modal.css',
  templateUrl: './rnd-modal.html',
})
export class RndModal {
  open = model(false);
  closeOnBackdropClick = input(true);

  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const dialogEl = this.dialog().nativeElement;

      if (this.open()) {
        if (!dialogEl.open) {
          dialogEl.showModal();
        }
      } else if (dialogEl.open) {
        dialogEl.close();
      }
    });
  }

  protected onDialogClose(): void {
    this.open.set(false);
  }

  protected onDialogClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick() && event.target === this.dialog().nativeElement) {
      this.open.set(false);
    }
  }
}
