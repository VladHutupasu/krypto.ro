import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoApiService } from 'src/app/services/crypto-api.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-coin-overview',
  templateUrl: './coin-overview.component.html',
  styleUrls: ['./coin-overview.component.scss']
})
export class CoinOverviewComponent implements OnInit {

  token: string;
  tokenData: any;

  constructor(private route: ActivatedRoute, private cryptoAPI: CryptoApiService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(tap(() => {
      this.token = this.route.snapshot.paramMap.get("coin");
      this.fetchCoinInformation();
    })).toPromise();
  }


  private fetchCoinInformation() {
    this.cryptoAPI.getInfoCoin(this.token).subscribe(result => {
      this.tokenData = result;
      console.log(result);
    });
  }
}
