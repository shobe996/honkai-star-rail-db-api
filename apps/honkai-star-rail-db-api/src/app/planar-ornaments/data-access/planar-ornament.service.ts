import { Service } from '@angular/core';
import { planarOrnamentFilters } from 'honkai-star-rail-db/dist/filters';
import { PaginatedResult } from 'honkai-star-rail-db/dist/types/pagination.types';
import { Observable, of } from 'rxjs';
import { PlanarOrnamentSearchCriteria } from 'honkai-star-rail-db/dist/types/planar-ornaments/planar-ornament-criteria.types';
import { PlanarOrnament } from 'honkai-star-rail-db/dist/types';
import { SortOptions } from 'honkai-star-rail-db/dist/filters/base.filters';

@Service()
export class PlanarOrnamentService {
    getAll(): Observable<PaginatedResult<PlanarOrnament>> {
        const planarOrnaments = planarOrnamentFilters.all();
        return of(planarOrnaments);
    }

    getAllPaginated(
        page: number,
        size: number,
    ): Observable<PaginatedResult<PlanarOrnament>> {
        const planarOrnaments = planarOrnamentFilters.all(page, size);
        return of(planarOrnaments);
    }

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

    getById(id: number): Observable<PlanarOrnament | null> {
        const planarOrnament = planarOrnamentFilters.byId(id);
        return of(planarOrnament);
    }
}
