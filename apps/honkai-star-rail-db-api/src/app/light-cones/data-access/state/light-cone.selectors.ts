import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LightConeState } from './light-cone.state';

// Selector for the light cone feature state.
const selectLightConeState =
  createFeatureSelector<LightConeState>('lightCones');

/*
  Selectors for the light cone feature state.
*/
export const lightConeSelectors = {
  selectLightCones: createSelector(
    selectLightConeState,
    (state) => state.lightCones,
  ),

  /**
   * Selector for retrieving the current page number for pagination.
   */
  selectPage: createSelector(selectLightConeState, (state) => state.page),

  /**
   * Selector for retrieving the current page size for pagination.
   */
  selectSize: createSelector(selectLightConeState, (state) => state.size),

  /**
   * Selector for retrieving the current search criteria for filtering light cones.
   */
  selectSearchCriteria: createSelector(
    selectLightConeState,
    (state) => state.searchCriteria,
  ),

   /**
   * Selector for retrieving the sort options for light cones.
   */
  selectSortOptions: createSelector(selectLightConeState, (state) => ({
    by: state.by,
    direction: state.direction,
  })),

   /**
   * Selector for retrieving the list of light cone paths.
   */
  selectPaths: createSelector(selectLightConeState, (state) => state.paths),

  /**
   * Selector for retrieving the list of light cone rarities.
   */
  selectRarities: createSelector(
    selectLightConeState,
    (state) => state.rarities,
  ),

  /**
   * Selector for retrieving the currently selected light cone.
   */
  selectLightCone: createSelector(
    selectLightConeState,
    (state) => state.selectedLightCone,
  ),
};
