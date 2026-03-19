import { Component, computed, input } from '@angular/core';
import { Trip } from '../../models/trip';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  template: `
    <div
      class="card card-compact w-full h-60 rounded-xl overflow-hidden group
         bg-base-200 border border-base-300
         hover:shadow-xl transition duration-300"
    >
      <!-- IMAGE -->
      <figure class="relative w-full h-full overflow-hidden">
        <img
          [src]="trip().coverImageUrl"
          alt="trip image"
          class="object-cover w-full h-full
             transition-transform duration-700 ease-out
             group-hover:scale-110"
        />

        <!-- SOFT FADE OVERLAY (very light) -->
        <div
          class="absolute inset-0
             bg-gradient-to-t
             from-black/40
             via-black/10
             to-transparent"
        ></div>

        <!-- BOTTOM GLOW (helps text readability without harshness) -->
        <div
          class="absolute bottom-0 left-0 right-0 h-32
             bg-gradient-to-t from-black/50 to-transparent"
        ></div>
      </figure>

      <!-- CONTENT -->
      <div
        class="card-body justify-end absolute inset-0 z-10
           p-4 md:p-5
           backdrop-blur-[1.5px]"
      >
        <div class="space-y-1">
          <!-- TITLE -->
          <h2
            class="card-title text-xl md:text-2xl font-semibold
               bg-gradient-to-t from-white to-white/70
               bg-clip-text text-transparent
               drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
          >
            {{ trip().title }}
          </h2>

          <!-- SUBTEXT -->
          <p
            class="text-sm
               bg-gradient-to-t from-white/90 to-white/50
               bg-clip-text text-transparent"
          >
            Your trip starts in
            <span class="text-primary font-medium drop-shadow-sm"> 4 Days </span>
          </p>

          <!-- DATE -->
          <p
            class="text-xs
               bg-gradient-to-t from-white/80 to-white/40
               bg-clip-text text-transparent"
          >
            {{ trip().startDate | date: 'MMM d' }} -
            {{ trip().endDate | date: 'MMM d' }}
            ({{ daysRemaining() }} Days)
          </p>
        </div>
      </div>
    </div>
  `,
  imports: [DatePipe],
})
export class TripCard {
  trip = input.required<Trip>();
  daysRemaining = computed(() => {
    const today = new Date();
    const start = new Date(this.trip().startDate);
    const diff = start.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  });
}
