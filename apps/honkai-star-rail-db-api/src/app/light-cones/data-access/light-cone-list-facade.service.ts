import { inject, Injectable } from '@angular/core';
import { LightConeService } from './light-cone.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { PaginatedResult } from 'honkai-star-rail-db/dist/types/pagination.types';
import { LightCone } from 'honkai-star-rail-db';
import { LightConeSearchCriteria } from 'honkai-star-rail-db/dist/types/light-cones';

@Injectable({
  providedIn: 'root',
})
export class LightConeListFacadeService {
  private _lightConeService = inject(LightConeService);

  private _lightConeSubject$ = new BehaviorSubject<PaginatedResult<LightCone>>({
    data: [],
    total: 0,
    hasMore: false,
    page: 0,
    size: 0,
  });

  viewModel$ = combineLatest({
    lightCones: this._lightConeSubject$.asObservable(),
  });

  getAll(): void {
    this._lightConeService.getAll().subscribe({
      next: (value) => {
        this._lightConeSubject$.next(value);
      },
    });
  }

  getAllPaginated(page: number, size: number): void {
    this._lightConeService.getAllPaginated(page, size).subscribe({
      next: (value) => {
        this._lightConeSubject$.next(value);
      },
    });
  }

  filter(criteria: LightConeSearchCriteria, page: number, size: number): void {
    this._lightConeService.filter(criteria, page, size).subscribe({
      next: (value) => {
        this._lightConeSubject$.next(value);
      },
    });
  }
}
