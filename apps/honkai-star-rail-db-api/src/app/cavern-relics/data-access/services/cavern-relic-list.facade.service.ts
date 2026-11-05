import { inject, Service } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CavernRelic, CavernRelicSearchCriteria, PaginatedResult } from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import { cavernRelicActions } from '../state/cavern-relic.actions';

@Service()
export class CavernRelicListFacadeService {
  private _store = inject(Store);

  filter(
      searchCriteria: CavernRelicSearchCriteria,
      page: number,
      size: number,
      by?: string,
      direction?: string,
    ): void {
      this._store.dispatch(cavernRelicActions.loadCavernRelics({ searchCriteria, page, size, by, direction  }));
    }
}
