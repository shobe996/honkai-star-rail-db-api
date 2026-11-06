import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { characterActions } from './character.actions';
import { CharacterService } from '../services/character.service';
import { map, switchMap } from 'rxjs';
import { Character } from 'honkai-star-rail-db/models';
import { PathService } from '../../../paths/data-access/services/path.service';
import { TypeService } from '../../../types/data-access/services/type.service';
import { RarityService } from '../../../rarities/data-access/services/rarity.service';
import { FactionService } from '../../../factions/data-access/services/faction.service';
import { generateSortOptions } from '../../../shared/utils/sort-options';

@Injectable()
export class CharacterEffects {
  private readonly actions$ = inject(Actions);
  private readonly characterService = inject(CharacterService);
  private readonly pathService = inject(PathService);
  private readonly typeService = inject(TypeService);
  private readonly rarityService = inject(RarityService);
  private readonly factionService = inject(FactionService);
  

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(characterActions.loadCharacters),
      switchMap(({ searchCriteria, page, size, by, direction }) => {
        const sortOptions =
          by && direction ? this.getCharacterSort(by, direction) : undefined;
        return this.characterService
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
    this.actions$.pipe(
      ofType(characterActions.loadPaths),
      switchMap(() =>
        this.pathService.getAll().pipe(
          map((paths) => characterActions.loadPathsSuccess({ paths })),
        ),
      ),
    ),
  );

  loadTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(characterActions.loadTypes),
      switchMap(() =>
        this.typeService.getAll().pipe(
          map((types) => characterActions.loadTypesSuccess({ types })),
        ),
      ),
    ),
  );

  loadRarities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(characterActions.loadRarities),
      switchMap(() =>
        this.rarityService.getAllCharacterRarities().pipe(
          map((rarities) => characterActions.loadRaritiesSuccess({ rarities })),
        ),
      ),
    ),
  );

  loadFactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(characterActions.loadFactions),
      switchMap(() =>
        this.factionService.getAll().pipe(
          map((factions) => characterActions.loadFactionsSuccess({ factions })),
        ),
      ),
    ),
  );

  getCharacterSort(sortBy: string, sortDirection: string) {
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
