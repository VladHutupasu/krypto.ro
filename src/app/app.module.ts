import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TrendModule } from 'ngx-trend';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { CoinOverviewComponent } from './components/coin-overview/coin-overview.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatMenuModule } from '@angular/material/menu';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import { ReactiveFormsModule } from '@angular/forms';
import { CryptoInfoBarComponent } from './components/crypto-info-bar/crypto-info-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDividerModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatCardModule
]
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CoinsTableComponent,
    CoinOverviewComponent,
    CryptoInfoBarComponent,
    FooterComponent,
    HomePageComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    TrendModule, // https://github.com/scttcper/ngx-trend
    ChartModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    materialModules,
    NgxSkeletonLoaderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
