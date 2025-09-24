import { Routes } from '@angular/router';
import {Dashboard} from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component:Dashboard,
  },
  {
    path: 'settings',
    loadComponent: ()=> import('./pages/settings/settings').then((m) => m.Settings),
  }
];
