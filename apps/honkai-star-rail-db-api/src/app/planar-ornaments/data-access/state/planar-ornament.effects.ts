import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PlanarOrnamentService } from "../services/planar-ornament.service";
import { PlanarOrnament, SortOptions } from "honkai-star-rail-db/models";
import { switchMap, map } from "rxjs/operators";
import { planarOrnamentActions } from "./planar-ornament.actions";

@Injectable()
export class PlanarOrnamentEffects {
     private readonly actions$ = inject(Actions);
     private planarOrnamentService = inject(PlanarOrnamentService);

     loadPlanarOrnaments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planarOrnamentActions.loadPlanarOrnaments),
      switchMap(({ searchCriteria, page, size, by, direction }) => {
        const sortOptions =
          by && direction ? this.generateSortOptions(by, direction) : undefined;
        return this.planarOrnamentService
          .filter(searchCriteria, page, size, sortOptions)
          .pipe(
            map((planarOrnaments) =>
              planarOrnamentActions.loadPlanarOrnamentsSuccess({ planarOrnaments }),
            ),
          );
      }),
    ),
  );

  private generateSortOptions(
    sortBy: string,
    sortDirection: string,
  ): SortOptions<PlanarOrnament> {
    const getter = this.sortMapping[sortBy];
    return {
      by: getter ?? ((c) => c.id),
      direction: sortDirection as 'asc' | 'desc',
    };
  }

  private sortMapping: Record<string, (c: PlanarOrnament) => number | string> = {
    id: (c) => c.id,
    name: (c) => c.name,
    two_set_effect: (c) => c.two_set_effect,
  };
};