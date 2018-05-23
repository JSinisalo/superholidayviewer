import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WikipediaFetcherService {

  private http: HttpClient;

  constructor(http: HttpClient) { 
    this.http = http
  }

  fetchSummary(s: string, p:number, f: Function) {

    let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + s + '&namespace=0&origin=*&redirects=resolve';

    let result: any;
    let source: any;

    this.http.get(url).subscribe((jsonObject: any) => {

      result = jsonObject[2];
      result = result[0];
      source = jsonObject[3];
      source = source[0];

      f(result, source, p);
    });
  }

  fetchImage(s: string, p:number, f: Function) {

    let url = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=' + s + '&format=json&pithumbsize=300&origin=*&pilicense=any&redirects=1'

    let result: any;

    this.http.get(url).subscribe((jsonObject: any) => {

      //amazing "loop", but the props is some random number that you cant get anycase so w/e
      for(let props in jsonObject.query.pages) {

        if(props !== "-1" && jsonObject.query.pages[props] != undefined && jsonObject.query.pages[props].thumbnail != undefined) {

          //this is some sick syntax aswell
          //pages.props.thumbnail doesnt work
          //props is just numbers so probably why
          result = jsonObject.query.pages[props].thumbnail.source;

        } else {

          result = "na"
        }

        break;
      }

      f(result, p);
    });
  }
}
