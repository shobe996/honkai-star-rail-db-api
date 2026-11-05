import { createSelector } from '@ngrx/store';

import { createFeatureSelector } from '@ngrx/store';
import { CavernRelicState } from './cavern-relic.state';

const selectCavernRelicState =
  createFeatureSelector<CavernRelicState>('cavernRelics');

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
