import { Component, computed, model, signal } from '@angular/core';
import { RndIcon } from '../rnd-icon/rnd-icon';

interface CalendarDay {
  date: Date;
  inCurrentMonth: boolean;
  isToday: boolean;
}

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const BASE_DAY_CLASSES =
  'flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors';

@Component({
  imports: [RndIcon],
  selector: 'rnd-calendar',
  styleUrl: './rnd-calendar.css',
  templateUrl: './rnd-calendar.html',
})
export class RndCalendar {
  selected = model<Date | null>(null);

  protected weekdayLabels = WEEKDAY_LABELS;

  private viewDate = signal(new Date());

  protected monthLabel = computed(() =>
    this.viewDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  );

  protected days = computed<CalendarDay[]>(() => {
    const view = this.viewDate();
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay();
    const gridStart = new Date(year, month, 1 - startOffset);
    const today = new Date();

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + i);

      return {
        date,
        inCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
      };
    });
  });

  protected isSelected(day: CalendarDay): boolean {
    const selected = this.selected();
    return !!selected && selected.toDateString() === day.date.toDateString();
  }

  protected dayClasses(day: CalendarDay): string {
    if (this.isSelected(day)) {
      return `${BASE_DAY_CLASSES} bg-gradient-to-r from-secondary to-primary font-semibold text-white`;
    }

    if (!day.inCurrentMonth) {
      return `${BASE_DAY_CLASSES} text-white/20 hover:bg-white/5`;
    }

    if (day.isToday) {
      return `${BASE_DAY_CLASSES} border border-primary text-primary hover:bg-white/5`;
    }

    return `${BASE_DAY_CLASSES} text-foreground hover:bg-white/5`;
  }

  protected selectDay(day: CalendarDay): void {
    this.selected.set(day.date);
  }

  protected previousMonth(): void {
    const view = this.viewDate();
    this.viewDate.set(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  }

  protected nextMonth(): void {
    const view = this.viewDate();
    this.viewDate.set(new Date(view.getFullYear(), view.getMonth() + 1, 1));
  }
}
