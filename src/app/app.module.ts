import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountrylistComponent } from './countrylist/countrylist.component';
import { HolidayviewerComponent } from './holidayviewer/holidayviewer.component';
import { HolidayFetcherService } from './services/holidayfetcher.service';
import { WikipediaFetcherService } from './services/wikipediafetcher.service';
import { PinlistComponent } from './pinlist/pinlist.component';


@NgModule({
  declarations: [
    AppComponent,
    CountrylistComponent,
    HolidayviewerComponent,
    PinlistComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    HolidayFetcherService,
    WikipediaFetcherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
