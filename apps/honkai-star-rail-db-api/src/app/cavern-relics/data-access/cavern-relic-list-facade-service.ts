import { inject, Injectable } from '@angular/core';
import { CavernRelic } from 'honkai-star-rail-db';
import { PaginatedResult } from 'honkai-star-rail-db/dist/types/pagination.types';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CavernRelicSearchCriteria } from 'honkai-star-rail-db/dist/types/cavern-relics/cavern-relic-criteria.types';
import { CavernRelicService } from './cavern-relic-service';

@Injectable({
  providedIn: 'root',
})
export class CavernRelicListFacadeService {
  private _cavernRelicService = inject(CavernRelicService);

  private _cavernRelicSubject$ = new BehaviorSubject<PaginatedResult<CavernRelic>>({
    data: [],
    total: 0,
    hasMore: false,
    page: 0,
    size: 0,
  });

  viewModel$ = combineLatest({
    cavernRelics: this._cavernRelicSubject$.asObservable(),
  });

  getAll(): void {
    this._cavernRelicService.getAll().subscribe({
      next: (value) => {
        this._cavernRelicSubject$.next(value);
      },
    });
  }

  getAllPaginated(page: number, size: number): void {
    this._cavernRelicService.getAllPaginated(page, size).subscribe({
      next: (value) => {
        this._cavernRelicSubject$.next(value);
      },
    });
  }

  filter(criteria: CavernRelicSearchCriteria, page: number, size: number): void {
    this._cavernRelicService.filter(criteria, page, size).subscribe({
      next: (value) => {
        this._cavernRelicSubject$.next(value);
      },
    });
  }
}
