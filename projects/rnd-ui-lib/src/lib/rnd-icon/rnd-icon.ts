import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RND_ICON_PATHS, RndIconName } from './rnd-icon-registry';

export type RndIconWeight = 'outline' | 'solid' | 'duotone';
export type RndIconVariant =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'foreground'
  | 'muted'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

const VARIANT_CLASSES: Record<RndIconVariant, string> = {
  inherit: '',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  foreground: 'text-foreground',
  muted: 'text-muted',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
};

@Component({
  imports: [],
  selector: 'rnd-icon',
  styleUrl: './rnd-icon.css',
  templateUrl: './rnd-icon.html',
})
export class RndIcon {
  private sanitizer = inject(DomSanitizer);

  name = input.required<RndIconName>();
  weight = input<RndIconWeight>('outline');
  variant = input<RndIconVariant>('inherit');
  size = input(20);

  protected classes = computed(() =>
    ['inline-block shrink-0', VARIANT_CLASSES[this.variant()]].join(' ').trim(),
  );

  protected markup = computed<SafeHtml>(() => {
    const entry = RND_ICON_PATHS[this.name()];
    const size = this.size();
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${entry[this.weight()]}</svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  });
}
