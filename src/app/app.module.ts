import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TrendModule } from 'ngx-trend';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { CoinOverviewComponent } from './components/coin-overview/coin-overview.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { CryptoInfoBarComponent } from './components/crypto-info-bar/crypto-info-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from './material.module';
import { CategoryService, ChartModule, LineSeriesService, DateTimeService, TooltipService, ChartAnnotationService, ColumnSeriesService, LegendService, RangeColumnSeriesService, ScrollBarService, StackingColumnSeriesService, ZoomService } from '@syncfusion/ej2-angular-charts';
import { CurrencyPipe, DatePipe } from '@angular/common';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    // Syncfusion charts
    ChartModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MaterialModule,
    NgxSkeletonLoaderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    //Syncfusion charts
    // LineSeriesService,
    // CategoryService,
    // DateTimeService,
    // TooltipService
    
    CategoryService, 
    DateTimeService, 
    ScrollBarService,
    ZoomService, 
    LineSeriesService, 
    ColumnSeriesService,
    ChartAnnotationService, 
    RangeColumnSeriesService, 
    StackingColumnSeriesService, 
    LegendService, 
    TooltipService,
    CurrencyPipe,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
