import { Route } from '@angular/router';

export const characterRoutes: Route[] = [
    {
    path: 'character',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('../feature/list').then((c) => c.ListComponent),
      },
    ],
  },
];
