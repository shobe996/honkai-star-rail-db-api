import { Route } from '@angular/router';

/**
 * Routes for the cavern relic feature.
 */
export const cavernRelicRoutes: Route[] = [
  {
    path: 'cavern-relic',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('../feature/list/list').then((c) => c.ListComponent),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('../feature/detail/detail').then((c) => c.DetailComponent),
      },
    ],
  },
];
