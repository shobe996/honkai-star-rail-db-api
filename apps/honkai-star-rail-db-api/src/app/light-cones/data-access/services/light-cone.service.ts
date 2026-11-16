import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LightCone, LightConeSearchCriteria, PaginatedResult, SortOptions } from 'honkai-star-rail-db/models';
import { lightConeFilters } from 'honkai-star-rail-db/filters';

/**
 * Service for managing light cones.
 */
@Service()
export class LightConeService {

  /**
   * Filters light cones based on the given criteria, pagination, and sorting options.
   * @param criteria The search criteria for filtering light cones.
   * @param page The page number for pagination.
   * @param size The number of items per page.
   * @param sort Optional sorting options.
   * @returns An observable of the paginated result of light cones.
   */
  filter(
    criteria: LightConeSearchCriteria,
    page: number,
    size: number,
    sort?: SortOptions<LightCone>
  ): Observable<PaginatedResult<LightCone>> {
    const lightCones = lightConeFilters.byAttributes(criteria, page, size, sort);
    return of(lightCones);
  }

  /**
   * Retrieves a light cone by its ID.
   * @param id The ID of the light cone.
   * @returns An observable of the light cone, or null if not found.
   */
  getById(id: number): Observable<LightCone | null> {
      const lightCone = lightConeFilters.byId(id);
      return of(lightCone);
    }
}
