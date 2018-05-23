import { Component } from '@angular/core';

export interface User {

  year: number;
  month?: number;
  day?: number;
  country: string;
  valid: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userInput : User = { year: 2017, country: 'US', valid: true };

  selectedPin: string;
  pins: string[] = [];

  constructor() { 

    for(var i = 0; i < localStorage.length; i++) {

      if(localStorage.getItem(localStorage.key(i)) !== 'unpinned' && localStorage.getItem(localStorage.key(i)) != undefined) {

        let pin = localStorage.key(i).slice(0, 10) + " - " + localStorage.key(i).slice(10);
        this.onPinned(pin);
      }
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {

    this.userInput = Object.assign({}, this.userInput);
  }

  onSelected(country: string) {

    this.userInput.country = country;
    this.userInput = Object.assign({}, this.userInput);
  }

  onPinSelected(pin: string) {

    this.selectedPin = pin;
  }

  onPinned(pin: string) {

    let temp = this.pins;

    this.pins = [];

    this.pins = temp.concat(pin);
  }

  onUnPinned(pin: string) {

    let temp = this.pins;

    this.pins = [];

    this.pins = temp.filter(item => item !== pin);
  }

  clear() {

    this.pins = [];

    localStorage.clear();
  }
}
