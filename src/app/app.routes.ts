import { Routes } from '@angular/router';
import {Dashboard} from './pages/dashboard/dashboard';
import {MainLayout} from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Dashboard,
      },
      {
        path: 'tracker',
        loadComponent: ()=> import('./pages/tracker/tracker').then((m) =>m.Tracker),
      },
      {
        path: 'food',
        loadComponent: ()=> import('./pages/food/food').then((m) =>m.Food),
      },
      {
        path: 'places',
        loadComponent: ()=> import('./pages/places/places').then((m) =>m.Places),
      },
      {
        path: 'settings',
        loadComponent: ()=> import('./pages/settings/settings').then((m) => m.Settings),
      }
    ]
  },
];
