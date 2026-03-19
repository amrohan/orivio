import { Component } from '@angular/core';

@Component({
  selector: 'app-tracker-card',
  imports: [],
  template: `
    <div class="card card-xs md:card-sm bg-base-200 rounded-lg">
      <div class="card-body">
        <div class="flex justify-between items-center gap-4">
          <div>
            <h2 class="card-title">
              Gulugulu Day
            </h2>
            <p class="text-base-content/80">20 Dec 2025</p>
          </div>
          <button class="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="size-[1.2em]">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class TrackerCard {

}
