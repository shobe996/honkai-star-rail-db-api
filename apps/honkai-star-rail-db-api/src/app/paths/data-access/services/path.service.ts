import { Service } from '@angular/core';
import { pathFilters } from 'honkai-star-rail-db/filters';
import { Path } from 'honkai-star-rail-db/models';
import { Observable, of } from 'rxjs';

/**
 * Service for managing paths.
 */
@Service()
export class PathService {
  /**
   * Retrieves all paths.
   * @returns An observable of an array of paths.
   */
  getAll(): Observable<Path[]> {
    const paths = pathFilters.all();
    return of(paths);
  }
}
