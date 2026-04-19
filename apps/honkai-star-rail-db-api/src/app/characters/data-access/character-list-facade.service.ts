import { inject, Injectable } from '@angular/core';
import { Character } from 'honkai-star-rail-db';
import { PaginatedResult } from 'honkai-star-rail-db/dist/types/pagination.types';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CharacterService } from './character.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterListFacadeService {
  private _characterService = inject(CharacterService);

  private _characterSubject$ = new BehaviorSubject<PaginatedResult<Character>>({
    data: [],
    total: 0,
    hasMore: false,
    page: 0,
    size: 0,
  });

  viewModel$ = combineLatest({
    characters: this._characterSubject$.asObservable(),
  });

  getAll(): void {
    this._characterService.getAll().subscribe({
      next: (value) => {
        this._characterSubject$.next(value);
      },
    });
  }

  getAllPaginated(page: number, size: number): void {
    this._characterService.getAllPaginated(page,size).subscribe({
      next: (value) => {
        this._characterSubject$.next(value);
      },
    });
  }
}
