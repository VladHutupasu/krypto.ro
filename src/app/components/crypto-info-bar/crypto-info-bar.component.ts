import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionsContainer } from 'src/app/_helpers/subscriptions-container';
import { MarketQuote } from 'src/app/_models/market-quote';
import { CryptoApiService } from 'src/app/_services/crypto-api.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';

@Component({
  selector: 'app-crypto-info-bar',
  templateUrl: './crypto-info-bar.component.html',
  styleUrls: ['./crypto-info-bar.component.scss'],
})
export class CryptoInfoBarComponent implements OnInit, OnDestroy {
  subscriptions = new SubscriptionsContainer();

  globalInfo: any;
  sortedTrends: MarketQuote[] = [];
  readonly skeletonSize = { width: '100px', height: '20px' };

  importantTrends = {
    trendUp1: null,
    trendUp2: null,
    hot: null,
    trendDown1: null,
    trendDown2: null,
  };

  constructor(private cryptoAPI: CryptoApiService, private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.fetchGlobalInfo();
    this.computeTrends();
  }

  fetchGlobalInfo() {
    this.subscriptions.add = this.cryptoAPI.getGlobalInfo().subscribe(response => {
      console.log('Global info ', response);
      this.globalInfo = response.data;
      this.dataSharingService.sendGlobalInfo(response.data);
    });
  }

  computeTrends() {
    this.subscriptions.add = this.dataSharingService.top100Coins.subscribe(top100Coins => {
      this.sortedTrends = top100Coins.slice().sort((coin1, coin2) => {
        return coin1.price_change_percentage_24h > coin2.price_change_percentage_24h ? 1 : -1;
      });
      //@TODO Fix these as any
      this.importantTrends.trendDown1 = this.sortedTrends[0] as any;
      this.importantTrends.trendDown2 = this.sortedTrends[1] as any;
      this.importantTrends.hot = top100Coins.reduce(function (coin1, coin2) {
        return (coin1.high_24h - coin1.low_24h) / coin1.current_price >
          (coin2.high_24h - coin2.low_24h) / coin1.current_price
          ? coin1
          : coin2;
      }) as any;
      this.importantTrends.trendUp1 = this.sortedTrends[this.sortedTrends.length - 1] as any;
      this.importantTrends.trendUp2 = this.sortedTrends[this.sortedTrends.length - 2] as any;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.dispose();
  }
}
