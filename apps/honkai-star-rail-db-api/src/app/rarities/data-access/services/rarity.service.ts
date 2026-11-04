import { Service } from '@angular/core';
import { characterRarityFilters, lightConeRarityFilters } from 'honkai-star-rail-db/filters';
import { Rarity } from 'honkai-star-rail-db/models';
import { Observable, of } from 'rxjs';

@Service()
export class RarityService {
  getAllCharacterRarities(): Observable<Rarity[]> {
    const rarities = characterRarityFilters.all();
    return of(rarities);
  }

  getAllLightConeRarities(): Observable<Rarity[]> {
    const rarities = lightConeRarityFilters.all();
    return of(rarities);
  }
}
