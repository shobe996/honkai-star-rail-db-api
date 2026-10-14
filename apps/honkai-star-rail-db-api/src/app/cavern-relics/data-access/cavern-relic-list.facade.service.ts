import { inject, Service } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CavernRelicService } from './cavern-relic.service';
import { CavernRelic, CavernRelicSearchCriteria, PaginatedResult, SortOptions } from 'honkai-star-rail-db/models';

@Service()
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

  filter(criteria: CavernRelicSearchCriteria, page: number, size: number, sort?: SortOptions<CavernRelic>): void {
    this._cavernRelicService.filter(criteria, page, size, sort).subscribe({
      next: (value) => {
        this._cavernRelicSubject$.next(value);
      },
    });
  }
}
