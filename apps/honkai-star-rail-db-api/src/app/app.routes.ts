import { Route } from '@angular/router';
import { characterRoutes } from './characters/data-access/character.routes';

export const appRoutes: Route[] = [
    ...characterRoutes
];
