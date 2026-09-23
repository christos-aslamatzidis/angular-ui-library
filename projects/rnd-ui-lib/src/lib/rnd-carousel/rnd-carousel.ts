import {
  Component,
  DestroyRef,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';
import { RndCarouselSlide } from '../rnd-carousel-slide/rnd-carousel-slide';

@Component({
  imports: [RndIcon],
  selector: 'rnd-carousel',
  styleUrl: './rnd-carousel.css',
  templateUrl: './rnd-carousel.html',
})
export class RndCarousel {
  activeIndex = model(0);
  loop = input(false);
  interval = input(0);

  protected slides = contentChildren(RndCarouselSlide);
  protected isPaused = signal(false);

  private destroyRef = inject(DestroyRef);
  private timerId: ReturnType<typeof setInterval> | null = null;

  protected canGoPrevious = computed(() => this.loop() || this.activeIndex() > 0);
  protected canGoNext = computed(() => this.loop() || this.activeIndex() < this.slides().length - 1);
  protected trackTransform = computed(() => `translateX(-${this.activeIndex() * 100}%)`);

  constructor() {
    effect(() => {
      const ms = this.interval();
      const paused = this.isPaused();

      this.clearAutoplay();

      if (ms > 0 && !paused) {
        this.timerId = setInterval(() => this.advanceAutoplay(), ms);
      }
    });

    this.destroyRef.onDestroy(() => this.clearAutoplay());
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    }
  }

  protected goTo(index: number): void {
    const count = this.slides().length;

    if (count === 0) {
      return;
    }

    this.activeIndex.set(((index % count) + count) % count);
  }

  protected previous(): void {
    if (this.activeIndex() > 0) {
      this.activeIndex.update((index) => index - 1);
    } else if (this.loop()) {
      this.goTo(this.slides().length - 1);
    }
  }

  protected next(): void {
    if (this.activeIndex() < this.slides().length - 1) {
      this.activeIndex.update((index) => index + 1);
    } else if (this.loop()) {
      this.goTo(0);
    }
  }

  private advanceAutoplay(): void {
    const count = this.slides().length;

    if (count === 0) {
      return;
    }

    this.goTo(this.activeIndex() + 1);
  }

  private clearAutoplay(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
