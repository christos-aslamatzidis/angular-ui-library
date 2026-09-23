import { Component, ElementRef, computed, effect, input, model, viewChild } from '@angular/core';

export type RndSheetSide = 'left' | 'right';

const SIDE_CLASSES: Record<RndSheetSide, string> = {
  left: 'inset-y-0 left-0 mr-auto border-r border-border',
  right: 'inset-y-0 right-0 ml-auto border-l border-border',
};

@Component({
  imports: [],
  selector: 'rnd-sheet',
  styleUrl: './rnd-sheet.css',
  templateUrl: './rnd-sheet.html',
})
export class RndSheet {
  open = model(false);
  side = input<RndSheetSide>('right');
  closeOnBackdropClick = input(true);

  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected dialogClasses = computed(
    () =>
      `fixed m-0 h-full max-h-none w-full max-w-sm bg-[#0f1115]/95 p-0 text-foreground backdrop-blur-lg backdrop:bg-black/60 ${SIDE_CLASSES[this.side()]}`,
  );

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
