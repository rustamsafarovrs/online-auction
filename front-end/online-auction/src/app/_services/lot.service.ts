import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './auth.service';
import { Observable } from 'rxjs';

export const BASE_API = 'http://localhost:8080/api';

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

@Injectable({ providedIn: 'root' })
export class LotService {
  constructor(private http: HttpClient) {
  }

  get(page: number): Observable<any> {
    return this.http.get(BASE_API + '/lots');
  }

}
