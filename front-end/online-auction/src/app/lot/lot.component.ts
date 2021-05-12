import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BASE_API, BASE_URL, Lot, LotService} from '../_services/lot.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {GalleryItem, ImageItem} from 'ng-gallery';
import {ErrorHandler} from '../_shared/error-handler';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss']
})
export class LotComponent implements OnInit {

  lotId: number;

  lot: Lot;

  imagesSubject$: BehaviorSubject<GalleryItem[]> = new BehaviorSubject<GalleryItem[]>([]);
  images$ = this.imagesSubject$.asObservable();

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private lotService: LotService,
    private errorHandler: ErrorHandler
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.lotId = params.id;
      this.initLot();
    });
  }

  private initLot(): void {
    this.loading = true;
    this.lotService.getLot(this.lotId)
      .subscribe(
        (data: Lot) => {
          this.loading = false;
          this.lot = data;
          this.initGallery(data);
        },
        (err) => {
          this.errorHandler.handleError(err);
          this.loading = false;
        }
      );
  }

  private initGallery(data: Lot): void {
    const galleryItems: GalleryItem[] = [];
    data.images.forEach(image => {
      galleryItems.push(new ImageItem({
        src: BASE_URL + '/images/' + image.name,
        thumb: BASE_URL + '/images/' + image.name
      }));
    });
    this.imagesSubject$.next(galleryItems);
  }

}
