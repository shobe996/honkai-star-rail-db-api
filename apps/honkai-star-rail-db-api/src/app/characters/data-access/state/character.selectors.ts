import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from './character.state';

// Selector for the character feature state.
const selectCharacterState =
  createFeatureSelector<CharacterState>('characters');

/*
  Selectors for the character feature state.
*/
export const characterSelectors = {
  /**
   * Selector for retrieving the list of characters.
   */
  selectCharacters: createSelector(
    selectCharacterState,
    (state) => state.characters,
  ),

  /**
   * Selector for retrieving the current page number for pagination.
   */
  selectPage: createSelector(selectCharacterState, (state) => state.page),

  /**
   * Selector for retrieving the number of items per page for pagination.
   */
  selectSize: createSelector(selectCharacterState, (state) => state.size),

  /**
   * Selector for retrieving the search criteria for characters.
   */
  selectSearchCriteria: createSelector(
    selectCharacterState,
    (state) => state.searchCriteria,
  ),

  /**
   * Selector for retrieving the sort options for characters.
   */
  selectSortOptions: createSelector(selectCharacterState, (state) => ({
    by: state.by,
    direction: state.direction,
  })),

  /**
   * Selector for retrieving the list of character paths.
   */
  selectPaths: createSelector(selectCharacterState, (state) => state.paths),

  /**
   * Selector for retrieving the list of character types.
   */
  selectTypes: createSelector(selectCharacterState, (state) => state.types),

  /**
   * Selector for retrieving the list of character rarities.
   */
  selectRarities: createSelector(
    selectCharacterState,
    (state) => state.rarities,
  ),

  /**
   * Selector for retrieving the list of character factions.
   */
  selectFactions: createSelector(
    selectCharacterState,
    (state) => state.factions,
  ),

  /**
   * Selector for retrieving the details of the selected character.
   */
  selectCharacter: createSelector(
    selectCharacterState,
    (state) => state.selectedCharacter,
  ),
};
