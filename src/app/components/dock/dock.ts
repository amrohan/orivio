import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-dock',
  imports: [RouterLink,RouterLinkActive],
  template:`
    <div class="dock max-w-5xl mx-auto">
      <a routerLink="/" routerLinkActive="dock-active" [routerLinkActiveOptions]="{exact:true}">
        <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt">
            <polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" stroke-miterlimit="10"
                      stroke-width="2"></polyline>
            <path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor"
                  stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></path>
            <line x1="12" y1="22" x2="12" y2="18" fill="none" stroke="currentColor" stroke-linecap="square"
                  stroke-miterlimit="10" stroke-width="2"></line>
          </g>
        </svg>
      </a>
      <a routerLink="/places" routerLinkActive="dock-active">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="size-[1.2em]">
          <path
            d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/>
          <path d="M15 5.764v15"/>
          <path d="M9 3.236v15"/>
        </svg>
      </a>

      <a routerLink="/food" routerLinkActive="dock-active">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="size-[1.2em]">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
          <path d="M7 2v20"/>
          <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
        </svg>
      </a>

      <a routerLink="/tracker" routerLinkActive="dock-active">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="size-[1.2em]">
          <path
            d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>
        </svg>
      </a>

      <a routerLink="/settings" routerLinkActive="dock-active">

        <div class="size-8 rounded-full">
          <img
            class="avatar rounded-full"
            src="https://avatars.githubusercontent.com/u/73811790?s=400&u=7b81fb28f1d47be6c0230fec7f10b75a04a1f100&v=4"/>
        </div>
      </a>
    </div>
  `
})
export class Dock {

}
