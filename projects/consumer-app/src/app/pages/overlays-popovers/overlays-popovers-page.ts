import { Component, inject, signal } from '@angular/core';
import {
  RndAvatar,
  RndButton,
  RndCombobox,
  RndComboboxOption,
  RndCommandItem,
  RndCommandPalette,
  RndConfirmService,
  RndContextMenu,
  RndDatePicker,
  RndDropdownItem,
  RndDropdownMenu,
  RndHoverCard,
  RndKbd,
  RndModal,
  RndPopover,
  RndSheet,
  RndToastService,
  RndTooltip,
} from 'rnd-ui-lib';

@Component({
  imports: [
    RndButton,
    RndModal,
    RndSheet,
    RndCommandPalette,
    RndKbd,
    RndContextMenu,
    RndDropdownItem,
    RndDropdownMenu,
    RndHoverCard,
    RndAvatar,
    RndTooltip,
    RndPopover,
    RndCombobox,
    RndDatePicker,
  ],
  selector: 'app-overlays-popovers-page',
  styleUrl: './overlays-popovers-page.css',
  templateUrl: './overlays-popovers-page.html',
})
export class OverlaysPopoversPage {
  private confirmService = inject(RndConfirmService);
  private toastService = inject(RndToastService);

  protected modalOpen = signal(false);
  protected sheetOpen = signal(false);

  protected commandPaletteOpen = signal(false);
  protected commandPaletteLastSelected = signal<string | null>(null);
  protected commandPaletteItems: RndCommandItem[] = [
    { id: 'send', label: 'Send BTC', description: 'Send Bitcoin to an address' },
    { id: 'receive', label: 'Receive BTC', description: 'Show your receive address' },
    { id: 'swap', label: 'Swap assets', description: 'Exchange one asset for another' },
    { id: 'settings', label: 'Settings', description: 'Manage wallet preferences' },
  ];

  protected confirmResult = signal<string | null>(null);

  protected comboboxOptions: RndComboboxOption[] = [
    { label: 'Bitcoin', value: 'btc' },
    { label: 'Ethereum', value: 'eth' },
    { label: 'Solana', value: 'sol' },
    { label: 'Litecoin', value: 'ltc' },
    { label: 'Polkadot', value: 'dot' },
    { label: 'Cardano', value: 'ada' },
  ];

  protected onCommandSelect(id: string): void {
    this.commandPaletteLastSelected.set(id);
  }

  protected async askConfirm(): Promise<void> {
    const confirmed = await this.confirmService.confirm({
      title: 'Send 0.05 BTC?',
      message: 'This action cannot be undone once broadcast to the network.',
      confirmLabel: 'Send',
      cancelLabel: 'Cancel',
    });

    this.confirmResult.set(confirmed ? 'Confirmed' : 'Cancelled');
  }

  protected showInfo(): void {
    this.toastService.show('Broadcasting transaction...', 'info');
  }

  protected showSuccess(): void {
    this.toastService.show('Transaction confirmed.', 'success');
  }

  protected showWarning(): void {
    this.toastService.show('Fee is higher than usual.', 'warning');
  }

  protected showError(): void {
    this.toastService.show('Failed to broadcast transaction.', 'error');
  }
}
