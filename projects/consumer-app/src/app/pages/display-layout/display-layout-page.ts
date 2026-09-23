import { Component } from '@angular/core';
import {
  RndAccordion,
  RndAccordionItem,
  RndAvatar,
  RndAvatarGroup,
  RndBadge,
  RndButton,
  RndCard,
  RndCarousel,
  RndCarouselSlide,
  RndCollapsible,
  RndDivider,
  RndKbd,
  RndTable,
} from 'rnd-ui-lib';

interface Transaction {
  hash: string;
  amount: string;
  status: string;
}

@Component({
  imports: [
    RndAvatar,
    RndAvatarGroup,
    RndBadge,
    RndCard,
    RndButton,
    RndCarousel,
    RndCarouselSlide,
    RndDivider,
    RndKbd,
    RndAccordion,
    RndAccordionItem,
    RndCollapsible,
    RndTable,
  ],
  selector: 'app-display-layout-page',
  styleUrl: './display-layout-page.css',
  templateUrl: './display-layout-page.html',
})
export class DisplayLayoutPage {
  protected transactions: Transaction[] = [
    { hash: 'bc1q...4k2', amount: '0.05 BTC', status: 'Confirmed' },
    { hash: 'bc1q...9f7', amount: '0.12 BTC', status: 'Pending' },
    { hash: 'bc1q...a31', amount: '0.03 BTC', status: 'Confirmed' },
  ];
}
