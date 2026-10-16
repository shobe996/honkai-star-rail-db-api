import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  BadgeComponent,
  CardComponent,
  PaginatorComponent,
  FilterBarComponent,
  SelectComponent,
  InputComponent,
} from '@honkai-star-rail-db/webkit';
import { CharacterListFacadeService } from '../../data-access/services/character-list.facade.service';
import { form, FormField } from '@angular/forms/signals';
import { CharacterSearchForm } from '../../data-access/models/character-search-form.model';
import { Router } from '@angular/router';
import {
  characterRarityFilters,
  pathFilters,
  typeFilters,
  factionFilters,
} from 'honkai-star-rail-db/filters';
import {
  Character,
  CharacterSearchCriteria,
  SortOptions,
} from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import {
  selectCharacters,
  selectSearchCriteria,
  selectPage,
  selectSize,
} from '../../data-access/state/character.selectors';

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
  private _characterListFacadeService = inject(CharacterListFacadeService);
  private _router = inject(Router);
  private store = inject(Store);

  private storeCriteria = this.store.selectSignal(selectSearchCriteria);
  private storePage = this.store.selectSignal(selectPage);
  private storeSize = this.store.selectSignal(selectSize);

  _currentPage = signal(1);
  _currentSize = signal(9);

  searchFormModel = signal<CharacterSearchForm>({
    name: this.storeCriteria().name ?? '',
    description: this.storeCriteria().description ?? '',
    path: this.storeCriteria().path ?? '',
    type: this.storeCriteria().type ?? '',
    rarity:
      this.storeCriteria().rarity !== undefined
        ? String(this.storeCriteria().rarity)
        : '',
    faction: this.storeCriteria().faction ?? '',
    sortBy: '',
    sortDirection: '',
  });

  sortByOptions = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Rarity', value: 'rarity' },
    { label: 'Release Date', value: 'release_date' },
    { label: 'Faction', value: 'faction' },
    { label: 'Type', value: 'type' },
    { label: 'Path', value: 'path' },
  ];

  sortDirectionOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  searchForm = form(this.searchFormModel);
  paths = pathFilters.all();
  types = typeFilters.all();
  rarities = characterRarityFilters.all();
  factions = factionFilters.all();

  statsToggleState = signal<Record<number, 'level1' | 'level80'>>({});

  viewModel = this.store.selectSignal(selectCharacters);

  private readonly sortMapping: Record<string, (c: Character) => any> = {
    id: (c) => c.id,
    name: (c) => c.name,
    rarity: (c) => c.rarity.value,
    release_date: (c) => c.release_date,
    faction: (c) => c.faction.name,
    type: (c) => c.type.name,
    path: (c) => c.path.name,
  };

  private isInitialized = false;

  constructor() {
    const page = this.storePage();
    const size = this.storeSize();

    this._currentPage.set(page);
    this._currentSize.set(size);

    if (this.isStateEmpty()) {
      console.log('State is empty, loading characters...');
      this.loadCharacters();
    } else {
      console.log('State found in store, restoring UI from cache...');
    }

    effect(() => {
      this._currentPage();
      this._currentSize();
      this.searchForm().value();

      if (!this.isInitialized) {
        this.isInitialized = true;
        return;
      }

      console.log('User action detected, fetching new data...');
      this.loadCharacters();
    });
  }

  toDetails(id: number) {
    this._router.navigate(['character', 'detail', id]);
  }

  private loadCharacters(): void {
    const { name, description, path, type, rarity, faction, sortBy, sortDirection } =
      this.searchForm().value();

    const criteria: CharacterSearchCriteria = {
      name: name ?? '',
      description: description ?? '',
      path: path ?? '',
      type: type ?? '',
      faction: faction ?? '',
      rarity: rarity ? Number.parseInt(rarity) : undefined,
    };

    const sortOptions =
      sortBy && sortDirection
        ? this.generateSortOptions(sortBy, sortDirection)
        : undefined;

    this._characterListFacadeService.filter(
      criteria,
      this._currentPage(),
      this._currentSize(),
      sortOptions
    );
  }

  toggleStats(characterId: number) {
    this.statsToggleState.update((state) => {
      const current = state[characterId] || 'level1';
      return {
        ...state,
        [characterId]: current === 'level1' ? 'level80' : 'level1',
      };
    });
  }

  getStats(character: Character, id: number) {
    const level = this.statsToggleState()[id] || 'level1';
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
      description: '',
      path: '',
      type: '',
      rarity: '',
      faction: '',
      sortBy: '',
      sortDirection: '',
    };
    this.searchForm().reset(initial);
    this._currentPage.set(1);
  }

  private isStateEmpty(): boolean {
    return !this.viewModel()?.data?.length;
  }

  private generateSortOptions(
    sortBy: string,
    sortDirection: string
  ): SortOptions<Character> {
    const getter = this.sortMapping[sortBy];
    return {
      by: getter ?? ((c) => c.id),
      direction: sortDirection as 'asc' | 'desc',
    };
  }
}