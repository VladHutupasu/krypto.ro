import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MarketQuote } from '../models/market-quote';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  public top100Coins = new Subject<MarketQuote[]>();

  public sendTop100Coins(top100Coins: MarketQuote[]) {
    this.top100Coins.next(top100Coins);
  }
}
