import { inject, Injectable } from '@angular/core';
import { CharacterService } from './character.service';
import { Character } from 'honkai-star-rail-db';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterDetailFacadeService {
  private _characterService = inject(CharacterService);

  private _characterSubject$ = new BehaviorSubject<Character | null>(null);
  viewModel$ = combineLatest({
      character: this._characterSubject$.asObservable(),
    });

  getById(id: number): void {
    this._characterService.getById(id).subscribe({
      next: (value) => this._characterSubject$.next(value)
    });
  }
}
