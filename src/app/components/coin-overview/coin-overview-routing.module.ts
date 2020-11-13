import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinOverviewComponent } from './coin-overview.component';

const routes: Routes = [
  { path: ':coin', component: CoinOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinOverviewRoutingModule { }