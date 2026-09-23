import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  {
    path: 'components/icon',
    loadComponent: () => import('./pages/icon/icon-page').then((m) => m.IconPage),
  },
  {
    path: 'components/typography',
    loadComponent: () => import('./pages/typography/typography-page').then((m) => m.TypographyPage),
  },
  {
    path: 'components/buttons-triggers',
    loadComponent: () =>
      import('./pages/buttons-triggers/buttons-triggers-page').then((m) => m.ButtonsTriggersPage),
  },
  {
    path: 'components/overlays-popovers',
    loadComponent: () =>
      import('./pages/overlays-popovers/overlays-popovers-page').then(
        (m) => m.OverlaysPopoversPage,
      ),
  },
  {
    path: 'components/form-inputs',
    loadComponent: () =>
      import('./pages/form-inputs/form-inputs-page').then((m) => m.FormInputsPage),
  },
  {
    path: 'components/feedback-status',
    loadComponent: () =>
      import('./pages/feedback-status/feedback-status-page').then((m) => m.FeedbackStatusPage),
  },
  {
    path: 'components/display-layout',
    loadComponent: () =>
      import('./pages/display-layout/display-layout-page').then((m) => m.DisplayLayoutPage),
  },
  {
    path: 'components/navigation',
    loadComponent: () => import('./pages/navigation/navigation-page').then((m) => m.NavigationPage),
  },
  {
    path: 'components/wallet',
    loadComponent: () => import('./pages/wallet/wallet-page').then((m) => m.WalletPage),
  },
  {
    path: 'components/route-progress',
    loadComponent: () =>
      import('./pages/route-progress/route-progress-page').then((m) => m.RouteProgressPage),
  },
];
