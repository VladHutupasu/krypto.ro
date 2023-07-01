import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MarketQuote } from '@core/models/market-quote';
import { CryptoApiService } from '@core/services/crypto-api.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CoinsTablePaginationComponent } from './components/coins-table-pagination/coins-table-pagination.component';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { CryptoInfoBarComponent } from './components/crypto-info-bar/crypto-info-bar.component';
import { GlobalCoinData } from './models/global-coin-data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CryptoInfoBarComponent, CoinsTableComponent, CoinsTablePaginationComponent, NgIf, AsyncPipe],
})
export class HomeComponent implements OnInit {
  pageNumber$: BehaviorSubject<number> = new BehaviorSubject(1);
  globalCoinData$: Observable<GlobalCoinData> = this.cryptoAPI.getGlobalInfo();
  tableCoins$: Observable<MarketQuote[]> = this.pageNumber$.pipe(
    switchMap(pageNumber => this.cryptoAPI.get100Coins(pageNumber))
  );

  constructor(private cryptoAPI: CryptoApiService) {}

  ngOnInit(): void {}

  onNextPage() {
    this.pageNumber$.next(this.pageNumber$.value + 1);
  }

  onPreviousPage() {
    this.pageNumber$.next(this.pageNumber$.value - 1);
  }
}
