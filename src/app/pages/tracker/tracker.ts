import { Component, signal } from '@angular/core';
import { SearchBar } from '../../components/header/search-bar.component';
import { Calendar } from '../../components/calendar/calendar';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-tracker',
  imports: [
    SearchBar,
    Calendar,
    DatePipe,
    Calendar
  ],
  template: `
    <app-search-bar placeHolderName="Search in tracker"/>

    <app-calendar
      [selectedDate]="selected()"
      [highlightedDates]="specialDates()"
      (dateSelected)="onDateSelected($event)">
    </app-calendar>

    @if (selected()){
    <div  class="mt-4 p-4 text-center">
      Selected Date: {{ selected() | date: 'fullDate' }}
    </div>
    }
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
