import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToolbarComponent } from "./layout/toolbar/toolbar.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { CoinsTableComponent } from "./components/coins-table/coins-table.component";
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CryptoInfoBarComponent } from "./components/crypto-info-bar/crypto-info-bar.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { AbsolutePipe } from "./_helpers/absolute-number.pipe";
import { HIGHCHARTS_MODULES } from "angular-highcharts";
import stock from "highcharts/modules/stock.src";
import more from "highcharts/highcharts-more.src";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NumberSuffixPipe } from "./_helpers/number-suffix.pipe";
import { SharedModule } from "./shared.module";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function highchartsModules() {
  return [stock, more];
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
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
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    SharedModule,
  ],
  providers: [
    CurrencyPipe,
    DatePipe,
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang("ro");
  }
}
