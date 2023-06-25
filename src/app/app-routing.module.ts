import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { HomePageComponent } from './features/home/home-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  // {
  //   path: 'coins/:coin',
  //   component: CoinOverviewComponent
  // },
  {
    path: 'coins',
    loadChildren: () => import('./features/coin-overview/coin-overview.module').then(m => m.CoinOverviewModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
