import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared.module';
import { CoinOverviewRoutingModule } from './coin-overview-routing.module';
import { CoinOverviewComponent } from './coin-overview.component';
// import { HIGHCHARTS_MODULES, ChartModule } from "angular-highcharts";
// import * as highstock from 'highcharts/modules/stock.src';

// export function highchartsModules() {
//   return [ highstock ];
// }

@NgModule({
  imports: [
    CommonModule,
    CoinOverviewRoutingModule,
    // ChartModule,
    SharedModule,
    NgApexchartsModule,
  ],
  exports: [CoinOverviewComponent],
  declarations: [CoinOverviewComponent],
  providers: [
    // { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
})
export class CoinOverviewModule {}
