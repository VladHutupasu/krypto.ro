import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./features/home/home.routes'),
  },
  {
    path: 'coins',
    loadChildren: () => import('./features/coin-overview/coin-overview.routes'),
  },
  { path: '**', loadComponent: () => import('@core/components/page-not-found/page-not-found.component') },
];
