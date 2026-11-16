import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Type } from 'honkai-star-rail-db/models';
import { typeFilters } from 'honkai-star-rail-db/filters';

/**
 * Service for managing types.
 */
@Service()
export class TypeService {
  /**
   * Retrieves all types.
   * @returns An observable of an array of types.
   */
  getAll(): Observable<Type[]> {
    const types = typeFilters.all();
    return of(types);
  }
}
