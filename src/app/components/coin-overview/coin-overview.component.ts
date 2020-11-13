import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CryptoApiService } from "src/app/_services/crypto-api.service";
import { tap } from "rxjs/operators";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { StockChart } from "angular-highcharts";
import { SubscriptionsContainer } from "src/app/_helpers/subscriptions-container";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-coin-overview",
  templateUrl: "./coin-overview.component.html",
  styleUrls: ["./coin-overview.component.scss"],
})
export class CoinOverviewComponent implements OnInit, OnDestroy {
  subscriptions = new SubscriptionsContainer();

  token: string;
  tokenData: any;
  readonly skeletonSize = { width: "100px", height: "15px" };

  // Chart
  chart: StockChart;

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
          this.token = this.route.snapshot.paramMap.get("coin");
          this.fetchCoinInformationAndRenderChart();
        })
      )
      .toPromise();
  }

  private fetchCoinInformationAndRenderChart() {
    this.subscriptions.add = this.cryptoAPI
      .getSingleInfoCoin(this.token)
      .subscribe((result) => {
        this.tokenData = result;
        console.log("Coin info", this.tokenData);
      });

    this.subscriptions.add = this.cryptoAPI
      .getCoinChart(this.token, "USD", "max")
      .subscribe((result) => {
        this.generateChart(result);
        console.log("Chart data", result);
      });
  }

  setTitleAndMeta() {
    this.title.setTitle("Coin chart, market cap, trading volume and more");
    // this.meta.addTags([
    //   { name: "description", content: tokenData.description.en },
    // ]);
  }

  generateChart(result: any) {
    if (result.prices.length !== result.total_volumes.length) {
      console.error("Different sizes of arrays");
      return;
    }

    let prices = [];
    let volumes = [];
    let lessThan1Day = [];
    let moreThan1Day = [];

    console.log("## DAte", new Date(result.prices[0][0]).getDate());

    for (let i = 0; i < result.prices.length; i++) {
      if (result.prices[i][0] != result.total_volumes[i][0]) {
        console.error("Different timestamps");
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
          diffTime < 86400000
            ? lessThan1Day.push(diffTime)
            : moreThan1Day.push(diffTime);
        }
      }
    }

    console.error(
      "Found data with time diff more than 1 day - ",
      moreThan1Day.length
    );
    console.error(
      "Found data with time diff less than 1 day - ",
      lessThan1Day.length
    );

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
        followPointer: true,
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
        zoomType: "x",
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.dispose();
  }
}
