import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CavernRelic, CavernRelicSearchCriteria, PaginatedResult, SortOptions } from 'honkai-star-rail-db/models';
import { cavernRelicFilters } from 'honkai-star-rail-db/filters';

/**
 * Service for managing cavern relics.
 */
@Service()
export class CavernRelicService {
  
  /**
   * Filters cavern relics based on the given criteria, pagination, and sorting options.
   * @param criteria The search criteria for filtering cavern relics.
   * @param page The current page number for pagination.
   * @param size The number of items per page for pagination.
   * @param sort Optional sorting options.
   * @returns An observable of the paginated result of cavern relics.
   */
    filter(
      criteria: CavernRelicSearchCriteria,
      page: number,
      size: number,
      sort?: SortOptions<CavernRelic>,
    ): Observable<PaginatedResult<CavernRelic>> {
     const cavernRelics = cavernRelicFilters.byAttributes(criteria, page, size, sort);
         return of(cavernRelics);
    }
  
    /**
     * Retrieves a cavern relic by its ID.
     * @param id The ID of the cavern relic.
     * @returns An observable of the cavern relic, or null if not found.
     */
    getById(id: number): Observable<CavernRelic | null> {
      const caverRelic = cavernRelicFilters.byId(id);
      return of(caverRelic);
    }
}
