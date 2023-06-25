import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoinSearchResult } from '@core/models/coin-search-result';
import { CryptoApiService } from '@core/services/crypto-api.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class NavbarComponent implements OnInit {
  searchUpdates$ = new Subject<string>();
  searchResults: CoinSearchResult[] = [];
  loading = false;

  @ViewChild('languageSelector') languageSelector!: ElementRef;
  @ViewChild('searchBarSelector') searchBarSelector!: ElementRef;

  constructor(private translate: TranslateService, private cryptoAPI: CryptoApiService) {}

  ngOnInit(): void {
    this.initializeSearch();
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.languageSelector.nativeElement.removeAttribute('open');
  }

  initializeSearch() {
    this.searchUpdates$
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        tap(() => (this.loading = true))
      )
      .subscribe(value => {
        console.log('Searching...', value);
        this.searchBarSelector.nativeElement.setAttribute('open', '');
        this.cryptoAPI.searchCoin(value).subscribe(results => {
          this.searchResults = results.slice(0, 5);
          this.loading = false;
        });
      });
  }

  search($searchEvent: Event) {
    const searchTerm = ($searchEvent.target as HTMLInputElement).value;
    this.searchUpdates$.next(searchTerm);
  }

  // @TODO Fix dropdown when clicking outside of element
  closeDropdown() {
    this.searchBarSelector.nativeElement.removeAttribute('open');
  }
}
