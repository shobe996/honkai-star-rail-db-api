import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { characterActions } from './character.actions';
import { CharacterService } from '../services/character.service';
import { map, switchMap } from 'rxjs';
import { Character, SortOptions } from 'honkai-star-rail-db/models';
import { PathService } from '../../../paths/data-access/services/path.service';
import { TypeService } from '../../../types/data-access/services/type.service';
import { RarityService } from '../../../rarities/data-access/services/rarity.service';
import { FactionService } from '../../../factions/data-access/services/faction.service';
import { generateSortOptions } from '../../../shared/utils/sort-options';

/**
 * Effects class for handling character related actions.
 */
@Injectable()
export class CharacterEffects {

  // Injected actions stream
  private readonly _actions$ = inject(Actions);

  // Character service for making API calls related to characters`.
  private readonly _characterService = inject(CharacterService);

  // Path service for making API calls related to paths.
  private readonly _pathService = inject(PathService);

  // Type service for making API calls related to types.
  private readonly _typeService = inject(TypeService);

  // Rarity service for making API calls related to rarities.
  private readonly _rarityService = inject(RarityService);

  // Faction service for making API calls related to factions.
  private readonly _factionService = inject(FactionService);
  
  // Effect for loading characters based on search criteria and pagination.
  loadCharacters$ = createEffect(() =>
    this._actions$.pipe(
      ofType(characterActions.loadCharacters),
      switchMap(({ searchCriteria, page, size, by, direction }) => {
        const sortOptions =
          by && direction ? this._getCharacterSort(by, direction) : undefined;
        return this._characterService
          .filter(searchCriteria, page, size, sortOptions)
          .pipe(
            map((characters) =>
              characterActions.loadCharactersSuccess({ characters }),
            ),
          );
      }),
    ),
  );

  loadPaths$ = createEffect(() =>
    this._actions$.pipe(
      ofType(characterActions.loadPaths),
      switchMap(() =>
        this._pathService.getAll().pipe(
          map((paths) => characterActions.loadPathsSuccess({ paths })),
        ),
      ),
    ),
  );

  loadTypes$ = createEffect(() =>
    this._actions$.pipe(
      ofType(characterActions.loadTypes),
      switchMap(() =>
        this._typeService.getAll().pipe(
          map((types) => characterActions.loadTypesSuccess({ types })),
        ),
      ),
    ),
  );

  loadRarities$ = createEffect(() =>
    this._actions$.pipe(
      ofType(characterActions.loadRarities),
      switchMap(() =>
        this._rarityService.getAllCharacterRarities().pipe(
          map((rarities) => characterActions.loadRaritiesSuccess({ rarities })),
        ),
      ),
    ),
  );

  loadFactions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(characterActions.loadFactions),
      switchMap(() =>
        this._factionService.getAll().pipe(
          map((factions) => characterActions.loadFactionsSuccess({ factions })),
        ),
      ),
    ),
  );

  // Helper method to generate sort options for characters based on the provided criteria.
  private _getCharacterSort(sortBy: string, sortDirection: string): SortOptions<Character> {
    const characterMapping: Record<string, (c: Character) => number | string | Date> = {
      id: (c) => c.id,
      name: (c) => c.name,
      rarity: (c) => c.rarity.value,
      release_date: (c) => c.release_date,
      faction: (c) => c.faction.name,
      type: (c) => c.type.name,
      path: (c) => c.path.name,
    };

    return generateSortOptions<Character>(sortBy, sortDirection, characterMapping);
  }
}
