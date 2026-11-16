import { inject, Service } from '@angular/core';
import { LightCone, LightConeSearchCriteria } from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import { lightConeActions } from '../state/light-cone.actions';

/**
 * Facade service for managing light cone list operations.
 */
@Service()
export class LightConeListFacadeService {

  // Store instance for dispatching actions.
  private _store = inject(Store);

  /**
   * Filters light cones based on the given search criteria, pagination, and sorting options.
   * @param searchCriteria The search criteria for filtering light cones.
   * @param page The current page number for pagination.
   * @param size The number of items per page for pagination.
   * @param by Optional field by which to sort light cones.
   * @param direction Optional direction of sorting (e.g., 'asc' or 'desc').
   */
  filter(
    searchCriteria: LightConeSearchCriteria,
    page: number,
    size: number,
    by?: string,
    direction?: string,
  ): void {
    this._store.dispatch(lightConeActions.loadLightCones({ searchCriteria, page, size, by, direction  }));
  }

  /**
   * Loads the available light cone paths.
   */
  getPaths(): void {
    this._store.dispatch(lightConeActions.loadPaths());
  }
  
  /**
   * Loads the available light cone rarities.
   */
  getRarities(): void {
    this._store.dispatch(lightConeActions.loadRarities());
  }

  /**
   * Navigates to the details view of the specified light cone.
   * @param lightCone The light cone to view details for.
   */
  goToDetails(lightCone: LightCone): void {  
    this._store.dispatch(lightConeActions.loadLightConeDetails({ lightCone }));
  }

  /**
     * Updates the current page number for pagination.
     * @param page The new page number.
     */
    updatePage(page: number): void {
      this._store.dispatch(lightConeActions.updatePage({ page }));
    }
  
    /**
     * Updates the number of items per page for pagination.
     * @param size The new page size.
     */
    updateSize(size: number): void {
      this._store.dispatch(lightConeActions.updateSize({ size }));
    }
}
