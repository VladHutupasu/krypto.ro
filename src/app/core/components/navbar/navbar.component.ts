import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoinSearchResult } from '@core/models/coin-search-result';
import { CryptoApiService } from '@core/services/crypto-api.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchUpdates$ = new Subject<string>();
  searchResults: CoinSearchResult[] = [];
  loading = false;
  currentTheme: string;

  destroy$ = new Subject<boolean>();

  constructor(private translate: TranslateService, private cryptoAPI: CryptoApiService) {
    const systemDarkModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme = localStorage.getItem('theme') || (systemDarkModeOn ? 'dark' : 'light');
  }

  ngOnInit(): void {
    this.initializeSearch();
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  initializeSearch() {
    this.searchUpdates$
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        tap(() => (this.loading = true)),
        switchMap(value => {
          console.log('Searching...', value);
          return this.cryptoAPI.searchCoin(value);
        }),
        tap(results => {
          this.searchResults = results.slice(0, 5);
          this.loading = false;
        })
      )
      .subscribe();
  }

  search($searchEvent: Event) {
    const searchTerm = ($searchEvent.target as HTMLInputElement).value;
    this.searchUpdates$.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
