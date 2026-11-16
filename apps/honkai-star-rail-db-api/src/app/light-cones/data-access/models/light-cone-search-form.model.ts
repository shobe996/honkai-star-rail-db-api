
/**
 * Interface representing the search form for light cones.
 */
export interface LightConeSearchForm {

  /**
   * The name of the light cone.
   */
  name: string;

  /**
   * The path of the light cone.
   */
  path: string;

  /**
   * The effect of the light cone.
   */
  effect: string;

  /**
   * The rarity of the light cone.
   */
  rarity: string;

  /**
   * The field to sort by.
   */
  sortBy: string;
  
  /**
   * The direction to sort by (e.g., ascending or descending).
   */
  sortDirection: string;
}
