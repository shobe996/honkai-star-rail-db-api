import { createAction, props } from '@ngrx/store';
import {
  LightConeSearchCriteria,
  PaginatedResult,
  LightCone,
  Path,
  Rarity,
} from 'honkai-star-rail-db/models';

/**
 * Actions for managing light cone state.
 */
export const lightConeActions = {

  /**
   * Loads light cones based on the given search criteria, pagination, and sorting options.
   * @prop searchCriteria The search criteria for filtering light cones.
   * @prop page The current page number for pagination.
   * @prop size The number of items per page for pagination.
   * @prop by Optional field by which to sort light cones.
   * @prop direction Optional direction of sorting (e.g., 'asc' or 'desc').
   */
  loadLightCones: createAction(
    '[LightCone] Load LightCones',
    props<{ searchCriteria: LightConeSearchCriteria, page: number, size: number, by?: string, direction?:  string }>(),
  ),

  /**
   * Action dispatched when light cones are successfully loaded.
   * @prop lightCones The paginated result of light cones.
   */
  loadLightConesSuccess: createAction(
    '[LightCone] Load LightCones Success',
    props<{ lightCones: PaginatedResult<LightCone> }>(),
  ),
  
  /**
   * Loads all available paths for light cones.
   */
  loadPaths: createAction(
    '[LightCone] Load Paths',
  ),

  /**
   * Loads all available paths for light cones.
   * @prop paths The available paths for light cones.
   */
  loadPathsSuccess: createAction(
    '[LightCone] Load Paths Success',
    props<{ paths: Path[] }>(),
  ),

  /**
   * Loads all available rarities for light cones.
   */
  loadRarities: createAction(
    '[LightCone] Load Rarities',
  ),

  /**
   * Loads all available rarities for light cones.
   * @prop rarities The available rarities for light cones.
   */
  loadRaritiesSuccess: createAction(
    '[LightCone] Load Rarities Success',
    props<{ rarities: Rarity[] }>(),
  ), 

  /**
   * Loads the details of a specific light cone.
   * @prop lightCone The light cone to load details for.
   */
  loadLightConeDetails: createAction(
    '[LightCone] Load LightCone Details',
    props<{ lightCone: LightCone }>(),
  ),

  /**
   * Updates the current page number for pagination.
   * @prop page The new page number.
   */
  updatePage: createAction(
    '[LightCone] Update Page',
    props<{ page: number }>(),
  ),
  
  /**
   * Updates the number of items per page for pagination.
   * @prop size The new page size.
   */
  updateSize: createAction(
    '[LightCone] Update Size',
    props<{ size: number }>(),
  ),
};
