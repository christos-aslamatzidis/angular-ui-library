import {
  Component,
  ElementRef,
  PLATFORM_ID,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import QRCode from 'qrcode';

@Component({
  imports: [],
  selector: 'rnd-qr-code',
  styleUrl: './rnd-qr-code.css',
  templateUrl: './rnd-qr-code.html',
})
export class RndQrCode {
  value = input.required<string>();
  size = input(200);

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    effect(() => {
      // The `canvas` 2D context isn't implemented in Angular's server-side rendering DOM —
      // skip entirely during SSR/prerender and let the client-side hydration pass draw it.
      if (!this.isBrowser) {
        return;
      }

      const canvasEl = this.canvas().nativeElement;
      const value = this.value();
      const size = this.size();

      QRCode.toCanvas(canvasEl, value, {
        width: size,
        margin: 1,
        color: {
          dark: '#030304',
          light: '#ffffff',
        },
      }).catch(() => {
        // Invalid input (e.g. empty string) — leave the canvas blank rather than throwing.
      });
    });
  }
}
