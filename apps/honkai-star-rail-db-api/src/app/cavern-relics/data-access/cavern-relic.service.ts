import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CavernRelic, CavernRelicSearchCriteria, PaginatedResult, SortOptions } from 'honkai-star-rail-db/models';
import { cavernRelicFilters } from 'honkai-star-rail-db/filters';

@Service()
export class CavernRelicService {
  getAll(): Observable<PaginatedResult<CavernRelic>> {
      const cavernRelics = cavernRelicFilters.all();
      return of(cavernRelics);
    }
  
    getAllPaginated(
      page: number,
      size: number,
    ): Observable<PaginatedResult<CavernRelic>> {
      const cavernRelics = cavernRelicFilters.all(page, size);
      return of(cavernRelics);
    }
  
    filter(
      criteria: CavernRelicSearchCriteria,
      page: number,
      size: number,
      sort?: SortOptions<CavernRelic>,
    ): Observable<PaginatedResult<CavernRelic>> {
     const cavernRelics = cavernRelicFilters.byAttributes(criteria, page, size, sort);
         return of(cavernRelics);
    }
  
    getById(id: number): Observable<CavernRelic | null> {
      const caverRelic = cavernRelicFilters.byId(id);
      return of(caverRelic);
    }
}
