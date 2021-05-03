import {Component, OnInit} from '@angular/core';
import {BASE_URL, Lot, LotService} from '../_services/lot.service';
import {ErrorHandler} from '../_shared/error-handler';
import {ActivatedRoute} from '@angular/router';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss']
})
export class LotsComponent implements OnInit {
  imagesUrl = BASE_URL + '/images/';

  lots: Lot[] = [];
  q: string;
  page: number;
  size: number;

  constructor(private lotService: LotService, private errorHandler: ErrorHandler, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const params = this.initQueryParams();

    this.lotService.get(params).subscribe(
      (data) => {
        this.lots = data.lots;
      },
      (err) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  private initQueryParams(): HttpParams {
    this.route.queryParams.subscribe((qp) => {
      if (qp.q !== null) {
        this.q   = qp.q;
      }
      if (qp.page !== null) {
        this.page = qp.page;
      }
      if (qp.size !== null) {
        this.size = qp.size;
      }
    });

    let params = new HttpParams();
    if (this.q) {
      params = params.set('q', this.q);
    }
    if (this.page > 0) {
      params = params.set('page', this.page.toString());
    }
    if (this.size > 0) {
      params = params.set('size', this.size.toString());
    }

    return params;
  }
}
