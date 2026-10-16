import { inject, Service } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CharacterService } from './character.service';
import { Character, CharacterSearchCriteria, PaginatedResult, SortOptions } from 'honkai-star-rail-db/models';
@Service()
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
    this._characterService.getAllPaginated(page, size).subscribe({
      next: (value) => {
        this._characterSubject$.next(value);
      },
    });
  }

  filter(
    criteria: CharacterSearchCriteria,
    page: number,
    size: number,
    sortOptions?: SortOptions<Character>,
  ): void {
    this._characterService.filter(criteria, page, size, sortOptions).subscribe({
      next: (value) => {
        this._characterSubject$.next(value);
      },
    });
  }
}
