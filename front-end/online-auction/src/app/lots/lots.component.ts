import { Component, OnInit } from '@angular/core';
import { Lot, LotService } from '../_services/lot.service';

@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})
export class LotsComponent implements OnInit {

  lots: Lot[] = [];

  page: number;

  constructor(private lotService: LotService) {
  }

  ngOnInit(): void {
    this.page = 1;
    this.lotService.get(this.page).subscribe(
      (data) => {
        this.lots = data.lots;
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
