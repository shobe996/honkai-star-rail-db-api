import { Service, inject } from '@angular/core';
import { PlanarOrnamentSearchCriteria } from 'honkai-star-rail-db/dist/types/planar-ornaments/planar-ornament-criteria.types';
import { PlanarOrnamentService } from './planar-ornament.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { PlanarOrnament } from 'honkai-star-rail-db/dist/types';
import { PaginatedResult } from 'honkai-star-rail-db/dist/types/pagination.types';
import { SortOptions } from 'honkai-star-rail-db/dist/filters/base.filters';

@Service()
export class PlanarOrnamentListFacadeService {
  private _planarOrnamentsService = inject(PlanarOrnamentService);

  private _planarOrnamentsSubject$ = new BehaviorSubject<
    PaginatedResult<PlanarOrnament>
  >({
    data: [],
    total: 0,
    hasMore: false,
    page: 0,
    size: 0,
  });

  viewModel$ = combineLatest({
    planarOrnaments: this._planarOrnamentsSubject$.asObservable(),
  });

  getAll(): void {
    this._planarOrnamentsService.getAll().subscribe({
      next: (value) => {
        this._planarOrnamentsSubject$.next(value);
      },
    });
  }

  getAllPaginated(page: number, size: number): void {
    this._planarOrnamentsService.getAllPaginated(page, size).subscribe({
      next: (value) => {
        this._planarOrnamentsSubject$.next(value);
      },
    });
  }

  filter(
    criteria: PlanarOrnamentSearchCriteria,
    page: number,
    size: number,
    sort?: SortOptions<PlanarOrnament>,
  ): void {
    this._planarOrnamentsService.filter(criteria, page, size, sort).subscribe({
      next: (value) => {
        this._planarOrnamentsSubject$.next(value);
      },
    });
  }
}
