import { Component, OnInit } from '@angular/core';
import { CryptoApiService } from 'src/app/services/crypto-api.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { MarketQuote } from 'src/app/models/market-quote';

@Component({
  selector: 'app-crypto-info-bar',
  templateUrl: './crypto-info-bar.component.html',
  styleUrls: ['./crypto-info-bar.component.scss']
})
export class CryptoInfoBarComponent implements OnInit {

  globalInfo: any;
  sortedTrends: MarketQuote[];

  importantTrends = {
    trendUp1: null,
    trendUp2: null,
    hot: null,
    trendDown1: null,
    trendDown2: null
  }


  constructor(private cryptoAPI: CryptoApiService, private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    this.fetchGlobalInfo();
    this.computeTrends();
  }

  fetchGlobalInfo() {
    this.cryptoAPI.getGlobalInfo().subscribe(response => {
      console.log("Global info ", response)
      this.globalInfo = response.data;
    });
  }

  computeTrends() {
    this.dataSharingService.top100Coins.subscribe(top100Coins => {

      this.sortedTrends = top100Coins.slice().sort((coin1, coin2) => {
        return coin1.price_change_percentage_24h > coin2.price_change_percentage_24h ? 1 : -1;
      });
      this.importantTrends.trendDown1 = this.sortedTrends[0];
      this.importantTrends.trendDown2 = this.sortedTrends[1];
      this.importantTrends.hot = top100Coins.reduce(function (coin1, coin2) {
        return (coin1.high_24h - coin1.low_24h) / coin1.current_price > (coin2.high_24h - coin2.low_24h) / coin1.current_price ? coin1 : coin2
      })
      this.importantTrends.trendUp1 = this.sortedTrends[this.sortedTrends.length - 1];
      this.importantTrends.trendUp2 = this.sortedTrends[this.sortedTrends.length - 2];
    })
  }
}