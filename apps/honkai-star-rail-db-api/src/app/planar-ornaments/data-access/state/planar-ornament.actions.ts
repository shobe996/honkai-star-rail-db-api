import { createAction, props } from '@ngrx/store';
import {
  PaginatedResult,
  PlanarOrnament,
  PlanarOrnamentSearchCriteria,
} from 'honkai-star-rail-db/models';

/**
 * Actions for managing planar ornaments state.
 */
export const planarOrnamentActions = {
  
  /**
   * Loads planar ornaments based on the given search criteria, pagination, and sorting options.
   * @prop searchCriteria The search criteria for filtering planar ornaments.
   * @prop page The current page number for pagination.
   * @prop size The number of items per page for pagination.
   * @prop by Optional field by which to sort planar ornaments.
   * @prop direction Optional direction of sorting (e.g., 'asc' or 'desc').
   */
  loadPlanarOrnaments: createAction(
    '[Planar Ornament] Load Planar Ornaments',
    props<{
      searchCriteria: PlanarOrnamentSearchCriteria;
      page: number;
      size: number;
      by?: string;
      direction?: string;
    }>(),
  ),

   /**
   * Action dispatched when planar ornaments are successfully loaded.
   * @prop planarOrnaments The paginated result of planar ornaments.
   */
  loadPlanarOrnamentsSuccess: createAction(
    '[Planar Ornament] Load Planar Ornaments Success',
    props<{ planarOrnaments: PaginatedResult<PlanarOrnament> }>(),
  ),

   /**
   * Loads the details of a specific planar ornament.
   * @prop selectedPlanarOrnament The planar ornament to load details for.
   */
  loadPlanarOrnamentDetails: createAction(
    '[Planar Ornament] Load Planar Ornament Details',
    props<{ selectedPlanarOrnament: PlanarOrnament }>(),
  ),

   /**
   * Updates the current page number for pagination.
   * @prop page The new page number.
   */
  updatePage: createAction(
    '[Planar Ornament] Update Page',
    props<{ page: number }>(),
  ),
  
  /**
   * Updates the number of items per page for pagination.
   * @prop size The new page size.
   */
  updateSize: createAction(
    '[Planar Ornament] Update Size',
    props<{ size: number }>(),
  ),
};
