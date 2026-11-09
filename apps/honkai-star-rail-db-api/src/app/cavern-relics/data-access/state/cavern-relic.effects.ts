import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { CavernRelicService } from '../services/cavern-relic.service';
import { cavernRelicActions } from './cavern-relic.actions';
import { map, switchMap } from 'rxjs';
import { CavernRelic, SortOptions } from 'honkai-star-rail-db/models';
import { generateSortOptions } from '../../../shared/utils/sort-options';

@Injectable()
export class CavernRelicEffects {
  private readonly actions$ = inject(Actions);
  private readonly cavernRelicService = inject(CavernRelicService);

  loadCavernRelics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cavernRelicActions.loadCavernRelics),
      switchMap(({ searchCriteria, page, size, by, direction }) => {
        const sortOptions =
          by && direction ? this.getCavernRelicSort(by, direction) : undefined;
        return this.cavernRelicService
          .filter(searchCriteria, page, size, sortOptions)
          .pipe(
            map((cavernRelics) =>
              cavernRelicActions.loadCavernRelicsSucess({ cavernRelics }),
            ),
          );
      }),
    ),
  );

  private getCavernRelicSort(
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
