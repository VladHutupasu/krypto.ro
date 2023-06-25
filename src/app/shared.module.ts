import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TrendModule } from 'ngx-trend';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrendModule, // https://github.com/scttcper/ngx-trend
    TranslateModule,
  ],
  providers: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TrendModule, // https://github.com/scttcper/ngx-trend
    TranslateModule,
  ],
})
export class SharedModule {}
