import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoinOverviewComponent } from "./components/coin-overview/coin-overview.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePageComponent,
  },
  // {
  //   path: 'coins/:coin',
  //   component: CoinOverviewComponent
  // },
  {
    path: "coins",
    loadChildren: () => import('./components/coin-overview/coin-overview.module').then(m => m.CoinOverviewModule)
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
