import { inject, Injectable } from '@angular/core';
import { LightConeService } from './light-cone.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { LightCone } from 'honkai-star-rail-db';

@Injectable({
  providedIn: 'root',
})
export class LightConeDetailFacadeService {
  private _lightConeService = inject(LightConeService);

  private _lightConeSubject$ = new BehaviorSubject<LightCone | null>(null);
  viewModel$ = combineLatest({
      lightCone: this._lightConeSubject$.asObservable(),
    });

  getById(id: number): void {
    this._lightConeService.getById(id).subscribe({
      next: (value) => this._lightConeSubject$.next(value)
    });
  }
}
