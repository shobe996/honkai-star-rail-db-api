import { inject, Service } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character, CharacterSearchCriteria } from 'honkai-star-rail-db/models';
import { characterActions } from '../state/character.actions';

/**
 * Facade service for managing character list operations.
 */
@Service()
export class CharacterListFacadeService {
  
  // Store instance for dispatching actions.
  private _store = inject(Store);

  /**
   * Filters characters based on the given search criteria, pagination, and sorting options.
   * @param searchCriteria The search criteria for filtering characters.
   * @param page The current page number for pagination.
   * @param size The number of items per page for pagination.
   * @param by Optional field by which to sort characters.
   * @param direction Optional direction of sorting (e.g., 'asc' or 'desc').
   */
  filter(
    searchCriteria: CharacterSearchCriteria,
    page: number,
    size: number,
    by?: string,
    direction?: string,
  ): void {
    this._store.dispatch(
      characterActions.loadCharacters({
        searchCriteria,
        page,
        size,
        by,
        direction,
      }),
    );
  }

  /**
   * Loads the available character paths.
   */
  getPaths(): void {
    this._store.dispatch(characterActions.loadPaths());
  }

  /**
   * Loads the available character types.
   */
  getTypes(): void {
    this._store.dispatch(characterActions.loadTypes());
  }

  /**
   * Loads the available character rarities.
   */
  getRarities(): void {
    this._store.dispatch(characterActions.loadRarities());
  }

  /**
   * Loads the available character factions.
   */
  getFactions(): void {
    this._store.dispatch(characterActions.loadFactions());
  }

  /**
   * Navigates to the details view of the specified character.
   * @param character The character to view details for.
   */
  goToDetails(character: Character): void {
    this._store.dispatch(characterActions.loadCharacterDetails({ character }));
  }

  /**
   * Updates the current page number for pagination.
   * @param page The new page number.
   */
  updatePage(page: number): void {
    this._store.dispatch(characterActions.updatePage({ page }));
  }

  /**
   * Updates the number of items per page for pagination.
   * @param size The new page size.
   */
  updateSize(size: number): void {
    this._store.dispatch(characterActions.updateSize({ size }));
  }
}
