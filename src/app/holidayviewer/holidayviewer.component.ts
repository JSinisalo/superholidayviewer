import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../app.component';
import { HolidayFetcherService } from '../services/holidayfetcher.service';
import { WikipediaFetcherService } from '../services/wikipediafetcher.service';

interface CardView {

  name: string;
  date: string;
  description: string;
  image: string;
  link: string;
  flag: string;
}

@Component({
  selector: 'holidayviewer',
  templateUrl: './holidayviewer.component.html',
  styleUrls: ['./holidayviewer.component.css']
})
export class HolidayviewerComponent implements OnInit {

  @Input() userInput: User;
  @Input() selectedPin: string;

  @Output() onPinned = new EventEmitter<string>();
  @Output() onUnPinned = new EventEmitter<string>();

  requestStr: string;

  views: CardView[];
  summaries: string[];
  links: string[];
  images: string[];

  result: any;  

  private holidayFetcher: HolidayFetcherService;
  private wikiFetcher: WikipediaFetcherService;

  constructor(holidayFetcher: HolidayFetcherService, wikiFetcher: WikipediaFetcherService) {

    this.holidayFetcher = holidayFetcher;
    this.wikiFetcher = wikiFetcher;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {

    if(changes.userInput != undefined) {

      this.userInput.country = changes.userInput.currentValue.country;
      this.userInput.year = changes.userInput.currentValue.year;
      this.userInput.month = changes.userInput.currentValue.month;
      this.userInput.day = changes.userInput.currentValue.day;
    }
  }

  request() {

    let m: string;
    let d: string;

    if(this.userInput.month != undefined)
      m = this.userInput.month.toString();

    if(this.userInput.day != undefined)
      d = this.userInput.day.toString();

    this.holidayFetcher.fetch(this.userInput.country, this.userInput.year.toString(), (r:any) => {

      this.result = r;

      this.requestWiki();

    }, m, d)
  }

  requestWiki() {

    let holidays : any[] = Object.values(this.result.holidays);

    this.summaries = [];
    this.links = [];
    this.images = [];

    let summariesFetched: boolean = false;
    let imagesFetched: boolean = false;
    let populating: boolean = false;

    let cursor = 0;
    let total = 0;
    let summaryAmount = 0;
    let imageAmount = 0;

    for(let i = 0; i < holidays.length; i++) {

      let holiday = holidays[i];

      for(let j = 0; j < holiday.length; j++) {

        total++;
      }
    }

    for(let i = 0; i < holidays.length; i++) {

      let holiday = holidays[i];

      for(let j = 0; j < holiday.length; j++) {

        let name = holiday[j].name;

        this.wikiFetcher.fetchSummary(name, cursor, (summary: string, link: string, pos: number) => {

          this.summaries[pos] = summary;
          this.links[pos] = link;

          summaryAmount++;

          if(summaryAmount === total)
            summariesFetched = true;

          if(imagesFetched && summariesFetched && !populating) {

            populating = true;
            this.populateViewer();
          }
        });

        this.wikiFetcher.fetchImage(name, cursor, (image: string, pos: number) => {

          this.images[pos] = image;

          imageAmount++;
          
          if(imageAmount === total)
            imagesFetched = true;

          if(imagesFetched && summariesFetched && !populating) {

            populating = true;
            this.populateViewer();
          }
        });

        cursor++;
      }
    }
  }

  populateViewer() {

    let holidays : any[] = Object.values(this.result.holidays);
    this.views = [];

    let cursor = 0;

    for(let i = 0; i < holidays.length; i++) {

      let holiday = holidays[i];

      for(let j = 0; j < holiday.length; j++) {

        this.views = this.views.concat({ name: holiday[j].name, date: holiday[j].date, description: this.summaries[cursor], image: this.images[cursor], link: this.links[cursor], flag: this.userInput.country });
        cursor++;
      }
    }
  }

  pin(date: string, name: string, flag: string) {

    localStorage.setItem(date + name, flag);
    this.onPinned.emit(date + " - " + name);
  }

  unpin(date: string, name: string) {

    localStorage.setItem(date + name, "unpinned");
    this.onUnPinned.emit(date + " - " + name);
  }

  getItem(item: string) {

    return localStorage.getItem(item);
  }
}
