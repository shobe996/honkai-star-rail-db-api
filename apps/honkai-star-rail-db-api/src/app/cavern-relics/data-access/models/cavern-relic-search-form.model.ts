
/**
 * Interface representing the search form for cavern relics.
 */
export interface CavernRelicSearchForm {

  /**
   * Name of the cavern relic to search for.
   */
  name: string;
  
  /**
   * Effect of the cavern relic to search for.
   */
  effect: string;

  /**
   * Field to sort the cavern relics by.
   */
  sortBy: string;

  /**
   * Direction to sort the cavern relics (e.g., ascending or descending).
   */
  sortDirection: string;
}
