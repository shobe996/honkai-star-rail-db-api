import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { lightConeActions } from './light-cone.actions';
import { LightConeService } from '../services/light-cone.service';
import { map, switchMap } from 'rxjs';
import { LightCone } from 'honkai-star-rail-db/models';
import { PathService } from '../../../paths/data-access/services/path.service';
import { RarityService } from '../../../rarities/data-access/services/rarity.service';
import { generateSortOptions } from '../../../shared/utils/sort-options';

/**
 * Effects for managing light cone state.
 */
@Injectable()
export class LightConeEffects {

   // Injected actions stream
  private readonly _actions$ = inject(Actions);

  // Light cone service for making API calls related to light cones.
  private readonly _lightConeService = inject(LightConeService);

  // Path service for making API calls related to paths.
  private readonly _pathService = inject(PathService);

  // Rarity service for making API calls related to rarities.
  private readonly _rarityService = inject(RarityService);

  loadLightCones$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lightConeActions.loadLightCones),
      switchMap(({ searchCriteria, page, size, by, direction }) => {
        const sortOptions =
          by && direction ? this._getLightConeSort(by, direction) : undefined;
        return this._lightConeService
          .filter(searchCriteria, page, size, sortOptions)
          .pipe(
            map((lightCones) =>
              lightConeActions.loadLightConesSuccess({ lightCones }),
            ),
          );
      }),
    ),
  );

  loadPaths$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lightConeActions.loadPaths),
      switchMap(() =>
        this._pathService
          .getAll()
          .pipe(map((paths) => lightConeActions.loadPathsSuccess({ paths }))),
      ),
    ),
  );

  loadRarities$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lightConeActions.loadRarities),
      switchMap(() =>
        this._rarityService
          .getAllLightConeRarities()
          .pipe(
            map((rarities) =>
              lightConeActions.loadRaritiesSuccess({ rarities }),
            ),
          ),
      ),
    ),
  );

   // Helper method to generate sort options for light cones based on the provided criteria.
  private _getLightConeSort(sortBy: string, sortDirection: string) {
    const lightConeMapping: Record<
      string,
      (l: LightCone) => number | string | Date
    > = {
      id: (l) => l.id,
      name: (l) => l.name,
      rarity: (l) => l.rarity.value,
      path: (l) => l.path.name,
    };

    return generateSortOptions<LightCone>(sortBy, sortDirection, lightConeMapping);
  }
}
