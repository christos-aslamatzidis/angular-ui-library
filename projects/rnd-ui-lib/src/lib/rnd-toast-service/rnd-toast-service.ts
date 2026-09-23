import { Injectable, signal } from '@angular/core';
import { RndToastVariant } from '../rnd-toast/rnd-toast';

export interface RndToastEntry {
  id: number;
  message: string;
  variant: RndToastVariant;
}

let nextToastId = 0;

@Injectable({ providedIn: 'root' })
export class RndToastService {
  private readonly toasts = signal<RndToastEntry[]>([]);

  readonly entries = this.toasts.asReadonly();

  show(message: string, variant: RndToastVariant = 'info', duration = 4000): number {
    const id = ++nextToastId;
    this.toasts.update((current) => [...current, { id, message, variant }]);

    setTimeout(() => this.dismiss(id), duration);

    return id;
  }

  dismiss(id: number): void {
    this.toasts.update((current) => current.filter((toast) => toast.id !== id));
  }
}
