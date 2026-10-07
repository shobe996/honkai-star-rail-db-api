import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LightCone, lightConeFilters } from 'honkai-star-rail-db';
import { LightConeSearchCriteria } from 'honkai-star-rail-db/dist/types/light-cones/light-cone-criteria.types';
import { PaginatedResult } from 'honkai-star-rail-db/dist/types/pagination.types';

@Service()
export class LightConeService {
  getAll(): Observable<PaginatedResult<LightCone>> {
    const lightCones = lightConeFilters.all();
    return of(lightCones);
  }

  getAllPaginated(
    page: number,
    size: number,
  ): Observable<PaginatedResult<LightCone>> {
    const lightCones = lightConeFilters.all(page, size);
    return of(lightCones);
  }

  filter(
    criteria: LightConeSearchCriteria,
    page: number,
    size: number,
  ): Observable<PaginatedResult<LightCone>> {
    const lightCones = lightConeFilters.byAttributes(criteria, page, size);
    return of(lightCones);
  }

  getById(id: number): Observable<LightCone | null> {
      const lightCone = lightConeFilters.byId(id);
      return of(lightCone);
    }
}
