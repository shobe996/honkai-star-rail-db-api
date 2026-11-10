import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { CavernRelicService } from '../services/cavern-relic.service';
import { cavernRelicActions } from './cavern-relic.actions';
import { map, switchMap } from 'rxjs';
import { CavernRelic, SortOptions } from 'honkai-star-rail-db/models';
import { generateSortOptions } from '../../../shared/utils/sort-options';

/**
 * Effects class for handling cavern relic related actions.
 */
@Injectable()
export class CavernRelicEffects {

  // Injected actions stream
  private readonly _actions$ = inject(Actions);

  // Cavern relic service for making API calls related to cavern relics.
  private readonly _cavernRelicService = inject(CavernRelicService);

  // Effect for loading cavern relics based on search criteria and pagination.
  loadCavernRelics$ = createEffect(() =>
    this._actions$.pipe(
      ofType(cavernRelicActions.loadCavernRelics),
      switchMap(({ searchCriteria, page, size, by, direction }) => {
        const sortOptions =
          by && direction ? this._getCavernRelicSort(by, direction) : undefined;
        return this._cavernRelicService
          .filter(searchCriteria, page, size, sortOptions)
          .pipe(
            map((cavernRelics) =>
              cavernRelicActions.loadCavernRelicsSuccess({ cavernRelics }),
            ),
          );
      }),
    ),
  );

  // Helper method to generate sort options for cavern relics based on the provided criteria.
  private _getCavernRelicSort(
    by: string,
    direction: string,
  ): SortOptions<CavernRelic> {
    const cavernRelicMapping: Record<
      string,
      (c: CavernRelic) => number | string
    > = {
      id: (c) => c.id,
      name: (c) => c.name,
      two_set_effect: (c) => c.two_set_effect,
      four_set_effect: (c) => c.four_set_effect,
    };

    return generateSortOptions<CavernRelic>(by, direction, cavernRelicMapping);
  }
}
