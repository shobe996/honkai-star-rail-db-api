import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { factionFilters } from 'honkai-star-rail-db/filters';
import { Faction } from 'honkai-star-rail-db/models';

@Service()
export class FactionService {

    getAll(): Observable<Faction[]> {
        const factions = factionFilters.all();
        return of(factions);
      }
}
