import { inject, Service } from '@angular/core';
import { PlanarOrnament } from 'honkai-star-rail-db/dist/types/planar-ornament.types';
import { BehaviorSubject } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { PlanarOrnamentService } from './planar-ornament.service';

@Service()
export class PlanarOrnamentDetailFacadeService {
  private _planarOrnamentService = inject(PlanarOrnamentService);

  private _planarOrnamentSubject$ = new BehaviorSubject<PlanarOrnament | null>(null);

  viewModel$ = combineLatest({
    planarOrnament: this._planarOrnamentSubject$.asObservable(),
  });

  getById(id: number): void {
    this._planarOrnamentService.getById(id).subscribe({
      next: (value) => {
        this._planarOrnamentSubject$.next(value);
      },
    });
  }
}
