import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CoinSearchResult } from '@core/models/coin-search-result';
import { CryptoApiService } from '@core/services/crypto-api.service';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchUpdates$ = new Subject<string>();
  searchResults: CoinSearchResult[] = [];
  loading = signal(true);
  currentTheme: string;

  destroy$ = new Subject<boolean>();

  searchInput = new FormControl('');

  constructor(private translate: TranslateService, private cryptoAPI: CryptoApiService) {
    const systemDarkModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme = localStorage.getItem('theme') || (systemDarkModeOn ? 'dark' : 'light');
  }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        tap(() => this.loading.set(true)),
        switchMap(value => {
          console.log('Searching...', value);
          return value ? this.cryptoAPI.searchCoin(value) : EMPTY;
        }),
        tap(results => {
          this.searchResults = results.slice(0, 5);
          this.loading.set(false);
        })
      )
      .subscribe();
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
