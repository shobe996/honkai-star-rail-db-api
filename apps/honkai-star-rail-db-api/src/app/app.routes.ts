import { Route } from '@angular/router';
import { characterRoutes } from './characters/data-access/character.routes';
import { lightConeRoutes } from './light-cones/data-access/light-cone.routes';

export const appRoutes: Route[] = [
    ...characterRoutes,
    ...lightConeRoutes
];
