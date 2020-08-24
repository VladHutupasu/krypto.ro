import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketQuote } from '../models/market-quote';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {

  baseUrl: string = "https://api.coingecko.com/api/v3";

  constructor(private http: HttpClient) { }

  getCurrentPrice(coin: string, currency: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/simple/price?ids=${coin}&vs_currencies=${currency}`);
  }

  getSingleInfoCoin(coin: string) {
    return this.http.get<any>(`${this.baseUrl}/coins/${coin}?localization=false&tickers=false&community_data=false&developer_data=false`);
  }

  getCoinChart(coin: string, currency: string, days: string) {
    return this.http.get<any>(`${this.baseUrl}/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`);
  }

  // getTop100(): Observable<MarketQuote[]> {
  //   return this.http.get<MarketQuote[]>(`${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`);
  // }

  getMultiInfoCoin(coins: string[]): Observable<MarketQuote[]> {
    return this.http.get<MarketQuote[]>(`${this.baseUrl}/coins/markets?vs_currency=usd&ids=${coins}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
  }

  getCoinsList() {
    return this.http.get<any>(`${this.baseUrl}/coins/list`);
  }

  getGlobalInfo() {
    return this.http.get<any>(`${this.baseUrl}/global`);
  }

  get100Coins(pageNumber: number): Observable<MarketQuote[]> {
    return this.http.get<MarketQuote[]>(`${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${pageNumber}&sparkline=true&price_change_percentage=24h`);
  }
}
