import { CurrencyPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarketQuote } from '@core/models/market-quote';
import { AbsolutePipe } from '@core/pipes/absolute-number.pipe';
import { NumberSuffixPipe } from '@core/pipes/number-suffix.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { TrendModule } from 'ngx-trend';
import { GlobalCoinData } from '../../models/global-coin-data.model';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    NgFor,
    NgIf,
    TrendModule,
    DecimalPipe,
    CurrencyPipe,
    TranslateModule,
    AbsolutePipe,
    NumberSuffixPipe,
    RouterLink,
  ],
})
export class CoinsTableComponent {
  loadingCoins: boolean = true;
  readonly skeletonSize = { width: '100px', height: '15px' };

  // Started refactoring
  @Input() globalCoinData!: GlobalCoinData;
  @Input() tableCoins!: MarketQuote[];

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
