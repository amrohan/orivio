import {
  Component,
  computed,
  input,
  output,
  viewChild,
  afterNextRender,
  model,
  signal,
  effect,
  OnInit
} from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';

export interface Day {
  date: Date;
  dayOfWeek: string;
  dayOfMonth: number;
  isToday: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
}

const getDefaultMaxDate = (): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date;
};

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, ScrollingModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css'],
})
export class Calendar implements OnInit {
  highlightedDates = input.required<Date[]>();
  dateSelected = output<Date>();

  maxDate = input<Date>(getDefaultMaxDate());
  minDate = input<Date>(new Date(1900, 0, 1));

  selectedDate = model<Date | null>(null);

  ngOnInit() {
    setTimeout(() => {
      this.goToToday()
    }, 10)
  }

  private readonly SCROLL_BUFFER = 4;
  private readonly CHUNK_SIZE = 100;
  private isLoading = false;

  private numberOfDays = signal(365 * 2);
  private startDate = signal<Date>(this.calculateInitialStartDate());

  private viewedDate = signal<Date>(this.getStartOfDay(this.selectedDate() || new Date()));
  private scrollCorrectionIndex = signal<number | null>(null);

  isPickingYear = signal(false);

  private firstYearInView = signal(new Date().getFullYear() - 10);
  private yearCount = signal(21);
  private yearScrollCorrectionIndex = signal<number | null>(null);

  dayViewport = viewChild.required('dayViewport', { read: CdkVirtualScrollViewport });
  yearViewport = viewChild('yearViewport', { read: CdkVirtualScrollViewport });

  private scrollCorrector = effect(() => {
    const index = this.scrollCorrectionIndex();
    if (index !== null) {
      this.dayViewport().scrollToIndex(index, 'auto');
      this.scrollCorrectionIndex.set(null);
      setTimeout(() => (this.isLoading = false), 200);
    }
  });

  private yearScrollCorrector = effect(() => {
    const index = this.yearScrollCorrectionIndex();
    if (index !== null && this.yearViewport()) {
      this.yearViewport()!.scrollToIndex(index, 'auto');
      this.yearScrollCorrectionIndex.set(null);
    }
  });


  private getStartOfDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  private getDateString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private calculateInitialStartDate(): Date {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(this.numberOfDays() / 2));
    return this.getStartOfDay(startDate);
  }

  private highlightedDatesMap = computed(() =>
    new Map(this.highlightedDates().map(d => [this.getDateString(d), true]))
  );

  protected days = computed(() => {
    const today = new Date();
    const todayDateString = this.getDateString(today);
    const daysArray: Day[] = [];
    const initialDate = this.startDate();
    const totalDays = this.numberOfDays();
    const map = this.highlightedDatesMap();
    const selected = this.selectedDate();

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(initialDate);
      date.setDate(initialDate.getDate() + i);
      const dateString = this.getDateString(date);

      daysArray.push({
        date,
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayOfMonth: date.getDate(),
        isToday: dateString === todayDateString,
        isSelected: !!selected && dateString === this.getDateString(selected),
        isHighlighted: map.has(dateString),
      });
    }
    return daysArray;
  });

  protected currentMonth = computed(() => {
    const date = this.viewedDate();
    return date.toLocaleDateString('en-US', { month: 'long' });
  });

  protected currentYear = computed(() => {
    const date = this.viewedDate();
    return date.getFullYear();
  });

  protected years = computed(() => {
    const start = this.firstYearInView();
    const count = this.yearCount();
    return Array.from({ length: count }, (_, i) => start + i);
  });


  private todayIndex = computed(() => this.days().findIndex(day => day.isToday));

  private initialScroll = afterNextRender(() => {
    const index = this.todayIndex();
    if (index > -1) {
      setTimeout(() => this.dayViewport().scrollToIndex(index, 'smooth'), 0);
    }
  });

  protected selectDate(selectedDay: Day): void {
    const cleanDate = this.getStartOfDay(selectedDay.date);
    this.selectedDate.set(cleanDate);
    this.viewedDate.set(cleanDate);
    this.dateSelected.emit(cleanDate);
  }

  protected goToToday(): void {
    this.goToDate(new Date());
    this.isPickingYear.set(false);
  }

  protected onDayScrollIndexChange(index: number): void {
    if (this.isLoading) {
      return;
    }

    const totalDays = this.numberOfDays();
    const days = this.days();

    if (days[index]) {
      this.viewedDate.set(this.getStartOfDay(days[index].date));
    }

    const lastRenderedDate = days[days.length - 1]?.date;
    if (index >= totalDays - this.SCROLL_BUFFER && lastRenderedDate && lastRenderedDate < this.maxDate()) {
      this.isLoading = true;
      this.numberOfDays.update(n => n + this.CHUNK_SIZE);
      setTimeout(() => (this.isLoading = false), 200);

    } else if (index <= this.SCROLL_BUFFER) {
      this.isLoading = true;
      const currentStartDate = this.startDate();
      const newStartDate = new Date(currentStartDate);
      newStartDate.setDate(currentStartDate.getDate() - this.CHUNK_SIZE);

      this.startDate.set(newStartDate);
      this.numberOfDays.update(n => n + this.CHUNK_SIZE);

      this.scrollCorrectionIndex.set(index + this.CHUNK_SIZE);
    }
  }

  protected onYearScrollIndexChange(index: number): void {
    const years = this.years();
    const yearChunk = 10;

    if (index >= years.length - this.SCROLL_BUFFER && years[years.length - 1] < this.maxDate().getFullYear()) {
      this.yearCount.update(c => c + yearChunk);
    } else if (index <= this.SCROLL_BUFFER && years[0] > this.minDate().getFullYear()) {
      this.firstYearInView.update(y => y - yearChunk);
      this.yearCount.update(c => c + yearChunk);
      this.yearScrollCorrectionIndex.set(index + yearChunk);
    }
  }

  protected trackByDate = (index: number, day: Day): string => this.getDateString(day.date);
  protected trackByYear = (index: number, year: number): number => year;

  protected toggleYearPicker(): void {
    const currentlyPicking = this.isPickingYear();
    if (!currentlyPicking) {
      const currentYear = this.currentYear();
      const yearOffset = 10;
      this.firstYearInView.set(currentYear - yearOffset);
      this.yearCount.set(yearOffset * 2 + 1);

      setTimeout(() => {
        const yearIndex = this.years().findIndex(y => y === currentYear);
        if (this.yearViewport() && yearIndex > -1) {
          this.yearViewport()!.scrollToIndex(yearIndex, 'auto');
        }
      }, 0);
    }
    this.isPickingYear.set(!currentlyPicking);
  }


  protected selectYear(year: number): void {
    const currentViewedDate = this.viewedDate();
    const targetDate = new Date(year, currentViewedDate.getMonth(), 1);
    this.goToDate(targetDate);
    this.isPickingYear.set(false);
  }

  private goToDate(date: Date): void {
    this.isLoading = true;
    const cleanDate = this.getStartOfDay(date > this.maxDate() ? this.maxDate() : date);

    this.viewedDate.set(cleanDate);
    this.selectedDate.set(cleanDate);

    const daysToRender = 365 * 2;
    const newStartDate = new Date(cleanDate);
    newStartDate.setDate(cleanDate.getDate() - Math.floor(daysToRender / 2));

    this.numberOfDays.set(daysToRender);
    this.startDate.set(this.getStartOfDay(newStartDate));

    const newIndex = Math.floor(daysToRender / 2);
    this.scrollCorrectionIndex.set(newIndex);
    this.dateSelected.emit(cleanDate);
  }
}
