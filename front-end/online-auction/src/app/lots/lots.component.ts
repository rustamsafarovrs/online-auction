import {Component, OnInit} from '@angular/core';
import {BASE_URL, Lot, LotService} from '../_services/lot.service';
import {ErrorHandler} from '../_shared/error-handler';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {relative} from "@angular/compiler-cli/src/ngtsc/file_system";

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

  totalPages = [];
  params: HttpParams;

  loading = true;

  constructor(
    private lotService: LotService,
    private errorHandler: ErrorHandler,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.params = this.initQueryParams();

    this.getLots();
  }

  private initQueryParams(): HttpParams {
    this.route.queryParams.subscribe((qp) => {
      if (qp.q !== null) {
        this.q = qp.q;
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

  onPageSelect(i: number): void {
    // todo check page increment for another variant
    i = i + 1;
    this.params = this.params.set('page', i.toString());
    this.getLots();
  }

  private getLots(): void {
    this.loading = true;
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: this.params.get('page'),
          q: this.params.get('q'),
          size: this.params.get('size')
        },
        queryParamsHandling: 'merge'
      }
    );
    setTimeout(() => {
      this.lotService.get(this.params).subscribe(
        (data) => {
          this.lots = data.lots;
          this.totalPages = new Array(data.totalPages);
          this.loading = false;
        },
        (err) => {
          this.errorHandler.handleError(err);
          this.loading = false;
        }
      );
    }, 1);
  }
}
