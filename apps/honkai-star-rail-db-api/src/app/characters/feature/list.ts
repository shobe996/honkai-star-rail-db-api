import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Character } from 'honkai-star-rail-db';
import {
  BadgeComponent,
  CardComponent,
  PaginatorComponent,
} from '@honkai-star-rail-db/webkit';
import { CharacterListFacadeService } from '../data-access/character-list-facade.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-component',
  imports: [CardComponent, BadgeComponent, PaginatorComponent],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  private _characterListFacadeSerice = inject(CharacterListFacadeService);
  private _currentPage = signal(1);
  private _currentSize = signal(10);
  toDetails(id: number) {
    console.log(id);
  }
  statsToggleState = new Map<number, 'level1' | 'level80'>();
  viewModel = toSignal(this._characterListFacadeSerice.viewModel$, {
    initialValue: {
      characters: {
        data: [],
        total: 0,
        hasMore: false,
        page: 0,
        size: 0,
      },
    },
  });
  ngOnInit(): void {
    this._characterListFacadeSerice.getAllPaginated(this._currentPage(), this._currentSize());
  }

  toggleStats(characterId: number) {
    const current = this.statsToggleState.get(characterId) || 'level1';
    this.statsToggleState.set(
      characterId,
      current === 'level1' ? 'level80' : 'level1',
    );
  }

  getStats(character: Character, id: number) {
    const level = this.statsToggleState.get(id) || 'level1';
    return character.stats[level];
  }

  goToPage(page: number) {
    this._currentPage.set(page);
    this._characterListFacadeSerice.getAllPaginated(page, this._currentSize());
  }

  updatePageSize(size: number) {
    this._currentSize.set(size);
    this._characterListFacadeSerice.getAllPaginated(this._currentPage(), size);
  }
}
