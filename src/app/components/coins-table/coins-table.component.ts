import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CryptoApiService } from 'src/app/services/crypto-api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketQuote } from 'src/app/models/market-quote';
import { CoinDescription } from 'src/app/models/coin-description';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { go } from 'fuzzysort';
import { Observable } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent implements OnInit {

  displayedColumns: string[] = ['market_cap_rank', 'name', 'market_cap', 'current_price', 'total_volume', 'circulating_supply', 'price_change_percentage_24h', 'sparkline7d'];
  dataSource = new MatTableDataSource(new Array<MarketQuote>(100)); // create empty array such that we get the loading effect
  pageNumber = 1;
  loadingCoins: boolean = true;
  readonly skeletonSize = { width: '100px', height: '15px' };

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private cryptoAPI: CryptoApiService, private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    this.fetchTop100Coins();
  }

  fetchTop100Coins() {
    this.cryptoAPI.get100Coins(1).pipe(
      tap(coins => {
        console.log("Top 100", coins);
        this.dataSharingService.sendTop100Coins(coins.slice());
        this.dataSource.data = coins;
        this.dataSource.sort = this.sort;
        this.loadingCoins = false;
      })).toPromise();
  }

  next100() {
    console.log("Next100 ->>>")
      this.dataSource.data = new Array<MarketQuote>(100);
      this.loadingCoins = true;
      this.cryptoAPI.get100Coins(++this.pageNumber).pipe(
        tap(coins => {
          this.dataSource.data = coins;
          this.loadingCoins = false;
        })
      ).toPromise();
  }

  back100() {
    console.log("Back100 ->>>")
    this.dataSource.data = new Array<MarketQuote>(100);
    this.loadingCoins = true;
    this.cryptoAPI.get100Coins(--this.pageNumber).pipe(
      tap(coins => {
        this.dataSource.data = coins;
        this.loadingCoins = false;
      })
    ).toPromise();
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
