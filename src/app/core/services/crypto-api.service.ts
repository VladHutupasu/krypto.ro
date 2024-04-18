import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoinSearchResult } from '@core/models/coin-search-result';
import { Observable, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarketQuote } from '../models/market-quote';

@Injectable({
  providedIn: 'root',
})
export class CryptoApiService {
  baseUrl: string = 'https://api.coingecko.com/api/v3';
  API_KEY: string = 'CG-LhmZapAaBEXqzQYCx4tVpUfQ';

  constructor(private http: HttpClient) {}

  getCurrentPrice(coin: string, currency: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/simple/price?ids=${coin}&vs_currencies=${currency}&x_cg_demo_api_key=${this.API_KEY}`
    );
  }

  getSingleInfoCoin(coin: string) {
    if (environment.production) {
      return this.http.get<any>(
        `${this.baseUrl}/coins/${coin}?localization=false&tickers=false&community_data=false&developer_data=false&x_cg_demo_api_key=${this.API_KEY}`
      );
    }
    return throwError(() => 'Error');
    // return of(coinData).pipe(delay(6000));
  }

  getCoinChart(coin: string, currency: string, days: string) {
    if (environment.production) {
      return this.http.get<any>(
        `${this.baseUrl}/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily&x_cg_demo_api_key=${this.API_KEY}`
      );
    }
    return throwError(() => 'Error');
    // return of(marketData).pipe(delay(2000));
  }

  getMultiInfoCoin(coins: string[]): Observable<MarketQuote[]> {
    return this.http.get<MarketQuote[]>(
      `${this.baseUrl}/coins/markets?vs_currency=usd&ids=${coins}&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${this.API_KEY}`
    );
  }

  getCoinsList() {
    return this.http.get<any>(`${this.baseUrl}/coins/list&x_cg_demo_api_key=${this.API_KEY}`);
  }

  getGlobalInfo() {
    return this.http
      .get<any>(`${this.baseUrl}/global?x_cg_demo_api_key=${this.API_KEY}`)
      .pipe(map(response => response.data));
  }

  get100Coins(pageNumber: number): Observable<MarketQuote[]> {
    return this.http
      .get<MarketQuote[]>(
        `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${pageNumber}&sparkline=true&price_change_percentage=24h&x_cg_demo_api_key=${this.API_KEY}`
      )
      .pipe(
        map(coins =>
          coins.map(coin => {
            coin.image = coin.image.replace('large', 'small');
            return coin;
          })
        )
      );
  }

  searchCoin(coin: string): Observable<CoinSearchResult[]> {
    return this.http
      .get<any>(`${this.baseUrl}/search?query=${coin}&x_cg_demo_api_key=${this.API_KEY}`)
      .pipe(map(value => value.coins));
  }
}
