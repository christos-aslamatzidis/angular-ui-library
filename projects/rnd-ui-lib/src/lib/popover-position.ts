export interface PopoverPositionOptions {
  offset?: number;
  matchWidth?: boolean;
}

export function positionPopoverPanel(
  panelEl: HTMLElement,
  anchorRect: DOMRect,
  { offset = 4, matchWidth = false }: PopoverPositionOptions = {},
): void {
  panelEl.style.left = `${anchorRect.left}px`;
  panelEl.style.top = `${anchorRect.bottom + offset}px`;

  if (matchWidth) {
    panelEl.style.width = `${anchorRect.width}px`;
  }
}
