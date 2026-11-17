import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { LightConeListFacadeService } from '../../data-access/services/light-cone-list.facade.service';
import { LightConeSearchForm } from '../../data-access/models/light-cone-search-form.model';
import { LightCone, LightConeSearchCriteria } from 'honkai-star-rail-db/models';
import { form, FormField } from '@angular/forms/signals';

import {
  BadgeComponent,
  CardComponent,
  FilterBarComponent,
  InputComponent,
  PaginatorComponent,
  SelectComponent,
} from '@honkai-star-rail-db/webkit';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { lightConeSelectors } from '../../data-access/state/light-cone.selectors';
import { sortDirectionOptions } from '../../../shared/consts/sort-direction-options';

/**
 * List component for displaying light cones.
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
  // Light cone list facade service for handling business logic.
  private _lightConeListFacadeService = inject(LightConeListFacadeService);

  // Injected router for navigation
  private _router = inject(Router);

  // Store instance for accessing application state.
  private _store = inject(Store);

  // Signal for the search criteria from the store.
  private _storeCriteria = this._store.selectSignal(
    lightConeSelectors.selectSearchCriteria,
  );

  // Signal for the sort options from the store.
  private _storeSortOptions = this._store.selectSignal(
    lightConeSelectors.selectSortOptions,
  );

  /**
   * Signal for the current page number.
   */
  currentPage = this._store.selectSignal(lightConeSelectors.selectPage);

  /**
   * Signal for the current page size.
   */
  currentSize = this._store.selectSignal(lightConeSelectors.selectSize);

  // Signal for the search form model.
  private _searchFormModel = signal<LightConeSearchForm>({
    name: this._storeCriteria().name ?? '',
    path: this._storeCriteria().path ?? '',
    rarity: this._storeCriteria().rarity
      ? this._storeCriteria().rarity + '-Star'
      : '',
    effect: this._storeCriteria().effect ?? '',
    sortBy: this._storeSortOptions().by ?? '',
    sortDirection: this._storeSortOptions().direction ?? '',
  });

  /**
   * Options for sorting by different fields.
   */
  sortByOptions = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Rarity', value: 'rarity' },
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

  /**
   * Signal for the list of light cones.
   */
  lightCones = this._store.selectSignal(lightConeSelectors.selectLightCones);

  /**
   * Available paths for filtering.
   */
  paths = this._store.selectSignal(lightConeSelectors.selectPaths);

  /**
   * Available rarities for filtering.
   */
  rarities = this._store.selectSignal(lightConeSelectors.selectRarities);

  // Signal for the currently selected character.
  selectedLightCone = this._store.selectSignal(
    lightConeSelectors.selectLightCone,
  );

  // Flag to indicate if the component has been initialized.
  private _isInitialized = false;

  // Signal for the toggle state of character stats (level1 or level80).
  statsToggleState = new Map<number, 'level1' | 'level80'>();

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

      console.log('User action detected, fetching new data...');
      this._loadLightCones();
    });
  }

  /**
   * Navigate to the details page of a specific light cone.
   * @param lightCone The light cone to navigate to the details page for.
   */
  toDetails(lightCone: LightCone): void {
    if (lightCone.id !== this.selectedLightCone()?.id) {
      this._lightConeListFacadeService.goToDetails(lightCone);
    }
    this._router.navigate(['light-cone', 'detail', lightCone.id]);
  }

  /**
   * Load the list of light cones based on the current search criteria and pagination.
   */
  private _loadLightCones(): void {
    const { name, effect, path, rarity, sortBy, sortDirection } =
      this.searchForm().value();

    const criteria: LightConeSearchCriteria = {
      name: name ?? '',
      effect: effect ?? '',
      path: path ?? '',
      rarity: rarity ? Number.parseInt(rarity) : undefined,
    };

    this._lightConeListFacadeService.filter(
      criteria,
      this.currentPage(),
      this.currentSize(),
      sortBy,
      sortDirection,
    );
  }

  /**
   * Toggle the stats view for a specific light cone between level1 and level80.
   */
  toggleStats(lightConeId: number): void {
    const current = this.statsToggleState.get(lightConeId) || 'level1';
    this.statsToggleState.set(
      lightConeId,
      current === 'level1' ? 'level80' : 'level1',
    );
  }

  /**
   * Get the stats for a light cone based on the current toggle state.
   * @param lightCone The light cone whose stats are being retrieved.
   * @param id The ID of the light cone.
   * @returns The stats for the specified level.
   */
  getStats(lightCone: LightCone, id: number) {
    const level = this.statsToggleState.get(id) || 'level1';
    return lightCone.stats[level];
  }

  /**
   * Navigate to a specific page of the character list.
   * @param page The page number to navigate to.
   */
  goToPage(page: number): void {
    this._lightConeListFacadeService.updatePage(page);
  }

  /**
   * Update the number of items displayed per page and reset to the first page.
   * @param size The new page size.
   */
  updatePageSize(size: number): void {
    this._lightConeListFacadeService.updateSize(size);
    this._lightConeListFacadeService.updatePage(1);
  }

  /**
   * Reset the search filters to their initial state.
   */
  resetFilters(): void {
    const initial: LightConeSearchForm = {
      name: '',
      path: '',
      rarity: '',
      effect: '',
      sortBy: '',
      sortDirection: '',
    };
    this.searchForm().reset(initial);
    this._lightConeListFacadeService.updatePage(1);
  }

  // Load the options for characters, paths, types, rarities, and factions if they are empty.
  private _loadOptions(): void {
    if (this.areLightConesEmpty()) {
      this._loadLightCones();
    }

    if (this.arePathsEmpty()) {
      this._lightConeListFacadeService.getPaths();
    }

    if (this.areRaritiesEmpty()) {
      this._lightConeListFacadeService.getRarities();
    }
  }

  // Check if the light cone list is empty.
  private areLightConesEmpty(): boolean {
    return !this.lightCones()?.data?.length;
  }

  // Check if the path options are empty.
  private arePathsEmpty(): boolean {
    return !this.paths().length;
  }

  // Check if the rarity options are empty.
  private areRaritiesEmpty(): boolean {
    return !this.rarities().length;
  }
}
