import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoinOverviewComponent } from "./coin-overview.component";
import { CoinOverviewRoutingModule } from "./coin-overview-routing.module";
import { HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { createTranslateLoader } from "src/app/app.module";
import { SharedModule } from "src/app/shared.module";

@NgModule({
  imports: [CommonModule, CoinOverviewRoutingModule, SharedModule],
  exports: [CoinOverviewComponent],
  declarations: [CoinOverviewComponent],
  providers: [],
})
export class CoinOverviewModule {}
