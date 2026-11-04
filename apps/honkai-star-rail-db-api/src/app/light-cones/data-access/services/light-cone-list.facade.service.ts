import { inject, Service } from '@angular/core';
import { LightCone, LightConeSearchCriteria } from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import { lightConeActions } from '../state/light-cone.actions';

@Service()
export class LightConeListFacadeService {
  private _store = inject(Store);

  filter(
    searchCriteria: LightConeSearchCriteria,
    page: number,
    size: number,
    by?: string,
    direction?: string,
  ): void {
    this._store.dispatch(lightConeActions.loadLightCones({ searchCriteria, page, size, by, direction  }));
  }

  getPaths(): void {
    this._store.dispatch(lightConeActions.loadPaths());
  }
  
  getRarities(): void {
    this._store.dispatch(lightConeActions.loadRarities());
  }

  goToDetails(lightCone: LightCone): void {  
    this._store.dispatch(lightConeActions.loadLightConeDetails({ lightCone }));
  }
}
