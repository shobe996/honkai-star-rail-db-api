import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LightCone, LightConeSearchCriteria, PaginatedResult, SortOptions } from 'honkai-star-rail-db/models';
import { lightConeFilters } from 'honkai-star-rail-db/filters';

@Service()
export class LightConeService {

  filter(
    criteria: LightConeSearchCriteria,
    page: number,
    size: number,
    sort?: SortOptions<LightCone>
  ): Observable<PaginatedResult<LightCone>> {
    const lightCones = lightConeFilters.byAttributes(criteria, page, size, sort);
    return of(lightCones);
  }

  getById(id: number): Observable<LightCone | null> {
      const lightCone = lightConeFilters.byId(id);
      return of(lightCone);
    }
}
