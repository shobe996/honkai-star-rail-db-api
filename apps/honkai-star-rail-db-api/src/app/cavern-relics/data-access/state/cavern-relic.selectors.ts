import { createSelector } from '@ngrx/store';

import { createFeatureSelector } from '@ngrx/store';
import { CavernRelicState } from './cavern-relic.state';

// Selector for the cavern relic feature state.
const selectCavernRelicState =
  createFeatureSelector<CavernRelicState>('cavernRelics');

/*
  Selectors for the cavern relic feature state.
*/
export const cavernRelicSelectors = {
  selectCavernRelics: createSelector(
    selectCavernRelicState,
    (state) => state.cavernRelics,
  ),

  selectSearchCriteria: createSelector(
    selectCavernRelicState,
    (state) => state.searchCriteria,
  ),

  selectPage: createSelector(selectCavernRelicState, (state) => state.page),

  selectSize: createSelector(selectCavernRelicState, (state) => state.size),

  selectSortOptions: createSelector(selectCavernRelicState, (state) => ({
    by: state.by,
    direction: state.direction,
  })),

  selectCavernRelic: createSelector(
    selectCavernRelicState,
    (state) => state.selectedCavernRelic,
  ),
};
