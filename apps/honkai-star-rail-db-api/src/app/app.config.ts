import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { planarOrnamentReducer } from './planar-ornaments/data-access/state/planar-ornament.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { characterReducer } from './characters/data-access/state/character.reducer';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CharacterEffects } from './characters/data-access/state/character.effects';
import { lightConeReducer } from './light-cones/data-access/state/light-cone.reducer';
import { LightConeEffects } from './light-cones/data-access/state/light-cone.effects';
import { cavernRelicReducer } from './cavern-relics/data-access/state/cavern-relic.reducer';
import { CavernRelicEffects } from './cavern-relics/data-access/state/cavern-relic.effects';
import { PlanarOrnamentEffects } from './planar-ornaments/data-access/state/planar-ornament.effects';

const store = {
  characters: characterReducer,
  lightCones: lightConeReducer,
  cavernRelics: cavernRelicReducer,
  planarOrnaments: planarOrnamentReducer,
};

const effects = [CharacterEffects, LightConeEffects, CavernRelicEffects, PlanarOrnamentEffects];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideStore(store),
    provideEffects(effects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
  ],
};
