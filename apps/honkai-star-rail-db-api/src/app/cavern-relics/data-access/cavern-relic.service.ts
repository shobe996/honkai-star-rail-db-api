import { Service } from '@angular/core';
import { CavernRelic, cavernRelicFilters } from 'honkai-star-rail-db';
import { SortOptions } from 'honkai-star-rail-db/dist/filters/base.filters';
import { CavernRelicSearchCriteria } from 'honkai-star-rail-db/dist/types/cavern-relics/cavern-relic-criteria.types';
import { PaginatedResult } from 'honkai-star-rail-db/dist/types/pagination.types';
import { Observable, of } from 'rxjs';

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
