import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlanarOrnamentService } from '../services/planar-ornament.service';
import { PlanarOrnament } from 'honkai-star-rail-db/models';
import { switchMap, map } from 'rxjs/operators';
import { planarOrnamentActions } from './planar-ornament.actions';
import { generateSortOptions } from '../../../shared/utils/sort-options';

/**
 * Effects class for handling planar ornament related actions.
 */
@Injectable()
export class PlanarOrnamentEffects {

  // Injected actions stream
  private readonly _actions$ = inject(Actions);

  // Planar ornament service for making API calls related to planar ornaments.
  private readonly _planarOrnamentService = inject(PlanarOrnamentService);

  loadPlanarOrnaments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(planarOrnamentActions.loadPlanarOrnaments),
      switchMap(({ searchCriteria, page, size, by, direction }) => {
        const sortOptions =
          by && direction ? this._getPlanarOrnamentSort(by, direction) : undefined;
        return this._planarOrnamentService
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

  // Helper method to generate sort options for planar ornaments based on the provided criteria.
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
