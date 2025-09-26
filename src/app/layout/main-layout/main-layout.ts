import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet
  ],
  template: `
    <main class="max-w-5xl mx-auto px-4 md:px-8">
      <router-outlet/>
    </main>
  `,
  styles: ``
})
export class MainLayout {

}
