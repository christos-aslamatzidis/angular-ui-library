import { Component, computed, input, signal } from '@angular/core';

export type RndAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RndAvatarStatus = 'online' | 'offline' | 'away';

const BASE_CLASSES =
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface font-heading font-medium text-foreground';

const SIZE_CLASSES: Record<RndAvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

const STATUS_DOT_SIZE_CLASSES: Record<RndAvatarSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
};

const STATUS_COLOR_CLASSES: Record<RndAvatarStatus, string> = {
  online: 'bg-success',
  offline: 'bg-muted',
  away: 'bg-warning',
};

@Component({
  imports: [],
  selector: 'rnd-avatar',
  styleUrl: './rnd-avatar.css',
  templateUrl: './rnd-avatar.html',
})
export class RndAvatar {
  src = input<string>();
  initials = input<string>();
  size = input<RndAvatarSize>('md');
  status = input<RndAvatarStatus>();

  protected imageFailed = signal(false);

  protected classes = computed(() => [BASE_CLASSES, SIZE_CLASSES[this.size()]].join(' '));

  protected statusClasses = computed(() => {
    const status = this.status();

    if (!status) {
      return '';
    }

    return [
      'absolute right-0 bottom-0 rounded-full border-2 border-background',
      STATUS_DOT_SIZE_CLASSES[this.size()],
      STATUS_COLOR_CLASSES[status],
    ].join(' ');
  });

  protected onImageError(): void {
    this.imageFailed.set(true);
  }
}
