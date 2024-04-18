import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MarketQuote } from '@core/models/market-quote';
import { NumberSuffixPipe } from '@core/pipes/number-suffix.pipe';
import { CryptoApiService } from '@core/services/crypto-api.service';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable, combineLatest, switchMap, tap } from 'rxjs';
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
  imports: [
    CryptoInfoBarComponent,
    CoinsTableComponent,
    CoinsTablePaginationComponent,
    NgIf,
    AsyncPipe,
    DecimalPipe,
    NumberSuffixPipe,
    TranslateModule,
  ],
})
export class HomeComponent implements OnInit {
  pageNumber$: BehaviorSubject<number> = new BehaviorSubject(1);
  data = toSignal(this.getApiCalls());

  constructor(private cryptoAPI: CryptoApiService) {}

  ngOnInit(): void {}

  getApiCalls() {
    const tableCoins: Observable<MarketQuote[] | undefined> = this.pageNumber$.pipe(
      tap(() => {
        if (this.data) {
          this.data()!.tableCoins = undefined;
        }
      }),
      switchMap(pageNumber => this.cryptoAPI.get100Coins(pageNumber))
    );
    const globalCoinData: Observable<GlobalCoinData> = this.cryptoAPI.getGlobalInfo();

    return combineLatest({ tableCoins, globalCoinData });
  }

  onNextPage() {
    this.pageNumber$.next(this.pageNumber$.value + 1);
  }

  onPreviousPage() {
    this.pageNumber$.next(this.pageNumber$.value - 1);
  }
}
