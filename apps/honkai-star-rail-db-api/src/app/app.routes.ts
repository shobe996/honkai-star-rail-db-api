import { Route } from '@angular/router';
import { characterRoutes } from './characters/data-access/character.routes';
import { lightConeRoutes } from './light-cones/data-access/light-cone.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/feature/home').then((c) => c.HomeComponent),
  },
  ...characterRoutes,
  ...lightConeRoutes,
];
