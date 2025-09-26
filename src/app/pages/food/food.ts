import { Component } from '@angular/core';
import {SearchBar} from '../../components/header/search-bar.component';

@Component({
  selector: 'app-food',
  imports: [
    SearchBar
  ],
  template:`
    <app-search-bar placeHolderName="Search in food"/>
  `

})
export class Food {

}
