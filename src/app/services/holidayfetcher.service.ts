import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HolidayFetcherService {

  private http: HttpClient;

  constructor(http: HttpClient) { 
    this.http = http
  }

  fetch(c: string, y: string, f: Function, m?: string, d?: string) {

    let url = 'https://holidayapi.com/v1/holidays?key=0df190fc-7317-44fa-abb5-900b9cd3cef8';
    let country = '&country=' + c;
    let year = '&year=' + y;
    let pretty = "&pretty=true";

    let extra = "";

    if(m != undefined && m !== "")
      extra += "&month=" + m;
    if(d != undefined && d !== "")
      extra += "&day=" + d;

    let result: any;

    this.http.get(url + country + year + extra + pretty).subscribe((jsonObject: any) => {

      result = jsonObject;
      f(result);
    });
  }
}
