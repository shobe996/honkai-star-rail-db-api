import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  Character,
  characterRarityFilters,
  factionFilters,
  pathFilters,
  typeFilters,
} from 'honkai-star-rail-db';
import {
  BadgeComponent,
  CardComponent,
  PaginatorComponent,
  FilterBarComponent,
  SelectComponent,
  InputComponent,
} from '@honkai-star-rail-db/webkit';
import { CharacterListFacadeService } from '../../data-access/character-list-facade.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { CharacterSearchForm } from '../../data-access/character-search-form.model';
import { CharacterSearchCriteria } from 'honkai-star-rail-db/dist/types/characters/character-criteria.types';

@Component({
  selector: 'app-list-component',
  imports: [
    CardComponent,
    BadgeComponent,
    PaginatorComponent,
    FilterBarComponent,
    SelectComponent,
    FormField,
    InputComponent,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private _characterListFacadeSerice = inject(CharacterListFacadeService);
  private _currentPage = signal(1);
  private _currentSize = signal(9);

  searchFormModel = signal<CharacterSearchForm>({
    name: '',
    path: '',
    type: '',
    rarity: '',
    faction: '',
  });

  searchForm = form(this.searchFormModel);
  paths = pathFilters.all();
  types = typeFilters.all();
  rarities = characterRarityFilters.all();
  factions = factionFilters.all();
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

  constructor() {
    effect(() => {
      const { name, path, type, rarity, faction } = this.searchForm().value();

      const criteria: CharacterSearchCriteria = {
        name: name ?? '',
        path: path ?? '',
        type: type ?? '',
        faction: faction ?? '',
        rarity: rarity ? Number.parseInt(rarity) : undefined,
      };

      this._characterListFacadeSerice.filter(
        criteria,
        this._currentPage(),
        this._currentSize(),
      );
    });
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
  }

  updatePageSize(size: number) {
    this._currentSize.set(size);
    this._currentPage.set(1);
  }

  resetFilters() {
    const initial: CharacterSearchForm = {
      name: '',
      path: '',
      type: '',
      rarity: '',
      faction: '',
    };
    this.searchForm().reset(initial);
    this._currentPage.set(1);
  }
}
