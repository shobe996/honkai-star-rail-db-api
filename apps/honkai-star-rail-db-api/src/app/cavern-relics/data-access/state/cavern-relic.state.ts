import {
  CavernRelic,
  CavernRelicSearchCriteria,
  PaginatedResult,
} from 'honkai-star-rail-db/models';

/**
 * State interface for the cavern relic feature.
 */
export interface CavernRelicState {

  /**
   * Paginated list of cavern relics.
   */
  cavernRelics: PaginatedResult<CavernRelic>;

  /**
   * Search criteria for filtering cavern relics.
   */
  searchCriteria: CavernRelicSearchCriteria;

  /**
   * Currently selected cavern relic.
   */
  selectedCavernRelic: CavernRelic;

  /**
   * Current page number for pagination.
   */
  page: number;

  /**
   * Number of items per page for pagination.
   */
  size: number;

  /**
   * Field by which to sort cavern relics.
   */
  by?: string;

  /**
   * Direction of sorting (e.g., 'asc' or 'desc').
   */
  direction?: string;
}

/**
 * Initial state for the cavern relic feature.
 */
export const initialCavernRelicState: CavernRelicState = {
  cavernRelics: {} as PaginatedResult<CavernRelic>,
  searchCriteria: {} as CavernRelicSearchCriteria,
  selectedCavernRelic: {} as CavernRelic,
  page: 1,
  size: 9,
  by: undefined,
  direction: undefined,
};
