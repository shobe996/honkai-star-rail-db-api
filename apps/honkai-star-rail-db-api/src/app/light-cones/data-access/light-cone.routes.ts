import { Route } from '@angular/router';

export const lightConeRoutes: Route[] = [
    {
    path: 'light-cone',
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