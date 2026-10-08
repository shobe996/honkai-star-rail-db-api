import { inject, Service } from '@angular/core';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { BehaviorSubject } from 'rxjs';
import { CavernRelicService } from './cavern-relic.service';
import { CavernRelic } from 'honkai-star-rail-db';

@Service()
export class CavernRelicDetailFacadeService {
  private _cavernRelicService = inject(CavernRelicService);

  private _cavernRelicSubject$ = new BehaviorSubject<CavernRelic | null>(null);

  viewModel$ = combineLatest({
    cavernRelic: this._cavernRelicSubject$.asObservable(),
  });

  getById(id: number): void {
    this._cavernRelicService.getById(id).subscribe({
      next: (value) => {
        this._cavernRelicSubject$.next(value);
      },
    });
  }
}
