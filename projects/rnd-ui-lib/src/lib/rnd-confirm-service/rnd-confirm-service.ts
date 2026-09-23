import { Injectable, signal } from '@angular/core';

export interface RndConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
}

export interface RndConfirmRequest extends RndConfirmOptions {
  resolve: (confirmed: boolean) => void;
}

@Injectable({ providedIn: 'root' })
export class RndConfirmService {
  private readonly request = signal<RndConfirmRequest | null>(null);

  readonly current = this.request.asReadonly();

  confirm(options: RndConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      this.request.set({ ...options, resolve });
    });
  }

  respond(confirmed: boolean): void {
    this.request()?.resolve(confirmed);
    this.request.set(null);
  }
}
