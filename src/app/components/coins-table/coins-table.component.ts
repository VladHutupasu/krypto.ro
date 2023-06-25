import { Component, HostListener, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CryptoApiService } from 'src/app/_services/crypto-api.service';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { testData } from './table-data-test';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
})
export class CoinsTableComponent implements OnInit {
  displayedColumns!: string[];
  globalMarketInfo: any;
  pageNumber = 1;
  loadingCoins: boolean = true;
  screenWidth!: number;
  readonly skeletonSize = { width: '100px', height: '15px' };
  testData = testData;

  constructor(private cryptoAPI: CryptoApiService, private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.setScreenWidth();
    // this.fetchTop100Coins();
    this.getGlobalMarketInfo();
  }

  setScreenWidth() {
    this.screenWidth = window.innerWidth;
  }

  fetchTop100Coins() {
    this.cryptoAPI
      .get100Coins(1)
      .pipe(
        tap(coins => {
          console.log('Top 100', coins);
          this.dataSharingService.sendTop100Coins(coins.slice());
          // this.dataSource.data = coins;
          // this.dataSource.sort = this.sort;
          this.loadingCoins = false;
        })
      )
      .subscribe();
  }

  getGlobalMarketInfo() {
    this.dataSharingService.globalMarketInfo.subscribe(response => (this.globalMarketInfo = response));
  }

  getDisplayedColumns() {
    if (this.screenWidth > 800) {
      return (this.displayedColumns = [
        'market_cap_rank',
        'name',
        'current_price',
        'price_change_percentage_24h',
        'market_cap',
        'total_volume',
        'circulating_supply',
        'sparkline7d',
      ]);
    } else {
      return (this.displayedColumns = [
        'name',
        'current_price',
        'price_change_percentage_24h',
        'market_cap',
        'total_volume',
        'circulating_supply',
        'sparkline7d',
      ]);
    }
  }

  next100() {
    console.log('Next100 ->>>');
    // this.dataSource.data = new Array<MarketQuote>(100);
    this.loadingCoins = true;
    this.cryptoAPI
      .get100Coins(++this.pageNumber)
      .pipe(
        tap(coins => {
          // this.dataSource.data = coins;
          this.loadingCoins = false;
        })
      )
      .toPromise();
  }

  back100() {
    console.log('Back100 ->>>');
    // this.dataSource.data = new Array<MarketQuote>(100);
    this.loadingCoins = true;
    this.cryptoAPI
      .get100Coins(--this.pageNumber)
      .pipe(
        tap(coins => {
          // this.dataSource.data = coins;
          this.loadingCoins = false;
        })
      )
      .toPromise();
  }

  getSmallImage(imageURL: string) {
    return imageURL.replace('/large/', '/thumb/');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  // TODO: Possible nice to have
  // sortChange() {
  //   this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: {
  //       sort: !!this.sort.active ? this.sort.active : null,
  //       sortDirection: !!this.sort.direction ? this.sort.direction : null
  //     },
  //     queryParamsHandling: 'merge'
  //   });
  // }
}
