import { Service, inject } from '@angular/core';
import { PlanarOrnamentService } from './planar-ornament.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { PaginatedResult, PlanarOrnament, PlanarOrnamentSearchCriteria, SortOptions } from 'honkai-star-rail-db/models';

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
