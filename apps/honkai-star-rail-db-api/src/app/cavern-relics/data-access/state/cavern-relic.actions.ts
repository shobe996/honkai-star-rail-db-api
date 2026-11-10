import { createAction, props } from '@ngrx/store';
import {
  CavernRelic,
  CavernRelicSearchCriteria,
  PaginatedResult,
} from 'honkai-star-rail-db/models';

export const cavernRelicActions = {
  loadCavernRelics: createAction(
    '[Cavern Relic] Load Cavern Relics',
    props<{
      searchCriteria: CavernRelicSearchCriteria;
      page: number;
      size: number;
      by?: string;
      direction?: string;
    }>(),
  ),
  loadCavernRelicsSucess: createAction(
    '[Cavern Relic] Load Cavern Relics Success',
    props<{ cavernRelics: PaginatedResult<CavernRelic> }>(),
  ),
  loadCavernRelicDetails: createAction(
    '[Cavern Relic] Load Cavern Relic Details',
    props<{ cavernRelic: CavernRelic }>(),
  ),
};
