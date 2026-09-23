import { Component } from '@angular/core';

interface FontWeight {
  weight: number;
  class: string;
}

interface TypeScaleStep {
  class: string;
  label: string;
}

@Component({
  imports: [],
  selector: 'app-typography-page',
  styleUrl: './typography-page.css',
  templateUrl: './typography-page.html',
})
export class TypographyPage {
  protected readonly headingWeights: FontWeight[] = [
    { weight: 400, class: 'font-normal' },
    { weight: 500, class: 'font-medium' },
    { weight: 600, class: 'font-semibold' },
    { weight: 700, class: 'font-bold' },
  ];

  protected readonly bodyWeights: FontWeight[] = [
    { weight: 400, class: 'font-normal' },
    { weight: 500, class: 'font-medium' },
    { weight: 600, class: 'font-semibold' },
  ];

  protected readonly monoWeights: FontWeight[] = [
    { weight: 400, class: 'font-normal' },
    { weight: 500, class: 'font-medium' },
  ];

  protected readonly headingScale: TypeScaleStep[] = [
    { class: 'text-4xl', label: 'text-4xl' },
    { class: 'text-3xl', label: 'text-3xl' },
    { class: 'text-2xl', label: 'text-2xl' },
    { class: 'text-xl', label: 'text-xl' },
    { class: 'text-lg', label: 'text-lg' },
    { class: 'text-sm', label: 'text-sm' },
  ];

  protected readonly bodyScale: TypeScaleStep[] = [
    { class: 'text-lg', label: 'text-lg' },
    { class: 'text-base', label: 'text-base' },
    { class: 'text-sm', label: 'text-sm' },
  ];
}
