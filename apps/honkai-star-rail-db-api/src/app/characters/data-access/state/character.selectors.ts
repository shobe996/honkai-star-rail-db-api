import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from './character.state';

export const selectCharacterState =
  createFeatureSelector<CharacterState>('characters');

export const selectCharacters = createSelector(
  selectCharacterState,
  (state) => state.characters
);

export const selectPage = createSelector(
  selectCharacterState,
  (state) => state.page
);

export const selectSize = createSelector(
  selectCharacterState,
  (state) => state.size
);

export const selectSearchCriteria = createSelector(
  selectCharacterState,
  (state) => state.searchCriteria
);