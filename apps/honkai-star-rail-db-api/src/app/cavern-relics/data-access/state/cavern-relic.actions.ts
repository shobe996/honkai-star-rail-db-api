import { createAction, props } from '@ngrx/store';
import {
  CavernRelic,
  CavernRelicSearchCriteria,
  PaginatedResult,
} from 'honkai-star-rail-db/models';

/**
 * Actions for managing cavern relics state.
 */
export const cavernRelicActions = {

  /**
   * Loads cavern relics based on the given search criteria, pagination, and sorting options.
   * @prop searchCriteria The search criteria for filtering cavern relics.
   * @prop page The current page number for pagination.
   * @prop size The number of items per page for pagination.
   * @prop by Optional field by which to sort cavern relics.
   * @prop direction Optional direction of sorting (e.g., 'asc' or 'desc').
   */
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

  /**
   * Action dispatched when cavern relics are successfully loaded.
   * @prop cavernRelics The paginated result of cavern relics.
   */
  loadCavernRelicsSuccess: createAction(
    '[Cavern Relic] Load Cavern Relics Success',
    props<{ cavernRelics: PaginatedResult<CavernRelic> }>(),
  ),

  /**
   * Loads the details of a specific cavern relic.
   * @prop cavernRelic The cavern relic to load details for.
   */
  loadCavernRelicDetails: createAction(
    '[Cavern Relic] Load Cavern Relic Details',
    props<{ cavernRelic: CavernRelic }>(),
  ),

  /**
   * Updates the current page number for pagination.
   * @prop page The new page number.
   */
  updatePage: createAction(
    '[Cavern Relic] Update Page',
    props<{ page: number }>(),
  ),
  
  /**
   * Updates the number of items per page for pagination.
   * @prop size The new page size.
   */
  updateSize: createAction(
    '[Cavern Relic] Update Size',
    props<{ size: number }>(),
  ),
};
