import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from '@core/components/footer/footer.component';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { AbsolutePipe } from '@core/pipes/absolute-number.pipe';
import { NumberSuffixPipe } from '@core/pipes/number-suffix.pipe';
import { CoinsTableComponent } from './features/home/components/coins-table/coins-table.component';
import { CryptoInfoBarComponent } from './features/home/components/crypto-info-bar/crypto-info-bar.component';
import { HomePageComponent } from './features/home/home-page.component';
import { SharedModule } from './shared.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CoinsTableComponent,
    CryptoInfoBarComponent,
    FooterComponent,
    HomePageComponent,
    AbsolutePipe,
    NumberSuffixPipe,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [CurrencyPipe, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    //TODO: check browser language
    translate.setDefaultLang('en');
  }
}
