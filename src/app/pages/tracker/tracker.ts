import { Component, signal } from '@angular/core';
import { SearchBar } from '../../components/header/search-bar.component';
import { Calendar } from '../../components/calendar/calendar';
import {DatePipe} from '@angular/common';
import {TrackerCard} from './tracker-card/tracker-card';

@Component({
  selector: 'app-tracker',
  imports: [
    SearchBar,
    Calendar,
    DatePipe,
    Calendar,
    TrackerCard
  ],
  template: `
    <div class="sticky top-0 z-10 bg-base-100">
    <app-search-bar placeHolderName="Search in tracker"/>
    <app-calendar
      [selectedDate]="selected()"
      [highlightedDates]="specialDates()"
      (dateSelected)="onDateSelected($event)">
    </app-calendar>
      <h1 class="h-10 text-base-content/90">Activities</h1>
    </div>
    <section class="mt-4 mb-28 flex flex-col gap-4">
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
      <app-tracker-card/>
    </section>

  `,
  styles: ``
})
export class Tracker {
  selected = signal<Date | null>(null);

  specialDates = signal<Date[]>([
    new Date(2025, 0, 1),
    new Date(2025, 11, 25),
  ]);

  onDateSelected(date: Date) {
    this.selected.set(date);
    console.log('Date selected:', date);
  }
}
