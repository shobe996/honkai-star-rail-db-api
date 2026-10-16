import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { characterActions } from "./character.actions";
import { CharacterService } from "../services/character.service";
import { map, switchMap } from "rxjs";

@Injectable()
export class CharacterEffects {
    private readonly actions$ = inject(Actions);
    private readonly characterService = inject(CharacterService);

    loadCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(characterActions.loadCharacters),
            switchMap(({ searchCriteria, page, size, sortOptions }) =>
                this.characterService.filter(searchCriteria, page, size, sortOptions).pipe(
                    map(characters => characterActions.loadCharactersSuccess({ characters }))
                )
            )
        )
    );
}