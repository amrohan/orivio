import {Component, input} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  template: `
      <div class="h-20 flex justify-center items-center">
        <label class="input bg-base-300 rounded-xl border-0 w-full">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" class="grow text-base-content/80 border-0" [placeholder]="placeHolderName()"/>
        </label>
      </div>
  `
})
export class SearchBar {
  placeHolderName =input.required<string>()


}
