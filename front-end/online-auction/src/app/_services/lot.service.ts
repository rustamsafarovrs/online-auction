import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './auth.service';
import {Observable} from 'rxjs';

export const BASE_URL = 'http://localhost:8080';
export const BASE_API = BASE_URL + '/api';

export interface Image {
  id: number;
  name: string;
  type: string;
}

export interface Lot {
  lotId: number;
  name: string;
  currently: number;
  firstBid: number;
  numberOfBids: number;
  started: string;
  ends: string;
  description: string;
  buyPrice: number;
  bids: Bid[];
  seller: User;
  images: Array<Image>;

}

export interface Bid {
  bidId: number;
  time: string;
  amount: number;
  lot: Lot;
  bidder: User;
}

export interface LotResponse {
  lots: Lot[];
  page: number;
}

@Injectable({providedIn: 'root'})
export class LotService {
  constructor(private http: HttpClient) {
  }

  get(params: HttpParams): Observable<any> {
    return this.http.get(BASE_API + '/lots', {params});
  }

  getLot(id: number): Observable<any> {
    return this.http.get<any>(BASE_API + '/lot/' + id);
  }

}
