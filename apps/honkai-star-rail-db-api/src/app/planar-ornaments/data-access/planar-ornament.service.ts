import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaginatedResult, PlanarOrnament, PlanarOrnamentSearchCriteria, SortOptions } from 'honkai-star-rail-db/models';
import { planarOrnamentFilters } from 'honkai-star-rail-db/filters';

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
