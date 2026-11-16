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

  /**
   * Selector for retrieving the list of cavern relics.
   */
  selectCavernRelics: createSelector(
    selectCavernRelicState,
    (state) => state.cavernRelics,
  ),

  /**
   * Selector for retrieving the search criteria for cavern relics.
   */
  selectSearchCriteria: createSelector(
    selectCavernRelicState,
    (state) => state.searchCriteria,
  ),

  /**
   * Selector for retrieving the current page number for pagination.
   */
  selectPage: createSelector(selectCavernRelicState, (state) => state.page),

  /**
   * Selector for retrieving the number of items per page for pagination.
   */
  selectSize: createSelector(selectCavernRelicState, (state) => state.size),

  /**
   * Selector for retrieving the sort options for cavern relics.
   */
  selectSortOptions: createSelector(selectCavernRelicState, (state) => ({
    by: state.by,
    direction: state.direction,
  })),

  /**
   * Selector for retrieving the details of the selected cavern relic.
   */
  selectCavernRelic: createSelector(
    selectCavernRelicState,
    (state) => state.selectedCavernRelic,
  ),
};
