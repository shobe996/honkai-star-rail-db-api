import { Route } from '@angular/router';

/**
 * Routes for the character feature.
 */
export const characterRoutes: Route[] = [
  {
    path: 'character',
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
