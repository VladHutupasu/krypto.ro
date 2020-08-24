import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoApiService } from 'src/app/services/crypto-api.service';
import { tap } from 'rxjs/operators';
import { StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-coin-overview',
  templateUrl: './coin-overview.component.html',
  styleUrls: ['./coin-overview.component.scss']
})
export class CoinOverviewComponent implements OnInit {

  token: string;
  tokenData: any;
  chart: StockChart;

  constructor(private route: ActivatedRoute, private cryptoAPI: CryptoApiService) { }

  ngOnInit(): void {
    
    this.route.paramMap.pipe(tap(() => {
      this.token = this.route.snapshot.paramMap.get("coin");
      this.fetchCoinInformation();
    })).toPromise();
  }


  private fetchCoinInformation() {
    this.cryptoAPI.getSingleInfoCoin(this.token).subscribe(result => {
      this.tokenData = result;
      console.log(result);
    });

    this.cryptoAPI.getCoinChart(this.token, "USD", "max").subscribe(result => {
      this.generateChart(result);
      console.log(result);
    });
  }

  generateChart(chartData: any) {
    this.chart = new StockChart({
      rangeSelector: {
        selected: 1
      },
      yAxis: [
        {
          labels: {
            align: "left"
          },
          height: "80%",
          resize: {
            enabled: true
          }
        },
        {
          labels: {
            align: "left"
          },
          top: "80%",
          height: "20%",
          offset: 0
        }
      ],
      tooltip: {
        split: false,
        shared: true
        // pointFormat: "Value: {point.y:.f}"
      },
      series: [
        {
          type: "line",
          name: "Price",
          data: chartData.prices
        },
        {
          type: "column",
          name: "Volume",
          data: chartData.total_volumes,
          yAxis: 1
        }
      ],
      credits: {
        enabled: false
      },
    });
  }
}
