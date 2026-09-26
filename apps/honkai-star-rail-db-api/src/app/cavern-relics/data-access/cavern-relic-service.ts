import { Injectable } from '@angular/core';
import { CavernRelic, cavernRelicFilters } from 'honkai-star-rail-db';
import { PaginatedResult } from 'honkai-star-rail-db/dist/types/pagination.types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
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
  
    // filter(
    //   criteria: CharacterSearchCriteria,
    //   page: number,
    //   size: number,
    // ): Observable<PaginatedResult<Character>> {
    //   const characters = characterFilters.byAttributes(criteria, page, size);
    //   return of(characters);
    // }
  
    getById(id: number): Observable<CavernRelic | null> {
      const caverRelic = cavernRelicFilters.byId(id);
      return of(caverRelic);
    }
}
