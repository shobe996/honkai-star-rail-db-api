import { Service, inject } from '@angular/core';
import {
  PlanarOrnamentSearchCriteria,
  PlanarOrnament,
} from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import { planarOrnamentActions } from '../state/planar-ornament.actions';

/**
 * Facade service for managing planar ornament list operations.
 */
@Service()
export class PlanarOrnamentListFacadeService {
  // Store instance for dispatching actions.
  private _store = inject(Store);

  /**
   * Filters planar ornaments based on the given search criteria, pagination, and sorting options.
   * @param searchCriteria The search criteria for filtering planar ornaments.
   * @param page The current page number for pagination.
   * @param size The number of items per page for pagination.
   * @param by Optional field by which to sort planar ornaments.
   * @param direction Optional direction of sorting (e.g., 'asc' or 'desc').
   */
  filter(
    searchCriteria: PlanarOrnamentSearchCriteria,
    page: number,
    size: number,
    by?: string,
    direction?: string,
  ): void {
    this._store.dispatch(
      planarOrnamentActions.loadPlanarOrnaments({
        searchCriteria,
        page,
        size,
        by,
        direction,
      }),
    );
  }

  /**
   * Navigates to the details view of the specified planar ornament.
   * @param selectedPlanarOrnament The planar ornament to view details for.
   */
  goToDetails(selectedPlanarOrnament: PlanarOrnament): void {
    this._store.dispatch(
      planarOrnamentActions.loadPlanarOrnamentDetails({
        selectedPlanarOrnament,
      }),
    );
  }

  /**
   * Updates the current page number for pagination.
   * @param page The new page number.
   */
  updatePage(page: number): void {
    this._store.dispatch(planarOrnamentActions.updatePage({ page }));
  }

  /**
   * Updates the number of items per page for pagination.
   * @param size The new page size.
   */
  updateSize(size: number): void {
    this._store.dispatch(planarOrnamentActions.updateSize({ size }));
  }
}
