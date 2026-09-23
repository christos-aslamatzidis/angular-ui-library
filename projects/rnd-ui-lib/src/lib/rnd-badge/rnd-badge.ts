import { Component, computed, input, output } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

export type RndBadgeVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'outline'
  | 'muted'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
export type RndBadgeSize = 'sm' | 'md';

const BASE_CLASSES =
  'inline-flex items-center gap-1.5 rounded-full font-mono font-medium uppercase tracking-wide transition-all duration-300 whitespace-nowrap';

const VARIANT_CLASSES: Record<RndBadgeVariant, string> = {
  primary: 'bg-primary/15 text-primary border border-primary/30',
  secondary: 'bg-secondary/15 text-secondary border border-secondary/30',
  accent: 'bg-accent/15 text-accent border border-accent/30',
  outline: 'bg-transparent text-foreground border border-white/20',
  muted: 'bg-white/5 text-muted border border-white/10',
  success: 'bg-success/15 text-success border border-success/30',
  warning: 'bg-warning/15 text-warning border border-warning/30',
  error: 'bg-error/15 text-error border border-error/30',
  info: 'bg-info/15 text-info border border-info/30',
};

const SIZE_CLASSES: Record<RndBadgeSize, string> = {
  sm: 'h-5 px-2 text-[10px]',
  md: 'h-6 px-2.5 text-xs',
};

const DOT_COLOR_CLASSES: Record<RndBadgeVariant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  outline: 'bg-white',
  muted: 'bg-muted',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
};

@Component({
  imports: [RndIcon],
  selector: 'rnd-badge',
  styleUrl: './rnd-badge.css',
  templateUrl: './rnd-badge.html',
})
export class RndBadge {
  variant = input<RndBadgeVariant>('primary');
  size = input<RndBadgeSize>('md');
  dot = input(false);
  removable = input(false);

  remove = output<void>();

  protected classes = computed(() =>
    [BASE_CLASSES, VARIANT_CLASSES[this.variant()], SIZE_CLASSES[this.size()]].join(' '),
  );

  protected dotClasses = computed(() => DOT_COLOR_CLASSES[this.variant()]);

  protected onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.remove.emit();
  }
}
