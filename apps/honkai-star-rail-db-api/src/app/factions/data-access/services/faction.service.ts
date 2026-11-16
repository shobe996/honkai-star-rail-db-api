import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { factionFilters } from 'honkai-star-rail-db/filters';
import { Faction } from 'honkai-star-rail-db/models';

/**
 * Service for managing factions.
 */
@Service()
export class FactionService {
  /**
   * Retrieves all factions.
   * @returns An observable of an array of factions.
   */
  getAll(): Observable<Faction[]> {
    const factions = factionFilters.all();
    return of(factions);
  }
}
