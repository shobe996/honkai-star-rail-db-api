/**
 * Interface representing the search form for planar ornaments.
 */
export interface PlanarOrnamentSearchForm {
  /**
   * The name of the planar ornament to search for.
   */
  name: string;

  /**
   * The effect of the planar ornament to search for.
   */
  effect: string;

  /**
   * The field to sort the search results by.
   */
  sortBy: string;
  
  /**
   * The direction to sort the search results (e.g., ascending or descending).
   */
  sortDirection: string;
}
