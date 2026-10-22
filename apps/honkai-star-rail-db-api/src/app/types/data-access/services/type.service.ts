import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Type } from 'honkai-star-rail-db/models';
import { typeFilters } from 'honkai-star-rail-db/filters';

@Service()
export class TypeService {
  getAll(): Observable<Type[]> {
    const types = typeFilters.all();
    return of(types);
  }
}
