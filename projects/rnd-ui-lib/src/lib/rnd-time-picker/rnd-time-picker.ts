import { Component, computed, model } from '@angular/core';
import { RndNumberStepper } from '../rnd-number-stepper/rnd-number-stepper';
import { RndSegmentedControl } from '../rnd-segmented-control/rnd-segmented-control';
import { RndSegmentedOption } from '../rnd-segmented-option/rnd-segmented-option';

export interface RndTimeValue {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
}

const DEFAULT_TIME: RndTimeValue = { hour: 12, minute: 0, period: 'AM' };

@Component({
  imports: [RndNumberStepper, RndSegmentedControl, RndSegmentedOption],
  selector: 'rnd-time-picker',
  styleUrl: './rnd-time-picker.css',
  templateUrl: './rnd-time-picker.html',
})
export class RndTimePicker {
  selected = model<RndTimeValue | null>(null);

  protected draftHour = computed(() => (this.selected() ?? DEFAULT_TIME).hour);
  protected draftMinute = computed(() => (this.selected() ?? DEFAULT_TIME).minute);
  protected draftPeriod = computed(() => (this.selected() ?? DEFAULT_TIME).period);

  protected onHourChange(hour: number): void {
    this.selected.set({ ...(this.selected() ?? DEFAULT_TIME), hour });
  }

  protected onMinuteChange(minute: number): void {
    this.selected.set({ ...(this.selected() ?? DEFAULT_TIME), minute });
  }

  protected onPeriodChange(period: string): void {
    this.selected.set({ ...(this.selected() ?? DEFAULT_TIME), period: period as 'AM' | 'PM' });
  }
}
