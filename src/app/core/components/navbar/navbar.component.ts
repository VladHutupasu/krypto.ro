import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoinDescription } from '@core/models/coin-description';
import { Language } from '@core/models/language';
import { SubscriptionsContainer } from '@core/pipes/subscriptions-container';
import { CryptoApiService } from '@core/services/crypto-api.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { go } from "fuzzysort";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  subscriptions = new SubscriptionsContainer();

  selectedLanguage!: Language;
  showSearchBox: boolean = false;
  languages: Language[] = [
    {
      id: 'en',
      name: 'English',
      flag: 'en20.png',
    },
    {
      id: 'ro',
      name: 'Română',
      flag: 'ro20.png',
    },
  ];
  form!: FormGroup;
  searchResults$!: Observable<CoinDescription[]>;
  allCoins: CoinDescription[] = [];

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private cryptoAPI: CryptoApiService
  ) {}

  ngOnInit(): void {
    this.initializeSearchForm();
    // this.listenToSearchChanges();
    // this.fetchCoinsList();
  }

  fetchCoinsList() {
    this.cryptoAPI.getCoinsList().pipe(
      tap(coins => {
        console.log('Coins list - ', coins);
        this.allCoins = coins;
      })
    );
  }

  setLanguage(lang: Language): void {
    this.selectedLanguage = lang;
    this.translate.use(lang.id);
  }

  initializeSearchForm() {
    this.form = this.formBuilder.group({
      search: [''],
    });
  }

  // setLogoForEachResult(searchResults: CoinDescription[]) {
  //   this.subscriptions.add = this.cryptoAPI.getMultiInfoCoin(searchResults.map(coin => coin.id)).subscribe(response => {
  //     response.forEach(info => {
  //       searchResults.find(element => element.id === info.id).image = info.image;
  //     });
  //   });
  // }

  //@TODO fix searching
  fuzzySearch(searchWord: string) {
    // return go(searchWord, this.allCoins, {
    //   keys: ["symbol", "name"],
    //   limit: 5,
    //   allowTypo: false,
    //   threshold: -10000,
    // });
  }

  // listenToSearchChanges() {
  //   this.searchResults$ = this.form.valueChanges.pipe(
  //     debounceTime(400),
  //     map(form => form.search),
  //     distinctUntilChanged(),
  //     map(searchWord => {
  //       let searchResults = this.fuzzySearch(searchWord).map(result => result.obj);
  //       //TODO: I dont really like this approach
  //       this.setLogoForEachResult(searchResults);
  //       return searchResults;
  //     })
  //   );
  // }

  ngOnDestroy(): void {
    this.subscriptions.dispose();
  }
}
