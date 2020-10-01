import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinOverviewComponent } from './components/coin-overview/coin-overview.component';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { HomePageComponent } from './components/home-page/home-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'coins/:coin',
    component: CoinOverviewComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
