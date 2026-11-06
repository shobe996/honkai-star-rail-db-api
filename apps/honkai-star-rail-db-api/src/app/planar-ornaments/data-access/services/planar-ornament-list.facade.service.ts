import { Service, inject } from '@angular/core';
import {
  PlanarOrnamentSearchCriteria,
  PlanarOrnament,
} from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import { planarOrnamentActions } from '../state/planar-ornament.actions';

@Service()
export class PlanarOrnamentListFacadeService {
  private _store = inject(Store);

  filter(
    searchCriteria: PlanarOrnamentSearchCriteria,
    page: number,
    size: number,
    by?: string,
    direction?: string,
  ): void {
    this._store.dispatch(
      planarOrnamentActions.loadPlanarOrnaments({
        searchCriteria,
        page,
        size,
        by,
        direction,
      }),
    );
  }

  goToDetails(selectedPlanarOrnament: PlanarOrnament): void {
    this._store.dispatch(
      planarOrnamentActions.loadPlanarOrnamentDetails({
        selectedPlanarOrnament,
      }),
    );
  }
}
