import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  RndConfirmOutlet,
  RndNavbar,
  RndRouteProgress,
  RndSidebar,
  RndToastOutlet,
} from 'rnd-ui-lib';

interface NavItem {
  label: string;
  path: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    RndNavbar,
    RndSidebar,
    RndToastOutlet,
    RndConfirmOutlet,
    RndRouteProgress,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('consumer-app');

  protected readonly navGroups: NavGroup[] = [
    {
      title: 'Foundations',
      items: [
        { label: 'Icon', path: '/components/icon' },
        { label: 'Typography', path: '/components/typography' },
      ],
    },
    {
      title: 'Buttons & Triggers',
      items: [{ label: 'Buttons & Triggers', path: '/components/buttons-triggers' }],
    },
    {
      title: 'Overlays & Popovers',
      items: [{ label: 'Overlays & Popovers', path: '/components/overlays-popovers' }],
    },
    {
      title: 'Form Inputs',
      items: [{ label: 'Form Inputs', path: '/components/form-inputs' }],
    },
    {
      title: 'Feedback & Status',
      items: [
        { label: 'Feedback & Status', path: '/components/feedback-status' },
        { label: 'Route Progress', path: '/components/route-progress' },
      ],
    },
    {
      title: 'Display & Layout',
      items: [{ label: 'Display & Layout', path: '/components/display-layout' }],
    },
    {
      title: 'Navigation',
      items: [{ label: 'Navigation', path: '/components/navigation' }],
    },
    {
      title: 'Wallet',
      items: [{ label: 'Wallet', path: '/components/wallet' }],
    },
  ];
}
