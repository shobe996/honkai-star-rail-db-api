import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanarOrnamentState } from './planar-ornament.state';

const selectPlanarOrnamentState =
  createFeatureSelector<PlanarOrnamentState>('planarOrnaments');

export const planarOrnamentSelectors = {
  selectPlanarOrnaments: createSelector(
    selectPlanarOrnamentState,
    (state) => state.planarOrnaments,
  ),
  selectSearchCriteria: createSelector(
    selectPlanarOrnamentState,
    (state) => state.searchCriteria,
  ),
  selectPage: createSelector(selectPlanarOrnamentState, (state) => state.page),
  selectSize: createSelector(selectPlanarOrnamentState, (state) => state.size),
  selectSortOptions: createSelector(selectPlanarOrnamentState, (state) => ({
    by: state.by,
    direction: state.direction,
  })),
  selectPlanarOrnament: createSelector(
    selectPlanarOrnamentState,
    (state) => state.selectedPlanarOrnament,
  ),
};
