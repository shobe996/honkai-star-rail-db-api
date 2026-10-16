import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { characterReducer } from './characters/data-access/state/character.reducer';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CharacterEffects } from './characters/data-access/state/character.effects';

const store = {
  characters: characterReducer,
};

const effects = [CharacterEffects];

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
