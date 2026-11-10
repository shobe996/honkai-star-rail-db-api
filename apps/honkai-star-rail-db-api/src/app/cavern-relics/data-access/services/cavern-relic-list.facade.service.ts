import { inject, Service } from '@angular/core';
import {
  CavernRelic,
  CavernRelicSearchCriteria,
} from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import { cavernRelicActions } from '../state/cavern-relic.actions';

/**
 * Facade service for managing cavern relic list operations.
 */
@Service()
export class CavernRelicListFacadeService {
  private _store = inject(Store);

  /**
   * Filters cavern relics based on the given search criteria, pagination, and sorting options.
   * @param searchCriteria The search criteria for filtering cavern relics.
   * @param page The current page number for pagination.
   * @param size The number of items per page for pagination.
   * @param by Optional field by which to sort cavern relics.
   * @param direction Optional direction of sorting (e.g., 'asc' or 'desc').
   */
  filter(
    searchCriteria: CavernRelicSearchCriteria,
    page: number,
    size: number,
    by?: string,
    direction?: string,
  ): void {
    this._store.dispatch(
      cavernRelicActions.loadCavernRelics({
        searchCriteria,
        page,
        size,
        by,
        direction,
      }),
    );
  }

  /**
   * Navigates to the details view of the specified cavern relic.
   * @param cavernRelic The cavern relic to view details for.
   */
  goToDetails(cavernRelic: CavernRelic): void {
    this._store.dispatch(
      cavernRelicActions.loadCavernRelicDetails({ cavernRelic }),
    );
  }

  /**
   * Updates the current page number for pagination.
   * @param page The new page number.
   */
  updatePage(page: number): void {
    this._store.dispatch(cavernRelicActions.updatePage({ page }));
  }

  /**
   * Updates the number of items per page for pagination.
   * @param size The new page size.
   */
  updateSize(size: number): void {
    this._store.dispatch(cavernRelicActions.updateSize({ size }));
  }
}
