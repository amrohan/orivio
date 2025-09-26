import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import {Dock} from './components/dock/dock';
import {SearchBar} from './components/header/search-bar.component';

@Component({
  selector: 'app-root',
  imports: [Dock, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('orivio');
}
