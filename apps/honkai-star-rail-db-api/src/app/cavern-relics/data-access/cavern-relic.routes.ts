import { Route } from '@angular/router';

export const cavernRelicRoutes: Route[] = [
  {
    path: 'cavern-relic',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('../feature/list/list').then((c) => c.ListComponent),
      },
    ],
  },
];
