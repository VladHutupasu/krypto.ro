import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { CoinDescription } from 'src/app/_models/coin-description';
import { Language } from 'src/app/_models/language';
import { CryptoApiService } from 'src/app/_services/crypto-api.service';
import { go } from 'fuzzysort';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {

  selectedLanguage: Language;
  showSearchBox : boolean = false;
  languages: Language[] = [
    {
      id: 'en',
      name: 'English',
      flag: 'en20.png'
    },
    {
      id: 'ro',
      name: 'Română',
      flag: 'ro20.png'
    }
  ];
  form: FormGroup;
  searchResults$: Observable<CoinDescription[]>;
  allCoins: CoinDescription[] = [];


  constructor(private translate: TranslateService,
    private formBuilder: FormBuilder,
    private cryptoAPI: CryptoApiService) { }

  ngOnInit(): void {
    this.initializeSearchForm();
    this.listenToSearchChanges();
    this.fetchCoinsList();
  }


  fetchCoinsList() {
    this.cryptoAPI.getCoinsList().pipe(
      tap(coins => {
        console.log("Coins list - ", coins);
        this.allCoins = coins;
      })).toPromise();
  }

  setLanguage(lang: Language): void {
    this.selectedLanguage = lang;
    this.translate.use(lang.id);
  }

  initializeSearchForm() {
    this.form = this.formBuilder.group({
      search: ['']
    });
  }

  setLogoForEachResult(searchResults: CoinDescription[]) {
    this.cryptoAPI.getMultiInfoCoin(searchResults.map(coin => coin.id)).subscribe(response => {
      response.forEach(info => {
        searchResults.find(element => element.id === info.id).image = info.image;
      });
    });
  }

  fuzzySearch(searchWord: string) {
    return go(searchWord, this.allCoins, {
      keys: ['symbol', 'name'],
      limit: 5,
      allowTypo: false,
      threshold: -10000,
    })
  }

  listenToSearchChanges() {
    this.searchResults$ = this.form.valueChanges.pipe(
      debounceTime(400),
      map(form => form.search),
      distinctUntilChanged(),
      map(searchWord => {
        let searchResults = this.fuzzySearch(searchWord).map(result => result.obj);
        //TODO: I dont really like this approach
        this.setLogoForEachResult(searchResults);
        return searchResults;
      })
    );
  }
}
