import { Injectable } from '@angular/core';
import { Character, characterFilters } from 'honkai-star-rail-db';
import { PaginatedResult } from 'honkai-star-rail-db/dist/types/pagination.types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  
  getAll(): Observable<PaginatedResult<Character>> {
    const characters = characterFilters.all();
    return of(characters);
  }

  getAllPaginated(page: number, size: number): Observable<PaginatedResult<Character>> {
    const characters = characterFilters.all(page, size);
    return of(characters);
  }
}
