import { Routes } from '@angular/router';
import { CoinOverviewComponent } from './coin-overview.component';

const routes: Routes = [{ path: ':coin', component: CoinOverviewComponent }];

export default routes;
