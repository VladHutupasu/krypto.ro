import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CryptoApiService } from "src/app/services/crypto-api.service";
import { tap } from "rxjs/operators";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { StockChart } from "angular-highcharts";

@Component({
  selector: "app-coin-overview",
  templateUrl: "./coin-overview.component.html",
  styleUrls: ["./coin-overview.component.scss"],
})
export class CoinOverviewComponent implements OnInit {
  token: string;
  tokenData: any;
  readonly skeletonSize = { width: "100px", height: "15px" };

  // Chart
  chart: StockChart;

  constructor(
    private route: ActivatedRoute,
    private cryptoAPI: CryptoApiService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => {
          this.token = this.route.snapshot.paramMap.get("coin");
          this.fetchCoinInformationAndRenderChart();
        })
      )
      .toPromise();
  }

  private fetchCoinInformationAndRenderChart() {
    this.cryptoAPI.getSingleInfoCoin(this.token).subscribe((result) => {
      this.tokenData = result;
      console.log("Coin info", this.tokenData);
    });

    this.cryptoAPI
      .getCoinChart(this.token, "USD", "max")
      .subscribe((result) => {
        this.generateChart(result);
        console.log("Chart data", result);
      });
  }

  generateChart(result: any) {
    if (result.prices.length !== result.total_volumes.length) {
      console.error("Different sizes of arrays");
      return;
    }

    let prices = [];
    let volumes = [];

    for (let i = 0; i < result.prices.length; i++) {
      if (result.prices[i][0] != result.total_volumes[i][0]) {
        console.error("Different timestamps");
        return;
      }
      prices.push([new Date(result.prices[i][0]), result.prices[i][1]]);
      volumes.push([
        new Date(result.total_volumes[i][0]),
        result.total_volumes[i][1],
      ]);
      //TODO: http://localhost:4200/coins/nasdacoin
      //https://vladhutupasu.github.io/krypto.ro/coins/cosmos
      // if (i != result.prices.length - 1) {
      //   let date1 = new Date(result.prices[i][0]);
      //   let date2 = new Date(result.prices[i + 1][0]);
      //   let diffTime = date2.getTime() - date1.getTime();
      //   console.log(diffTime + " milliseconds");
      //   if (diffTime != 86400000 ){
      //     console.error("Found difference of more than 1 day ",i);
      //   }
      // }
    }

    this.chart = new StockChart({
      rangeSelector: {
        selected: 1,
      },
      yAxis: [
        {
          opposite: false,
          labels: {
            align: "left",
          },
          height: "80%",
          resize: {
            enabled: true,
          },
        },
        {
          opposite: false,
          labels: {
            align: "left",
            enabled: false,
          },
          top: "80%",
          height: "20%",
          offset: 0,
          lineWidth: 2,
        },
      ],
      xAxis: {
        type: "datetime",
      },
      //TODO: not shared when trying to lookup 3m
      tooltip: {
        split: false,
        shared: true,
        followPointer: true
      },
      series: [
        {
          type: "line",
          name: "Price",
          data: prices,
          tooltip: {
            valueSuffix: " $",
            valueDecimals: 2,
          },
        },
        {
          type: "column",
          name: "Volume",
          data: volumes,
          yAxis: 1,
          tooltip: {
            valueSuffix: " $",
            valueDecimals: 0,
          },
        },
      ],

      credits: {
        enabled: false,
      },
      chart: {
        backgroundColor: "#f7f6f4",
        height: "450px",
        spacingLeft: 30,
        spacingRight: 30,
        zoomType: "x"
      },
    });
  }
}
