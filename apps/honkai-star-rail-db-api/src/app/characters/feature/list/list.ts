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
  typeFilters,
  factionFilters,
} from 'honkai-star-rail-db/filters';
import {
  Character,
  CharacterSearchCriteria,
} from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import {
  characterSelectors,
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

  private storeCriteria = this.store.selectSignal(characterSelectors.selectSearchCriteria);
  private storeSortOptions = this.store.selectSignal(characterSelectors.selectSortOptions);
  private storePage = this.store.selectSignal(characterSelectors.selectPage);
  private storeSize = this.store.selectSignal(characterSelectors.selectSize);

  _currentPage = signal(1);
  _currentSize = signal(9);

  searchFormModel = signal<CharacterSearchForm>({
    name: this.storeCriteria().name ?? '',
    description: this.storeCriteria().description ?? '',
    path: this.storeCriteria().path ?? '',
    type: this.storeCriteria().type ?? '',
    rarity:
      this.storeCriteria().rarity !== undefined
        ? this.storeCriteria().rarity?.toString() + "-Star"
        : '',
    faction: this.storeCriteria().faction ?? '',
    sortBy:
      this.storeSortOptions()?.by ?? '',
    sortDirection:
      this.storeSortOptions()?.direction ?? ''
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

  statsToggleState = signal<Record<number, 'level1' | 'level80'>>({});

  characters = this.store.selectSignal(characterSelectors.selectCharacters);
  paths = this.store.selectSignal(characterSelectors.selectPaths);
  types = this.store.selectSignal(characterSelectors.selectTypes);
  rarities = this.store.selectSignal(characterSelectors.selectRarities);
  factions = this.store.selectSignal(characterSelectors.selectFactions);

  private isInitialized = false;

  constructor() {
    const page = this.storePage();
    const size = this.storeSize();

    this._currentPage.set(page);
    this._currentSize.set(size);

    if (this.areCharactersEmpty()) {
      console.log('State is empty, loading characters...');
      this.loadCharacters();
    } else {
      console.log('State found in store, restoring UI from cache...');
    }

    if (this.arePathsEmpty()) {
      console.log('Paths are empty, loading paths...');
      this._characterListFacadeService.getPaths();
    }

    if (this.areTypesEmpty()) {
      console.log('Types are empty, loading types...');
      this._characterListFacadeService.getTypes();
    }

    if (this.areRaritiesEmpty()) {
      console.log('Rarities are empty, loading rarities...');
      this._characterListFacadeService.getRarities();
    }

    if (this.areFactionsEmpty()) {
      console.log('Factions are empty, loading factions...');
      this._characterListFacadeService.getFactions();
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
    const {
      name,
      description,
      path,
      type,
      rarity,
      faction,
      sortBy,
      sortDirection,
    } = this.searchForm().value();

    const criteria: CharacterSearchCriteria = {
      name: name ?? '',
      description: description ?? '',
      path: path ?? '',
      type: type ?? '',
      faction: faction ?? '',
      rarity: rarity ? Number.parseInt(rarity) : undefined,
    };

    this._characterListFacadeService.filter(
      criteria,
      this._currentPage(),
      this._currentSize(),
      sortBy,
      sortDirection,
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

  private areCharactersEmpty(): boolean {
    return !this.characters()?.data?.length;
  }

  private arePathsEmpty(): boolean {
    return !this.paths().length;
  }

  private areTypesEmpty(): boolean {
    return !this.types().length;
  }

  private areRaritiesEmpty(): boolean {
    return !this.rarities().length;
  }

  private areFactionsEmpty(): boolean {
    return !this.factions().length;
  }
}
