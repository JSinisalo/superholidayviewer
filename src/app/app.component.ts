import { Component } from '@angular/core';

export interface User {

  year: number;
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

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

    console.log("changes");

    this.userInput = Object.assign({}, this.userInput);
  }

  onSelected(country: string) {

    this.userInput.country = country;
    this.userInput = Object.assign({}, this.userInput);
  }
}
