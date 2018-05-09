import { Component, OnInit, Input } from '@angular/core';
import { User } from '../app.component';
import { HolidayFetcherService } from '../services/holidayfetcher.service';

@Component({
  selector: 'holidayviewer',
  templateUrl: './holidayviewer.component.html',
  styleUrls: ['./holidayviewer.component.css']
})
export class HolidayviewerComponent implements OnInit {

  @Input() userInput: User;

  requestStr: string;
  result: any;

  private holidayFetcher: HolidayFetcherService;

  constructor(holidayFetcher: HolidayFetcherService) {

    this.holidayFetcher = holidayFetcher;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {

    this.userInput.country = changes.userInput.currentValue.country;
    this.userInput.year = changes.userInput.currentValue.year;

    this.setupRequest();
  }

  setupRequest() {

    this.requestStr = "https://holidayapi.com/v1/holidays?key=APIKEY&country=" + this.userInput.country + "&year=" + this.userInput.year;
  }

  request() {

    this.holidayFetcher.fetch(this.userInput.country, this.userInput.year, (r:any) => {

      this.result = r;
      console.log(this.result);
    })
  }
}
