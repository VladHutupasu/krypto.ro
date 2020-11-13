import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { ChartModule } from "angular-highcharts";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { TrendModule } from "ngx-trend";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TrendModule, // https://github.com/scttcper/ngx-trend
    ChartModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    TranslateModule
  ],
  providers: [],
  exports: [
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TrendModule, // https://github.com/scttcper/ngx-trend
    ChartModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    TranslateModule
  ]
})
export class SharedModule {}
