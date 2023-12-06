import { CurrencyPipe, DecimalPipe, NgClass, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CryptoApiService } from '@core/services/crypto-api.service';
import { TranslateModule } from '@ngx-translate/core';
import { ChartOptions, CrosshairMode, DeepPartial, createChart } from 'lightweight-charts';
import { forkJoin, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AbsolutePipe } from '../../core/pipes/absolute-number.pipe';
import { NumberSuffixPipe } from '../../core/pipes/number-suffix.pipe';

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
export class CoinOverviewComponent implements OnInit {
  token!: string;
  tokenData: any;
  chartData: any;
  @ViewChild('tvChart', { static: false }) tvChart?: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private cryptoAPI: CryptoApiService,
    private meta: Meta,
    private title: Title,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const coinInfo = this.cryptoAPI.getSingleInfoCoin(this.token).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(result => {
        this.tokenData = result;
        this.setTitleAndMeta();
        console.log('Coin info', this.tokenData);
      })
    );

    const coinChartInfo = this.cryptoAPI.getCoinChart(this.token, 'USD', 'max').pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(result => {
        this.chartData = result;
        setTimeout(() => this.tradeViewChart(), 300);
        console.log('Chart data', this.chartData);
      })
    );

    const apiCalls = forkJoin({ coinInfo, coinChartInfo });

    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(paramMap => (this.token = paramMap.get('coin')!)),
        switchMap(() => apiCalls)
      )
      .subscribe();
  }

  setTitleAndMeta() {
    this.title.setTitle('Coin chart, market cap, trading volume and more');
    this.meta.addTags([{ name: 'description', content: this.tokenData.description.en }]);
  }

  tradeViewChart() {
    const options: DeepPartial<ChartOptions> = {
      height: 450,
      autoSize: true,
      rightPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0,
        },
      },
      overlayPriceScales: {
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      },
      layout: {
        background: { color: 'transparent' },
        textColor: '#a6adba',
        fontFamily: 'Inter',
      },
      grid: {
        vertLines: {
          color: '#a6adba00',
        },
        horzLines: {
          color: '#a6adba45',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    };

    const chart = createChart(this.tvChart?.nativeElement, options);

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
    for (let i = 0; i < this.chartData.prices.length; i++) {
      dates.push({ time: (this.chartData.prices[i][0] / 1000) as any, value: this.chartData.prices[i][1] });
    }
    areaSeries.setData(dates);

    let volumes = [];
    for (let i = 0; i < this.chartData.total_volumes.length; i++) {
      volumes.push({
        time: (this.chartData.total_volumes[i][0] / 1000) as any,
        value: this.chartData.total_volumes[i][1],
      });
    }
    volumeSeries.setData(volumes);

    chart.timeScale().fitContent();
  }
}
