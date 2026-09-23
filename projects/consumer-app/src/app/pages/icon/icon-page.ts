import { Component } from '@angular/core';
import { RND_ICON_PATHS, RndIcon, RndIconName, RndIconVariant, RndIconWeight } from 'rnd-ui-lib';

@Component({
  imports: [RndIcon],
  selector: 'app-icon-page',
  styleUrl: './icon-page.css',
  templateUrl: './icon-page.html',
})
export class IconPage {
  protected iconNames = Object.keys(RND_ICON_PATHS) as RndIconName[];
  protected weights: RndIconWeight[] = ['outline', 'solid', 'duotone'];
  protected variants: RndIconVariant[] = [
    'inherit',
    'primary',
    'secondary',
    'accent',
    'success',
    'warning',
    'error',
    'info',
    'muted',
  ];
}
