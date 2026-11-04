import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LightConeState } from './light-cone.state';

const selectLightConeState =
  createFeatureSelector<LightConeState>('lightCones');

export const lightConeSelectors = {
  selectLightCones: createSelector(
    selectLightConeState,
    (state) => state.lightCones,
  ),

  selectPage: createSelector(selectLightConeState, (state) => state.page),

  selectSize: createSelector(selectLightConeState, (state) => state.size),

  selectSearchCriteria: createSelector(
    selectLightConeState,
    (state) => state.searchCriteria,
  ),

  selectSortOptions: createSelector(selectLightConeState, (state) => ({
    by: state.by,
    direction: state.direction,
  })),

  selectPaths: createSelector(selectLightConeState, (state) => state.paths),

  selectRarities: createSelector(
    selectLightConeState,
    (state) => state.rarities,
  ),

  selectLightCone: createSelector(
    selectLightConeState,
    (state) => state.selectedLightCone,
  ),
};
