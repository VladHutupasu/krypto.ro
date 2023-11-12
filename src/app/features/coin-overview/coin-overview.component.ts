import { CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SubscriptionsContainer } from '@core/pipes/subscriptions-container';
import { CryptoApiService } from '@core/services/crypto-api.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
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
    NgApexchartsModule,
    UpperCasePipe,
    DecimalPipe,
    CurrencyPipe,
    TranslateModule,
    NgClass,
    NumberSuffixPipe,
    AbsolutePipe,
  ],
})
export class CoinOverviewComponent implements OnInit, OnDestroy {
  subscriptions = new SubscriptionsContainer();

  token!: string;
  tokenData: any;
  readonly skeletonSize = { width: '100px', height: '15px' };

  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;

  constructor(
    private route: ActivatedRoute,
    private cryptoAPI: CryptoApiService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private meta: Meta,
    private title: Title
  ) {
    this.setTitleAndMeta();
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => {
          //@TODO fix this || ''
          this.token = this.route.snapshot.paramMap.get('coin') || '';
          this.fetchCoinInformationAndRenderChart();
        })
      )
      .subscribe();
  }

  private fetchCoinInformationAndRenderChart() {
    this.subscriptions.add = this.cryptoAPI.getSingleInfoCoin(this.token).subscribe(result => {
      this.tokenData = result;
      console.log('Coin info', this.tokenData);
    });

    this.subscriptions.add = this.cryptoAPI.getCoinChart(this.token, 'USD', 'max').subscribe(result => {
      // this.generateChart(result);
      this.initChartData(result);
      console.log('Chart data', result);
    });
  }

  setTitleAndMeta() {
    this.title.setTitle('Coin chart, market cap, trading volume and more');
    // this.meta.addTags([
    //   { name: "description", content: tokenData.description.en },
    // ]);
  }

  public initChartData(result: any): void {
    // let ts2 = 1484418600000;
    let dates = [];
    // for (let i = 0; i < 120; i++) {
    //   ts2 = ts2 + 86400000;
    //   dates.push([ts2, result]);
    // }

    for (let i = 0; i < result.prices.length; i++) {
      dates.push([result.prices[i][0], result.prices[i][1]]);
    }

    this.series = [
      {
        name: `${this.tokenData.name} price`,
        data: dates,
      },
    ];
    this.chart = {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
        show: false,
      },
    };
    this.dataLabels = {
      enabled: false,
    };
    this.markers = {
      size: 0,
    };
    this.fill = {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    };
    this.yaxis = {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
      title: {
        text: 'Price',
      },
    };
    this.xaxis = {
      type: 'datetime',
    };
    this.tooltip = {
      shared: false,
      y: {
        formatter: function (val) {
          return `${val.toFixed(0)} $`;
        },
      },
    };
  }

  generateChart(result: any) {
    if (result.prices.length !== result.total_volumes.length) {
      console.error('Different sizes of arrays');
      return;
    }

    let prices = [];
    let volumes = [];
    let lessThan1Day = [];
    let moreThan1Day = [];

    console.log('## Date', new Date(result.prices[0][0]).getDate());

    for (let i = 0; i < result.prices.length; i++) {
      if (result.prices[i][0] != result.total_volumes[i][0]) {
        console.error('Different timestamps');
        return;
      }

      prices.push([result.prices[i][0], result.prices[i][1]]);
      volumes.push([
        // Push date from prices since it should be the exact same
        result.total_volumes[i][0],
        result.total_volumes[i][1],
      ]);

      if (i != result.prices.length - 1) {
        let date1 = new Date(result.prices[i][0]);
        let date2 = new Date(result.prices[i + 1][0]);
        let diffTime = date2.getTime() - date1.getTime();
        if (diffTime != 86400000) {
          diffTime < 86400000 ? lessThan1Day.push(diffTime) : moreThan1Day.push(diffTime);
        }
      }
    }

    console.error('Found data with time diff more than 1 day - ', moreThan1Day.length);
    console.error('Found data with time diff less than 1 day - ', lessThan1Day.length);

    // this.chart = new StockChart({
    //   rangeSelector: {
    //     selected: 1,
    //   },
    //   yAxis: [
    //     {
    //       opposite: false,
    //       labels: {
    //         align: 'left',
    //       },
    //       height: '80%',
    //       resize: {
    //         enabled: true,
    //       },
    //     },
    //     {
    //       opposite: false,
    //       labels: {
    //         align: 'left',
    //         enabled: false,
    //       },
    //       top: '80%',
    //       height: '20%',
    //       offset: 0,
    //       lineWidth: 2,
    //     },
    //   ],
    //   xAxis: {
    //     type: 'datetime',
    //   },
    //   //TODO: not shared when trying to lookup 3m
    //   tooltip: {
    //     split: false,
    //     shared: true,
    //     followPointer: true,
    //   },
    //   series: [
    //     {
    //       type: 'line',
    //       name: 'Price',
    //       data: prices,
    //       tooltip: {
    //         valueSuffix: ' $',
    //         valueDecimals: 2,
    //       },
    //     },
    //     {
    //       type: 'column',
    //       name: 'Volume',
    //       data: volumes,
    //       yAxis: 1,
    //       tooltip: {
    //         valueSuffix: ' $',
    //         valueDecimals: 0,
    //       },
    //     },
    //   ],

    //   credits: {
    //     enabled: false,
    //   },
    //   chart: {
    //     backgroundColor: '#f7f6f4',
    //     height: '450px',
    //     spacingLeft: 30,
    //     spacingRight: 30,
    //     zoomType: 'x',
    //   },
    // });
  }

  ngOnDestroy(): void {
    this.subscriptions.dispose();
  }
}
