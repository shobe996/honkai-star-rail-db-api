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
import { Character, CharacterSearchCriteria } from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import { characterSelectors } from '../../data-access/state/character.selectors';

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
  private _store = inject(Store);

  private _storeCriteria = this._store.selectSignal(
    characterSelectors.selectSearchCriteria,
  );
  private _storeSortOptions = this._store.selectSignal(
    characterSelectors.selectSortOptions,
  );
  private _storePage = this._store.selectSignal(characterSelectors.selectPage);
  private _storeSize = this._store.selectSignal(characterSelectors.selectSize);

  private _currentPage = signal(1);
  private _currentSize = signal(9);

  searchFormModel = signal<CharacterSearchForm>({
    name: this._storeCriteria().name ?? '',
    description: this._storeCriteria().description ?? '',
    path: this._storeCriteria().path ?? '',
    type: this._storeCriteria().type ?? '',
    rarity:
      this._storeCriteria().rarity !== undefined
        ? this._storeCriteria().rarity?.toString() + '-Star'
        : '',
    faction: this._storeCriteria().faction ?? '',
    sortBy: this._storeSortOptions()?.by ?? '',
    sortDirection: this._storeSortOptions()?.direction ?? '',
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

  characters = this._store.selectSignal(characterSelectors.selectCharacters);
  paths = this._store.selectSignal(characterSelectors.selectPaths);
  types = this._store.selectSignal(characterSelectors.selectTypes);
  rarities = this._store.selectSignal(characterSelectors.selectRarities);
  factions = this._store.selectSignal(characterSelectors.selectFactions);

  private isInitialized = false;

  constructor() {
    const page = this._storePage();
    const size = this._storeSize();

    this._currentPage.set(page);
    this._currentSize.set(size);

    this._loadOptions();

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

  toDetails(character: Character) {
    this._characterListFacadeService.goToDetails(character);
    this._router.navigate(['character', 'detail', character.id]);
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

  private _loadOptions() {
    if (this.areCharactersEmpty()) {
      this.loadCharacters();
    }

    if (this.arePathsEmpty()) {
      this._characterListFacadeService.getPaths();
    }

    if (this.areTypesEmpty()) {
      this._characterListFacadeService.getTypes();
    }

    if (this.areRaritiesEmpty()) {
      this._characterListFacadeService.getRarities();
    }

    if (this.areFactionsEmpty()) {
      this._characterListFacadeService.getFactions();
    }
  }
}
