import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlanarOrnamentService } from '../services/planar-ornament.service';
import { PlanarOrnament, SortOptions } from 'honkai-star-rail-db/models';
import { switchMap, map } from 'rxjs/operators';
import { planarOrnamentActions } from './planar-ornament.actions';
import { generateSortOptions } from '../../../shared/utils/sort-options';

@Injectable()
export class PlanarOrnamentEffects {
  private readonly actions$ = inject(Actions);
  private planarOrnamentService = inject(PlanarOrnamentService);

  loadPlanarOrnaments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planarOrnamentActions.loadPlanarOrnaments),
      switchMap(({ searchCriteria, page, size, by, direction }) => {
        const sortOptions =
          by && direction ? this._getPlanarOrnamentSort(by, direction) : undefined;
        return this.planarOrnamentService
          .filter(searchCriteria, page, size, sortOptions)
          .pipe(
            map((planarOrnaments) =>
              planarOrnamentActions.loadPlanarOrnamentsSuccess({
                planarOrnaments,
              }),
            ),
          );
      }),
    ),
  );

  private _getPlanarOrnamentSort(sortBy: string, sortDirection: string) {
    const planarOrnamentSort: Record<
      string,
      (c: PlanarOrnament) => number | string
    > = {
      id: (c) => c.id,
      name: (c) => c.name,
      two_set_effect: (c) => c.two_set_effect,
    };

    return generateSortOptions<PlanarOrnament>(sortBy, sortDirection, planarOrnamentSort);
  }
}
