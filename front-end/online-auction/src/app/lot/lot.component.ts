import { Component, Input, OnInit } from '@angular/core';
import { Lot } from '../_services/lot.service';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss']
})
export class LotComponent implements OnInit {

  @Input() lot: Lot;

  lotString: string;

  constructor() {
  }

  ngOnInit(): void {
    this.lotString = JSON.stringify(this.lot);
  }

}
