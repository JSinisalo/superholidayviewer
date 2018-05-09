import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface Country {

  flag: string;
  name: string;
}

@Component({
  selector: 'countrylist',
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.css']
})
export class CountrylistComponent implements OnInit {

  @Output() onSelected = new EventEmitter<string>();

  countries : Country[] = [];

  constructor() {

    let countriesStr: string = "AR Argentina,AO Angola,AT Austria,AU Australia,AW Aruba,AX Åland Islands,BA Bosnia and Herzegovina,BE Belgium,BG Bulgaria,BO Bolivia,BR Brazil,BS The Bahamas,CA Canada,CH Switzerland,CN China,CO Colombia,CR Costa Rica,CU Cuba,CZ Czech Republic,DE Germany,DK Denmark,DO Dominican Republic,EC Ecuador,ES Spain,FI Finland,FR France,GB United Kingdom,GB-ENG England,GB-NIR Northern Ireland,GB-SCT Scotland,GB-WLS Wales,GR Greece,GT Guatemala,HK Hong Kong,HN Honduras,HR Croatia,HU Hungary,ID Indonesia,IE Ireland,IN India,IL Israel,IS Iceland,IT Italy,JP Japan,KZ Kazakhstan,LS Lesotho,LU Luxembourg,MG Madagascar,MQ MartiniqueMT Malta,MU Mauritius,MX Mexico,MZ Mozambique,NG Nigeria,NL Netherlands,NO Norway,PE Peru,PK Pakistan,PH Philippines,PL Poland,PR Puerto Rico,PT Portugal,PY Paraguay,RE Réunion,RO Romania,RU Russia,SC Seychelles,SE Sweden,SG Singapore,SI Slovenia,ST Sao Tome and Principe,SK Slovakia,TN Tunisia,TR Turkey,UA Ukraine,US United States,UY Uruguay,VE Venezuela,ZA South Africa,ZW Zimbabwe";

    let s = countriesStr.split(",");

    for(let i = 0; i < s.length; i++) {

      this.countries = this.countries.concat({ flag: "flag-icon-" + s[i].substring(0,2).toLowerCase(), name: s[i].substring(3) });
    }
  }

  ngOnInit() {
  }

  select(country: string) {

    this.onSelected.emit(country.toUpperCase().replace("FLAG-ICON-",""));
  }
}
