import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Dock} from './components/dock/dock';

@Component({
  selector: 'app-root',
  imports: [Dock, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
