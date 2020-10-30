import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CryptoApiService } from "src/app/services/crypto-api.service";
import { tap } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MarketQuote } from "src/app/models/market-quote";
import {
  ILoadedEventArgs,
  ITooltipRenderEventArgs,
} from "@syncfusion/ej2-angular-charts";
import { CurrencyPipe, DatePipe } from "@angular/common";

@Component({
  selector: "app-coin-overview",
  templateUrl: "./coin-overview.component.html",
  styleUrls: ["./coin-overview.component.scss"],
})
export class CoinOverviewComponent implements OnInit {
  token: string;
  tokenData: any;
  readonly skeletonSize = { width: "100px", height: "15px" };

  // Table
  displayedColumns: string[] = [
    "market_cap",
    "total_volume",
    "circulating_supply",
    "max_supply",
  ];
  dataSource = new MatTableDataSource(new Array<MarketQuote>(1));

  // Chart
  chartData: Object[];
  xAxis: Object;
  yAxis: Object;
  chartArea: Object;
  tooltip: Object;
  load(args: ILoadedEventArgs): void {
    args.chart.zoomModule.isZoomed = true;
  }
  zoomSettings: Object = {
    mode: "X",
    enableMouseWheelZooming: true,
    enablePinchZooming: true,
    enableSelectionZooming: true,
    enableScrollbar: true,
  };

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
      this.dataSource.data = [result.market_data];
      console.log("Coin info", result);
    });

    this.cryptoAPI
      .getCoinChart(this.token, "USD", "max")
      .subscribe((result) => {
        this.generateChart(result);
        console.log("Chart data", result);
      });
  }

  generateChart(result: any) {
    if (result.prices.length === result.total_volumes.length) {
      this.chartData = [];
      for (let i = 0; i < result.prices.length; i++) {
        this.chartData.push({
          datetime: new Date(result.prices[i][0]),
          price: result.prices[i][1],
          marketCap: result.market_caps[i][1],
          volume: result.total_volumes[i][1],
        });
      }
    }
    this.xAxis = {
      zoomFactor: 0.99,
      valueType: "DateTime",
      labelFormat: "d MMM y",
      rangePadding: "None",
      edgeLabelPlacement: "Shift",
      labelIntersectAction: "Rotate45",
      intervalType: "Years"
    };
    this.yAxis = {
      rangePadding: "Round",
      labelFormat: "c",
    };

    this.chartArea = {
      border: {
        width: 0,
      },
    };
    this.tooltip = { enable: true };
  }

  tooltipRender(args: ITooltipRenderEventArgs): void {
    let market_cap =
      "<br>Market cap: " +
      "<b>" +
      this.currencyPipe.transform(
        this.chartData[args.point.index]["marketCap"],
        "USD",
        "symbol",
        "1.0-0"
      ) +
      "</b>";
    let volume =
      "<br>Volume: " +
      "<b>" +
      this.currencyPipe.transform(
        this.chartData[args.point.index]["volume"],
        "USD",
        "symbol",
        "1.0-0"
      ) +
      "</b>";
    args.text =
      "Price: " +
      "<b>" +
      this.currencyPipe.transform(args.point.y) +
      "</b>" +
      market_cap +
      volume;
    args.headerText = this.datePipe.transform(args.point.x, "LLLL dd y, HH:mm");
  }
}
