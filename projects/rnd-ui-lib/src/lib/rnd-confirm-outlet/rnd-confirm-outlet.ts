import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { RndButton } from '../rnd-button/rnd-button';
import { RndConfirmService } from '../rnd-confirm-service/rnd-confirm-service';

@Component({
  imports: [RndButton],
  selector: 'rnd-confirm-outlet',
  styleUrl: './rnd-confirm-outlet.css',
  templateUrl: './rnd-confirm-outlet.html',
})
export class RndConfirmOutlet {
  protected confirmService = inject(RndConfirmService);

  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const request = this.confirmService.current();
      const dialogEl = this.dialog().nativeElement;

      if (request) {
        if (!dialogEl.open) {
          dialogEl.showModal();
        }
      } else if (dialogEl.open) {
        dialogEl.close();
      }
    });
  }

  protected respond(confirmed: boolean): void {
    this.confirmService.respond(confirmed);
  }
}
