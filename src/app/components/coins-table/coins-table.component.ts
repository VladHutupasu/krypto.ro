import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { CryptoApiService } from "src/app/_services/crypto-api.service";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MarketQuote } from "src/app/_models/market-quote";
import { tap } from "rxjs/operators";
import { DataSharingService } from "src/app/_services/data-sharing.service";

@Component({
  selector: "app-coins-table",
  templateUrl: "./coins-table.component.html",
  styleUrls: ["./coins-table.component.scss"],
})
export class CoinsTableComponent implements OnInit {
  displayedColumns: string[];
  globalMarketInfo: any;
  dataSource = new MatTableDataSource(new Array<MarketQuote>(100)); // create empty array such that we get the loading effect
  pageNumber = 1;
  loadingCoins: boolean = true;
  screenWidth: number;
  readonly skeletonSize = { width: "100px", height: "15px" };

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private cryptoAPI: CryptoApiService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.setScreenWidth();
    this.fetchTop100Coins();
    this.getGlobalMarketInfo();
  }

  setScreenWidth() {
    this.screenWidth = window.innerWidth;
  }

  fetchTop100Coins() {
    this.cryptoAPI
      .get100Coins(1)
      .pipe(
        tap((coins) => {
          console.log("Top 100", coins);
          this.dataSharingService.sendTop100Coins(coins.slice());
          this.dataSource.data = coins;
          this.dataSource.sort = this.sort;
          this.loadingCoins = false;
        })
      )
      .toPromise();
  }

  getGlobalMarketInfo() {
    this.dataSharingService.globalMarketInfo.subscribe(
      (response) => (this.globalMarketInfo = response)
    );
  }

  getDisplayedColumns() {
    if (this.screenWidth > 800) {
      return (this.displayedColumns = [
        "market_cap_rank",
        "name",
        "current_price",
        "price_change_percentage_24h",
        "market_cap",
        "total_volume",
        "circulating_supply",
        "sparkline7d",
      ]);
    } else {
      return (this.displayedColumns = [
        "name",
        "current_price",
        "price_change_percentage_24h",
        "market_cap",
        "total_volume",
        "circulating_supply",
        "sparkline7d",
      ]);
    }
  }

  next100() {
    console.log("Next100 ->>>");
    this.dataSource.data = new Array<MarketQuote>(100);
    this.loadingCoins = true;
    this.cryptoAPI
      .get100Coins(++this.pageNumber)
      .pipe(
        tap((coins) => {
          this.dataSource.data = coins;
          this.loadingCoins = false;
        })
      )
      .toPromise();
  }

  back100() {
    console.log("Back100 ->>>");
    this.dataSource.data = new Array<MarketQuote>(100);
    this.loadingCoins = true;
    this.cryptoAPI
      .get100Coins(--this.pageNumber)
      .pipe(
        tap((coins) => {
          this.dataSource.data = coins;
          this.loadingCoins = false;
        })
      )
      .toPromise();
  }

  getSmallImage(imageURL: string) {
    return imageURL.replace("/large/", "/thumb/");
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
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
