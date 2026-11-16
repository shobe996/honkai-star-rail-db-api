import {
  LightCone,
  LightConeSearchCriteria,
  PaginatedResult,
  Path,
  Rarity,
} from 'honkai-star-rail-db/models';

/**
 * State interface for the light cone feature.
 */
export interface LightConeState {

  /**
   * Paginated list of light cones.
   */
  lightCones: PaginatedResult<LightCone>;

  /**
   * Search criteria for filtering light cones.
   */
  searchCriteria: LightConeSearchCriteria;

  /**
   * Currently selected light cone.
   */
  selectedLightCone: LightCone;

  /**
   * Current page number for pagination.
   */
  page: number;

  /**
   * Number of items per page for pagination.
   */
  size: number;

  /**
   * Field by which to sort light cones.
   */
  by?: string;

  /**
   * Direction of sorting (e.g., 'asc' or 'desc').
   */
  direction?: string;

  /**
   * List of light cone paths.
   */
  paths: Path[];
  
  /**
   * List of light cone rarities.
   */
  rarities: Rarity[];
}

/**
 * Initial state for the light cone feature.
 */
export const initialLightConeState: LightConeState = {
  lightCones: {} as PaginatedResult<LightCone>,
  paths: [],
  rarities: [],
  searchCriteria: {} as LightConeSearchCriteria,
  selectedLightCone: {} as LightCone,
  page: 1,
  size: 9,
  by: undefined,
  direction: undefined,
};
