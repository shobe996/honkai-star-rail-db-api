import { Service } from '@angular/core';
import { characterFilters } from 'honkai-star-rail-db/filters';
import { Character, CharacterSearchCriteria, PaginatedResult, SortOptions } from 'honkai-star-rail-db/models';
import { Observable, of } from 'rxjs';

@Service()
export class CharacterService {

  filter(
    criteria: CharacterSearchCriteria,
    page: number,
    size: number,
    sortOptions?: SortOptions<Character>
  ): Observable<PaginatedResult<Character>> {
    const characters = characterFilters.byAttributes(criteria, page, size, sortOptions);
    return of(characters);
  }

  getById(id: number): Observable<Character | null> {
    const character = characterFilters.byId(id);
    return of(character);
  }
}
