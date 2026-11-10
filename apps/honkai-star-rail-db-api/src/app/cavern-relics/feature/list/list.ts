import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CavernRelicSearchForm } from '../../data-access/models/cavern-relic-search-form.model';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import {
  CardComponent,
  FilterBarComponent,
  InputComponent,
  PaginatorComponent,
  SelectComponent,
} from '@honkai-star-rail-db/webkit';
import { CavernRelicListFacadeService } from '../../data-access/services/cavern-relic-list.facade.service';
import {
  CavernRelic,
  CavernRelicSearchCriteria,
} from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import { cavernRelicSelectors } from '../../data-access/state/cavern-relic.selectors';
import { sortDirectionOptions } from '../../../shared/consts/sort-direction-options';

/**
 * List component for displaying cavern relics.
 */
@Component({
  selector: 'app-list-component',
  imports: [
    CardComponent,
    PaginatorComponent,
    FilterBarComponent,
    InputComponent,
    SelectComponent,
    FormField,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {

  // Cavern relic list facade service for handling business logic.
  private _cavernRelicListFacadeService = inject(CavernRelicListFacadeService);

  // Injected router for navigation
  private _router = inject(Router);

  // Store instance for accessing application state.
  private _store = inject(Store);

  /**
   * Signal for the list of cavern relics.
   */
  cavernRelics = this._store.selectSignal(
    cavernRelicSelectors.selectCavernRelics,
  );

  // Signal for the search criteria from the store.
  private _storeCriteria = this._store.selectSignal(
    cavernRelicSelectors.selectSearchCriteria,
  );

  // Signal for the sort options from the store.
  private _storeSortOptions = this._store.selectSignal(
    cavernRelicSelectors.selectSortOptions,
  );

  // Signal for the currently selected cavern relic.
  private _selectedCavernRelic = this._store.selectSignal(
    cavernRelicSelectors.selectCavernRelic,
  );

  /**
   * Signal for the current page number.
   */
  currentPage = this._store.selectSignal(
    cavernRelicSelectors.selectPage,
  );

  /**
   * Signal for the current page size.
   */
  currentSize = this._store.selectSignal(
    cavernRelicSelectors.selectSize,
  );

  // Signal for the search form model.
  private _searchFormModel = signal<CavernRelicSearchForm>({
    name: this._storeCriteria().name ?? '',
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
    { label: 'Two Set Effect', value: 'two_set_effect' },
    { label: 'Four Set Effect', value: 'four_set_effect' },
  ];

  // Options for sorting by direction.
  sortDirectionOptions = sortDirectionOptions;

  /**
   * Form instance for the search form.
   */
  searchForm = form(this._searchFormModel);

  // Flag to indicate if the component has been initialized.
  private _isInitialized = false;

  constructor() {

    if (this._areCavernRelicsEmpty()) {
      this._loadCavernRelics();
    }

    effect(() => {
      this.currentPage();
      this.currentSize();
      this.searchForm().value();

      if (!this._isInitialized) {
        this._isInitialized = true;
        return;
      }

      this._loadCavernRelics();
    });
  }

  /**
   * Navigate to the details page of a specific cavern relic.
   * @param cavernRelic The cavern relic to navigate to the details page for.
   */
  toDetails(cavernRelic: CavernRelic) {
    if (cavernRelic.id !== this._selectedCavernRelic()?.id) {
      this._cavernRelicListFacadeService.goToDetails(cavernRelic);
    }
    this._router.navigate(['cavern-relic', 'detail', cavernRelic.id]);
  }

  /**
   * Navigate to a specific page of the cavern relic list.
   * @param page The page number to navigate to.
   */
  goToPage(page: number) {
    this._cavernRelicListFacadeService.updatePage(page);
  }

  /**
   * Update the number of items displayed per page and reset to the first page.
   * @param size The new page size.
   */
  updatePageSize(size: number) {
    this._cavernRelicListFacadeService.updateSize(size);
    this._cavernRelicListFacadeService.updatePage(1);
  }

  /**
   * Reset the search filters to their initial state.
   */
  resetFilters() {
    const initial: CavernRelicSearchForm = {
      name: '',
      effect: '',
      sortBy: '',
      sortDirection: '',
    };
    this.searchForm().reset(initial);
    this._cavernRelicListFacadeService.updatePage(1);
  }

  // Check if the list of cavern relics is empty.
  private _areCavernRelicsEmpty(): boolean {
    return !this.cavernRelics()?.data?.length;
  }

  // Load the list of cavern relics based on the current search criteria, page, and size.
  private _loadCavernRelics() {
    const { name, effect, sortBy, sortDirection } = this.searchForm().value();

    const criteria: CavernRelicSearchCriteria = {
      name: name ?? '',
      effect: effect ?? '',
    };

    this._cavernRelicListFacadeService.filter(
      criteria,
      this.currentPage(),
      this.currentSize(),
      sortBy,
      sortDirection,
    );
  }
}
