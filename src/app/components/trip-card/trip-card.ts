import {Component, computed, input} from '@angular/core';
import {Trip} from '../../models/trip';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-trip-card',
  template: `
    <div
      class="card card-compact image-full w-full h-60 shadow-md border border-base-content/10 rounded-md overflow-hidden group"
    >
      <figure class="overflow-hidden">
        <img
          [src]="trip().coverImageUrl"
          alt="Shoes"
          class="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </figure>
      <div class="card-body justify-end">
        <div>
          <h2 class="card-title text-xl md:text-2xl text-base-content">
            {{ trip().title }}
          </h2>
          <p class="text-base-content/80 mt-0.5 md:mt-2">
            Your trips start in
            <span class="text-base-content">4 Days</span>
          </p>
          <p class="text-base-content/60">
            {{ trip().startDate | date:'MMM d' }} - {{ trip().endDate | date:'MMM d' }} ({{daysRemaining()}} Days)</p>
        </div>
      </div>
    </div>
  `,
  imports: [
    DatePipe
  ]
})
export class TripCard {
  trip = input.required<Trip>()
  daysRemaining = computed(() => {
    const today = new Date();
    const start = new Date(this.trip().startDate);
    const diff = start.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  });
}
