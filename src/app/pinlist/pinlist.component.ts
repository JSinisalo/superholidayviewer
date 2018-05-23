import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

interface Pin {

  name: string;
  link: string;
}

@Component({
  selector: 'pinlist',
  templateUrl: './pinlist.component.html',
  styleUrls: ['./pinlist.component.css']
})
export class PinlistComponent implements OnInit {

  @Input() pins: string[];

  @Output() onPinSelected = new EventEmitter<string>();

  pinList: Pin[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {

    if(changes.pins != undefined) {

      this.setPinList();
    }
  }

  setPinList() {

    this.pinList = [];

    for(let i = 0; i < this.pins.length; i++) {

      this.pinList = this.pinList.concat({ name: this.pins[i], link: localStorage.getItem(this.pins[i].replace(" - ","")) });
    }
  }

  select(pin: string) {

    this.onPinSelected.emit(pin);
  }
}
