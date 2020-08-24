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

  title = 'Top 100 criptomonezi';
  allCoins: CoinDescription[] = [];
  form: FormGroup;
  searchResults$: Observable<CoinDescription[]>;

  displayedColumns: string[] = ['market_cap_rank', 'name', 'market_cap', 'current_price', 'total_volume', 'circulating_supply', 'price_change_percentage_24h', 'sparkline7d'];
  dataSource = new MatTableDataSource(new Array<MarketQuote>(100)); // create empty array such that we get the loading effect
  searchIcon = 'search';
  pageNumber = 1;
  loadingCoins: boolean = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() panelWidth: string | number;

  constructor(private cryptoAPI: CryptoApiService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    this.initializeSearchForm();
    this.listenToSearchChanges();
    this.fetchTop100Coins();
    this.fetchCoinsList();
  }


  fetchCoinsList() {
    this.cryptoAPI.getCoinsList().pipe(
      tap(coins => {
        console.log("Coins list - ", coins);
        this.allCoins = coins;
      })).toPromise();
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

  listenToSearchChanges() {
    this.searchResults$ = this.form.valueChanges.pipe(
      debounceTime(400),
      map(form => form.search),
      distinctUntilChanged(),
      map(searchWord => {
        let searchResults = this.fuzzySearch(searchWord).map(result => result.obj);
        //TODO: I dont really like this approach
        this.setLogoForEachResult(searchResults);
        return searchResults;
      })
    );
  }

  setLogoForEachResult(searchResults: CoinDescription[]) {
    this.cryptoAPI.getMultiInfoCoin(searchResults.map(coin => coin.id)).subscribe(response => {
      response.forEach(info => {
        searchResults.find(element => element.id === info.id).image = info.image;
      });
    });
  }

  fuzzySearch(searchWord: string) {
    return go(searchWord, this.allCoins, {
      keys: ['symbol', 'name'],
      limit: 5,
      allowTypo: false,
      threshold: -10000,
    })
  }

  initializeSearchForm() {
    this.form = this.formBuilder.group({
      search: ['']
    });
  }

  searchFocused() {
    console.log("Search focused")
    this.searchIcon = 'close';
  }

  searchUnfocused() {
    console.log("Search unfocused")
    this.searchIcon = 'search';
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
