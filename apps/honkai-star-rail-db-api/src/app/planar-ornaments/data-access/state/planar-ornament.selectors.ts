import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanarOrnamentState } from './planar-ornament.state';

// Selector for the planar ornament feature state.
const selectPlanarOrnamentState =
  createFeatureSelector<PlanarOrnamentState>('planarOrnaments');

  /**
   * Selectors for the planar ornament feature state.
   */
export const planarOrnamentSelectors = {

  /**
   * Selector for retrieving the list of planar ornaments.
   */
  selectPlanarOrnaments: createSelector(
    selectPlanarOrnamentState,
    (state) => state.planarOrnaments,
  ),

  /**
   * Selector for retrieving the search criteria for planar ornaments.
   */
  selectSearchCriteria: createSelector(
    selectPlanarOrnamentState,
    (state) => state.searchCriteria,
  ),
  /**
   * Selector for retrieving the current page number for pagination.
   */
  selectPage: createSelector(selectPlanarOrnamentState, (state) => state.page),

  /**
   * Selector for retrieving the number of items per page for pagination.
   */
  selectSize: createSelector(selectPlanarOrnamentState, (state) => state.size),

  /**
   * Selector for retrieving the sort options for planar ornaments.
   */
  selectSortOptions: createSelector(selectPlanarOrnamentState, (state) => ({
    by: state.by,
    direction: state.direction,
  })),

  /**
   * Selector for retrieving the details of the selected planar ornament.
   */
  selectPlanarOrnament: createSelector(
    selectPlanarOrnamentState,
    (state) => state.selectedPlanarOrnament,
  ),
};
