import { createReducer, on } from '@ngrx/store';

import { initialCavernRelicState } from './cavern-relic.state';

import { cavernRelicActions } from './cavern-relic.actions';

export const cavernRelicReducer = createReducer(
  initialCavernRelicState,
  on(
    cavernRelicActions.loadCavernRelics,
    (state, { searchCriteria, page, size, by, direction }) => ({
      ...state,
      searchCriteria,
      page,
      size,
      by,
      direction,
    }),
  ),
  on(
    cavernRelicActions.loadCavernRelicsSucess,
    (state, { cavernRelics }) => ({
      ...state,
      cavernRelics,
    }),
  ),
  on(
    cavernRelicActions.loadCavernRelicDetails,
    (state, { cavernRelic }) => ({
      ...state,
      selectedCavernRelic: cavernRelic,
    }),
  )
);
