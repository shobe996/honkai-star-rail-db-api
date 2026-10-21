import { Service } from '@angular/core';
import { pathFilters } from 'honkai-star-rail-db/filters';
import { PaginatedResult, Path } from 'honkai-star-rail-db/models';
import { Observable, of } from 'rxjs';

@Service()
export class PathService {

    getAll(): Observable<PaginatedResult<Path>> {
        const paths = pathFilters.all();
        return of(paths);
      }
}
