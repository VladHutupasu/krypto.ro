import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoinOverviewComponent } from "./coin-overview.component";
import { CoinOverviewRoutingModule } from "./coin-overview-routing.module";
import { SharedModule } from "src/app/shared.module";
import { HIGHCHARTS_MODULES, ChartModule } from "angular-highcharts";
import * as highstock from 'highcharts/modules/stock.src';

export function highchartsModules() {
  return [ highstock ];
}

@NgModule({
  imports: [CommonModule, CoinOverviewRoutingModule, ChartModule, SharedModule],
  exports: [CoinOverviewComponent],
  declarations: [CoinOverviewComponent],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ],
})
export class CoinOverviewModule {}
