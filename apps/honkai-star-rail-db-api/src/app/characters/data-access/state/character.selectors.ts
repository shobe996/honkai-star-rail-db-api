import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from './character.state';

const selectCharacterState =
  createFeatureSelector<CharacterState>('characters');

export const characterSelectors = {
  selectCharacters: createSelector(
    selectCharacterState,
    (state) => state.characters,
  ),

  selectPage: createSelector(selectCharacterState, (state) => state.page),

  selectSize: createSelector(selectCharacterState, (state) => state.size),

  selectSearchCriteria: createSelector(
    selectCharacterState,
    (state) => state.searchCriteria,
  ),

  selectSortOptions: createSelector(selectCharacterState, (state) => ({
    by: state.by,
    direction: state.direction,
  })),

  selectPaths: createSelector(selectCharacterState, (state) => state.paths),

  selectTypes: createSelector(selectCharacterState, (state) => state.types),

  selectRarities: createSelector(
    selectCharacterState,
    (state) => state.rarities,
  ),
  
  selectFactions: createSelector(
    selectCharacterState,
    (state) => state.factions,
  ),

  selectCharacter: createSelector(
    selectCharacterState,
    (state) => state.selectedCharacter,
  ),
};
