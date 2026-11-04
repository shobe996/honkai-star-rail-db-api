import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { lightConeActions } from './light-cone.actions';
import { LightConeService } from '../services/light-cone.service';
import { map, switchMap } from 'rxjs';
import { LightCone, SortOptions } from 'honkai-star-rail-db/models';
import { PathService } from '../../../paths/data-access/services/path.service';
import { RarityService } from '../../../rarities/data-access/services/rarity.service';

@Injectable()
export class LightConeEffects {
  private readonly actions$ = inject(Actions);
  private readonly lightConeService = inject(LightConeService);
  private readonly pathService = inject(PathService);
  private readonly rarityService = inject(RarityService);
  

  loadLightCones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(lightConeActions.loadLightCones),
      switchMap(({ searchCriteria, page, size, by, direction }) => {
        const sortOptions =
          by && direction ? this.generateSortOptions(by, direction) : undefined;
        return this.lightConeService
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
    this.actions$.pipe(
      ofType(lightConeActions.loadPaths),
      switchMap(() =>
        this.pathService.getAll().pipe(
          map((paths) => lightConeActions.loadPathsSuccess({ paths })),
        ),
      ),
    ),
  );

  loadRarities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(lightConeActions.loadRarities),
      switchMap(() =>
        this.rarityService.getAllLightConeRarities().pipe(
          map((rarities) => lightConeActions.loadRaritiesSuccess({ rarities })),
        ),
      ),
    ),
  );

  private generateSortOptions(
    sortBy: string,
    sortDirection: string,
  ): SortOptions<LightCone> {
    const getter = this.sortMapping[sortBy];
    return {
      by: getter ?? ((c) => c.id),
      direction: sortDirection as 'asc' | 'desc',
    };
  }

  private sortMapping: Record<
    string,
    (c: LightCone) => number | string | Date
  > = {
    id: (c) => c.id,
    name: (c) => c.name,
    rarity: (c) => c.rarity.value,
    path: (c) => c.path.name,
  };
}
