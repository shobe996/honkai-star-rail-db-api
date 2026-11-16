import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaginatedResult, PlanarOrnament, PlanarOrnamentSearchCriteria, SortOptions } from 'honkai-star-rail-db/models';
import { planarOrnamentFilters } from 'honkai-star-rail-db/filters';

/**
 * Service for managing planar ornaments.
 */
@Service()
export class PlanarOrnamentService {

    /**
   * Filters planar ornaments based on the given criteria, pagination, and sorting options.
   * @param criteria The search criteria for filtering planar ornaments.
   * @param page The current page number for pagination.
   * @param size The number of items per page for pagination.
   * @param sort Optional sorting options.
   * @returns An observable of the paginated result of planar ornaments.
   */
    filter(
        criteria: PlanarOrnamentSearchCriteria,
        page: number,
        size: number,
        sort?: SortOptions<PlanarOrnament>,
    ): Observable<PaginatedResult<PlanarOrnament>> {
        const planarOrnaments = planarOrnamentFilters.byAttributes(
            criteria,
            page,
            size,
            sort,
        );
        return of(planarOrnaments);
    }

     /**
     * Retrieves a planar ornament by its ID.
     * @param id The ID of the planar ornament.
     * @returns An observable of the planar ornament, or null if not found.
     */
    getById(id: number): Observable<PlanarOrnament | null> {
        const planarOrnament = planarOrnamentFilters.byId(id);
        return of(planarOrnament);
    }
}
