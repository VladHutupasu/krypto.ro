import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MarketQuote } from '../_models/market-quote';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  public top100Coins = new Subject<MarketQuote[]>();
  public globalMarketInfo = new Subject<any>();

  public sendTop100Coins(top100Coins: MarketQuote[]) {
    this.top100Coins.next(top100Coins);
  }

  public sendGlobalInfo(globalMarketInfo: any) {
    this.globalMarketInfo.next(globalMarketInfo);
  }
}
