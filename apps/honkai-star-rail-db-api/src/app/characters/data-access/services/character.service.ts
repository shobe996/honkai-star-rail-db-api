import { Service } from '@angular/core';
import { characterFilters } from 'honkai-star-rail-db/filters';
import {
  Character,
  CharacterSearchCriteria,
  PaginatedResult,
  SortOptions,
} from 'honkai-star-rail-db/models';
import { Observable, of } from 'rxjs';

/**
 * Service for managing characters.
 */
@Service()
export class CharacterService {
  /**
   * Filters characters based on the given criteria, pagination, and sorting options.
   * @param criteria The search criteria for filtering characters.
   * @param page The current page number for pagination.
   * @param size The number of items per page for pagination.
   * @param sort Optional sorting options.
   * @returns An observable of the paginated result of characters.
   */
  filter(
    criteria: CharacterSearchCriteria,
    page: number,
    size: number,
    sortOptions?: SortOptions<Character>,
  ): Observable<PaginatedResult<Character>> {
    const characters = characterFilters.byAttributes(
      criteria,
      page,
      size,
      sortOptions,
    );
    return of(characters);
  }

  /**
   * Retrieves a character by its ID.
   * @param id The ID of the character.
   * @returns An observable of the character, or null if not found.
   */
  getById(id: number): Observable<Character | null> {
    const character = characterFilters.byId(id);
    return of(character);
  }
}
