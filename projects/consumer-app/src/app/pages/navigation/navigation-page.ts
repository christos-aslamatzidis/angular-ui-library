import { Component } from '@angular/core';
import { RndBreadcrumb, RndBreadcrumbItem, RndPagination, RndTab, RndTabs } from 'rnd-ui-lib';

@Component({
  imports: [RndBreadcrumb, RndPagination, RndTabs, RndTab],
  selector: 'app-navigation-page',
  styleUrl: './navigation-page.css',
  templateUrl: './navigation-page.html',
})
export class NavigationPage {
  protected breadcrumbItems: RndBreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Wallets', href: '/wallets' },
    { label: 'Lightning' },
  ];
}
