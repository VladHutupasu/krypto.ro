import { CurrencyPipe, DecimalPipe, NgClass, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CryptoApiService } from '@core/services/crypto-api.service';
import { TranslateModule } from '@ngx-translate/core';
import { createChart } from 'lightweight-charts';
import { combineLatest, of, switchMap } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AbsolutePipe } from '../../core/pipes/absolute-number.pipe';
import { NumberSuffixPipe } from '../../core/pipes/number-suffix.pipe';
import { chartOptions } from './chart-options';

@Component({
  selector: 'app-coin-overview',
  templateUrl: './coin-overview.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgStyle,
    UpperCasePipe,
    DecimalPipe,
    CurrencyPipe,
    TranslateModule,
    NgClass,
    NumberSuffixPipe,
    AbsolutePipe,
  ],
})
export class CoinOverviewComponent {
  token!: string;
  isLoading = signal(true);

  tokenData = computed(() => {
    const data = this.data()?.coinInfo;
    if (!data) return;
    this.setTitleAndMeta(data?.description?.en);
    return data;
  });

  chartData = computed(() => {
    const data = this.data()?.coinChartInfo;
    if (!data) return;
    setTimeout(() => this.tradeViewChart(), 400);
    return data;
  });

  @ViewChild('tvChart', { static: false }) tvChart?: ElementRef;

  data = toSignal(
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(paramMap => (this.token = paramMap.get('coin')!)),
      switchMap(() => this.getAPICalls()),
      tap(() => this.isLoading.set(false))
    )
  );

  constructor(
    private route: ActivatedRoute,
    private cryptoAPI: CryptoApiService,
    private meta: Meta,
    private title: Title,
    private destroyRef: DestroyRef
  ) {}

  getAPICalls() {
    const coinInfo = this.cryptoAPI.getSingleInfoCoin(this.token).pipe(
      catchError(error => {
        console.error('Error fetching coin data', error);
        return of(null);
      })
    );
    const coinChartInfo = this.cryptoAPI.getCoinChart(this.token, 'USD', '365').pipe(
      catchError(error => {
        console.error('Error fetching chart data', error);
        return of(null);
      })
    );
    return combineLatest({ coinInfo, coinChartInfo });
  }

  setTitleAndMeta(description: string) {
    this.title.setTitle('Coin chart, market cap, trading volume and more');
    this.meta.addTags([{ name: 'description', content: description }]);
  }

  tradeViewChart() {
    console.log('[dev] Rendering chart data');
    if (!this.chartData() || !this.chartData()?.prices) return;
    const chart = createChart(this.tvChart?.nativeElement, chartOptions);

    const areaSeries = chart.addAreaSeries({
      lineColor: '#651ae6',
      topColor: '#d927a9',
      bottomColor: '#651ae645',
      lineWidth: 1,
    });

    const volumeSeries = chart.addHistogramSeries({
      color: '#27a59a70',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    let dates = [];
    for (let i = 0; i < this.chartData()!.prices.length; i++) {
      dates.push({ time: (this.chartData()!.prices[i][0] / 1000) as any, value: this.chartData().prices[i][1] });
    }
    areaSeries.setData(dates);

    let volumes = [];
    for (let i = 0; i < this.chartData().total_volumes.length; i++) {
      volumes.push({
        time: (this.chartData().total_volumes[i][0] / 1000) as any,
        value: this.chartData().total_volumes[i][1],
      });
    }
    volumeSeries.setData(volumes);

    chart.timeScale().fitContent();
  }
}
