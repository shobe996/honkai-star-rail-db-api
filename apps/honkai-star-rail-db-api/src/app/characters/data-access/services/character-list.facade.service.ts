import { inject, Service } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character, CharacterSearchCriteria } from 'honkai-star-rail-db/models';
import { characterActions } from '../state/character.actions';
@Service()
export class CharacterListFacadeService {
  private _store = inject(Store);

  filter(
    searchCriteria: CharacterSearchCriteria,
    page: number,
    size: number,
    by?: string,
    direction?: string,
  ): void {
    this._store.dispatch(characterActions.loadCharacters({ searchCriteria, page, size, by, direction  }));
  }

  getPaths(): void {
    this._store.dispatch(characterActions.loadPaths());
  }

  getTypes(): void {
    this._store.dispatch(characterActions.loadTypes());
  }

  getRarities(): void {
    this._store.dispatch(characterActions.loadRarities());
  }

  getFactions(): void {
    this._store.dispatch(characterActions.loadFactions());
  }

  goToDetails(character: Character): void {  
    this._store.dispatch(characterActions.loadCharacterDetails({ character }));
  }
}
