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
import { sortDirectionOptions } from '../../../shared/consts/sort-direction-options';

/**
 * List component for displaying characters.
 */
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
  // Character list facade service for handling business logic.
  private _characterListFacadeService = inject(CharacterListFacadeService);

  // Injected router for navigation
  private _router = inject(Router);

  // Store instance for accessing application state.
  private _store = inject(Store);

  // Signal for the search criteria from the store.
  private _storeCriteria = this._store.selectSignal(
    characterSelectors.selectSearchCriteria,
  );

  // Signal for the sort options from the store.
  private _storeSortOptions = this._store.selectSignal(
    characterSelectors.selectSortOptions,
  );

  /**
   * Signal for the current page number.
   */
  currentPage = this._store.selectSignal(characterSelectors.selectPage);

  /**
   * Signal for the current page size.
   */
  currentSize = this._store.selectSignal(characterSelectors.selectSize);

  // Signal for the search form model.
  private _searchFormModel = signal<CharacterSearchForm>({
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

  /**
   * Options for sorting by different fields.
   */
  sortByOptions = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Rarity', value: 'rarity' },
    { label: 'Release Date', value: 'release_date' },
    { label: 'Faction', value: 'faction' },
    { label: 'Type', value: 'type' },
    { label: 'Path', value: 'path' },
  ];

  /**
   * Options for sorting by direction.
   */
  sortDirectionOptions = sortDirectionOptions;

  /**
   * Form instance for the search form.
   */
  searchForm = form(this._searchFormModel);

  // Signal for the toggle state of character stats (level1 or level80).
  private _statsToggleState = signal<Record<number, 'level1' | 'level80'>>({});

  /**
   * Signal for the list of characters.
   */
  characters = this._store.selectSignal(characterSelectors.selectCharacters);

  /**
   * Signal for the available paths.
   */
  paths = this._store.selectSignal(characterSelectors.selectPaths);

  /**
   * Signal for the available types.
   */
  types = this._store.selectSignal(characterSelectors.selectTypes);

  /**
   * Signal for the available rarities.
   */
  rarities = this._store.selectSignal(characterSelectors.selectRarities);

  /**
   * Signal for the available factions.
   */
  factions = this._store.selectSignal(characterSelectors.selectFactions);

  // Signal for the currently selected character.
  private _selectedCharacter = this._store.selectSignal(
    characterSelectors.selectCharacter,
  );

  // Flag to indicate if the component has been initialized.
  private _isInitialized = false;

  constructor() {
    this._loadOptions();

    effect(() => {
      this.currentPage();
      this.currentSize();
      this.searchForm().value();

      if (!this._isInitialized) {
        this._isInitialized = true;
        return;
      }

      this._loadCharacters();
    });
  }

  toDetails(character: Character) {
    if (character.id !== this._selectedCharacter().id) {
      this._characterListFacadeService.goToDetails(character);
    }
    this._router.navigate(['character', 'detail', character.id]);
  }

  private _loadCharacters(): void {
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
      this.currentPage(),
      this.currentSize(),
      sortBy,
      sortDirection,
    );
  }

  toggleStats(characterId: number) {
    this._statsToggleState.update((state) => {
      const current = state[characterId] || 'level1';
      return {
        ...state,
        [characterId]: current === 'level1' ? 'level80' : 'level1',
      };
    });
  }

  /**
   * Get the stats for a character based on the current toggle state.
   * @param character The character whose stats are being retrieved.
   * @param id The ID of the character.
   * @returns The stats for the specified level.
   */
  getStats(character: Character, id: number) {
    const level = this._statsToggleState()[id] || 'level1';
    return character.stats[level];
  }

  /**
   * Navigate to a specific page of the cavern relic list.
   * @param page The page number to navigate to.
   */
  goToPage(page: number) {
    this._characterListFacadeService.updatePage(page);
  }

  /**
   * Update the number of items displayed per page and reset to the first page.
   * @param size The new page size.
   */
  updatePageSize(size: number) {
    this._characterListFacadeService.updateSize(size);
    this._characterListFacadeService.updatePage(1);
  }

  /**
   * Reset the search filters to their initial state.
   */
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
    this._characterListFacadeService.updatePage(1);
  }

  // Check if the list of characters is empty.
  private _areCharactersEmpty(): boolean {
    return !this.characters()?.data?.length;
  }

  // Check if the list of paths is empty.
  private _arePathsEmpty(): boolean {
    return !this.paths().length;
  }

  // Check if the list of types is empty.
  private _areTypesEmpty(): boolean {
    return !this.types().length;
  }

  // Check if the list of rarities is empty.
  private _areRaritiesEmpty(): boolean {
    return !this.rarities().length;
  }

  // Check if the list of factions is empty.
  private _areFactionsEmpty(): boolean {
    return !this.factions().length;
  }

  // Load the options for characters, paths, types, rarities, and factions if they are empty.
  private _loadOptions() {
    if (this._areCharactersEmpty()) {
      this._loadCharacters();
    }

    if (this._arePathsEmpty()) {
      this._characterListFacadeService.getPaths();
    }

    if (this._areTypesEmpty()) {
      this._characterListFacadeService.getTypes();
    }

    if (this._areRaritiesEmpty()) {
      this._characterListFacadeService.getRarities();
    }

    if (this._areFactionsEmpty()) {
      this._characterListFacadeService.getFactions();
    }
  }
}
