import { Component, computed, input } from '@angular/core';

export type RndButtonVariant = 'primary' | 'outline' | 'ghost' | 'link';
export type RndButtonSize = 'sm' | 'md' | 'lg';

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

const VARIANT_CLASSES: Record<RndButtonVariant, string> = {
  primary:
    'text-white bg-gradient-to-r from-secondary to-primary shadow-[0_0_20px_-5px_rgba(234,88,12,0.5)] hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(247,147,26,0.6)]',
  outline:
    'bg-transparent border-2 border-white/20 text-white hover:border-white hover:bg-white/10',
  ghost: 'bg-transparent text-white hover:bg-white/10 hover:text-primary',
  link: 'bg-transparent text-primary hover:underline',
};

const SIZE_CLASSES: Record<RndButtonSize, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

const ICON_ONLY_SIZE_CLASSES: Record<RndButtonSize, string> = {
  sm: 'h-9 w-9 px-0',
  md: 'h-11 w-11 px-0',
  lg: 'h-14 w-14 px-0',
};

@Component({
  imports: [],
  selector: 'rnd-button',
  styleUrl: './rnd-button.css',
  templateUrl: './rnd-button.html',
})
export class RndButton {
  variant = input<RndButtonVariant>('primary');
  size = input<RndButtonSize>('md');
  iconOnly = input(false);
  disabled = input(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  ariaLabel = input<string>();

  protected classes = computed(() => {
    const variant = this.variant();

    if (variant === 'link') {
      return [BASE_CLASSES, VARIANT_CLASSES.link].join(' ');
    }

    const sizeClasses = this.iconOnly()
      ? ICON_ONLY_SIZE_CLASSES[this.size()]
      : SIZE_CLASSES[this.size()];

    return [BASE_CLASSES, VARIANT_CLASSES[variant], sizeClasses].join(' ');
  });
}
