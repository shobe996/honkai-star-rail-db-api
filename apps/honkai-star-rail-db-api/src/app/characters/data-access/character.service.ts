import { Service } from '@angular/core';
import { Character, characterFilters } from 'honkai-star-rail-db';
import { SortOptions } from 'honkai-star-rail-db/dist/filters/base.filters';
import { CharacterSearchCriteria } from 'honkai-star-rail-db/dist/types/characters/character-criteria.types';
import { PaginatedResult } from 'honkai-star-rail-db/dist/types/pagination.types';
import { Observable, of } from 'rxjs';

@Service()
export class CharacterService {
  getAll(): Observable<PaginatedResult<Character>> {
    const characters = characterFilters.all();
    return of(characters);
  }

  getAllPaginated(
    page: number,
    size: number,
  ): Observable<PaginatedResult<Character>> {
    const characters = characterFilters.all(page, size);
    return of(characters);
  }

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
