import { Component, ElementRef, computed, input, model, viewChild } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';
import { positionPopoverPanel } from '../popover-position';

export interface RndSelectOption {
  label: string;
  value: string;
}

let nextSelectId = 0;

const BASE_CLASSES =
  'flex h-12 w-full items-center justify-between border-b-2 bg-black/50 px-4 text-left text-sm text-white transition-all duration-200 focus:outline-none focus-within:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]';

@Component({
  imports: [RndIcon],
  selector: 'rnd-select',
  styleUrl: './rnd-select.css',
  templateUrl: './rnd-select.html',
  host: {
    '(window:scroll)': 'onReposition()',
    '(window:resize)': 'onReposition()',
  },
})
export class RndSelect {
  options = input<RndSelectOption[]>([]);
  value = model('');
  placeholder = input('');
  disabled = input(false);
  invalid = input(false);

  protected panelId = `rnd-select-${++nextSelectId}`;

  private trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private panel = viewChild.required<ElementRef<HTMLDivElement>>('panel');

  protected selectedLabel = computed(
    () => this.options().find((option) => option.value === this.value())?.label ?? '',
  );

  protected containerClasses = computed(() => {
    const classes = [BASE_CLASSES];

    classes.push(
      this.invalid()
        ? 'border-error focus-within:border-error'
        : 'border-white/20 focus-within:border-primary',
    );

    if (this.disabled()) {
      classes.push('cursor-not-allowed opacity-50');
    }

    return classes.join(' ');
  });

  protected onToggle(event: Event): void {
    const newState = (event as Event & { newState?: string }).newState;

    if (newState !== 'open') {
      return;
    }

    this.reposition();
  }

  protected onReposition(): void {
    if (this.panel().nativeElement.matches(':popover-open')) {
      this.reposition();
    }
  }

  protected chooseOption(option: RndSelectOption): void {
    this.value.set(option.value);
    this.panel().nativeElement.hidePopover();
  }

  private reposition(): void {
    positionPopoverPanel(
      this.panel().nativeElement,
      this.trigger().nativeElement.getBoundingClientRect(),
      { matchWidth: true },
    );
  }
}
