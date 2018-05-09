import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HolidayFetcherService {

  private http: HttpClient;

  constructor(http: HttpClient) { 
    this.http = http
  }

  fetch(c, y, f: Function) {

    let url = 'https://holidayapi.com/v1/holidays?key=0df190fc-7317-44fa-abb5-900b9cd3cef8';
    let country = '&country=' + c;
    let year = '&year=' + y;
    let pretty = "&pretty=true";

    let result: any;

    this.http.get(url + country + year + pretty).subscribe(jsonObject => {

      result = jsonObject;
      f(result);
    });
  }
}
