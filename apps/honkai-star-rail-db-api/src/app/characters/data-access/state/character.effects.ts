import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { characterActions } from './character.actions';
import { CharacterService } from '../services/character.service';
import { map, switchMap } from 'rxjs';
import { Character, SortOptions } from 'honkai-star-rail-db/models';

@Injectable()
export class CharacterEffects {
    private readonly actions$ = inject(Actions);
    private readonly characterService = inject(CharacterService);

    loadCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(characterActions.loadCharacters),
            switchMap(({ searchCriteria, page, size, by, direction }) => {
                const sortOptions =
                    by && direction ? this.generateSortOptions(by, direction) : undefined;
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
    private generateSortOptions(
        sortBy: string,
        sortDirection: string,
    ): SortOptions<Character> {
        const getter = this.sortMapping[sortBy];
        return {
            by: getter ?? ((c) => c.id),
            direction: sortDirection as 'asc' | 'desc',
        };
    }

    private sortMapping: Record<
        string,
        (c: Character) => number | string | Date
    > = {
            id: (c) => c.id,
            name: (c) => c.name,
            rarity: (c) => c.rarity.value,
            release_date: (c) => c.release_date,
            faction: (c) => c.faction.name,
            type: (c) => c.type.name,
            path: (c) => c.path.name,
        };
}
