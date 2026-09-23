import { Component } from '@angular/core';
import { RndAssetRow, RndQrCode, RndTransactionItem } from 'rnd-ui-lib';

@Component({
  imports: [RndAssetRow, RndQrCode, RndTransactionItem],
  selector: 'app-wallet-page',
  styleUrl: './wallet-page.css',
  templateUrl: './wallet-page.html',
})
export class WalletPage {}
