import { Component, effect, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  CardComponent,
  FilterBarComponent,
  InputComponent,
  PaginatorComponent,
  SelectComponent,
} from '@honkai-star-rail-db/webkit';
import { PlanarOrnamentSearchForm } from '../../data-access/models/planar-ornament-search-form-model';
import { PlanarOrnamentListFacadeService } from '../../data-access/services/planar-ornament-list.facade.service';
import { Router } from '@angular/router';
import {
  PlanarOrnament,
  PlanarOrnamentSearchCriteria,
} from 'honkai-star-rail-db/models';
import { Store } from '@ngrx/store';
import { planarOrnamentSelectors } from '../../data-access/state/planar-ornament.selectors';
import { sortDirectionOptions } from '../../../shared/consts/sort-direction-options';

/**
 * List component for displaying planar ornaments.
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
})
export class ListComponent {
  // Planar ornament list facade service for handling business logic.
  private _planarOrnamentsListFacadeService = inject(
    PlanarOrnamentListFacadeService,
  );

  // Injected router for navigation
  private _router = inject(Router);

  // Store instance for accessing application state.
  private _store = inject(Store);

  /**
   * Signal for the list of planar ornaments.
   */
  planarOrnaments = this._store.selectSignal(
    planarOrnamentSelectors.selectPlanarOrnaments,
  );

  // Signal for the search criteria from the store.
  private _storeCriteria = this._store.selectSignal(
    planarOrnamentSelectors.selectSearchCriteria,
  );

  // Signal for the sort options from the store.
  private _storeSortOptions = this._store.selectSignal(
    planarOrnamentSelectors.selectSortOptions,
  );

  // Signal for the currently selected planar ornament.
  private _selectedPlanarOrnament = this._store.selectSignal(
    planarOrnamentSelectors.selectPlanarOrnament,
  );

  /**
   * Signal for the current page number.
   */
  currentPage = this._store.selectSignal(planarOrnamentSelectors.selectPage);

  /**
   * Signal for the current page size.
   */
  currentSize = this._store.selectSignal(planarOrnamentSelectors.selectSize);

  /**
   * Signal for the search form model.
   */
  searchFormModel = signal<PlanarOrnamentSearchForm>({
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
  ];

  /**
   * Options for sorting by direction.
   */
  sortDirectionOptions = sortDirectionOptions;

  /**
   * Form instance for the search form.
   */
  searchForm = form(this.searchFormModel);

  // Flag to indicate if the component has been initialized.
  private _isInitialized = false;

  constructor() {

    if (this._arePlanarOrnamentsEmpty()) {
      this._loadPlanarOrnaments();
    }

    effect(() => {
      this.currentPage();
      this.currentSize();
      this.searchForm().value();

      if (!this._isInitialized) {
        this._isInitialized = true;
        return;
      }

      this._loadPlanarOrnaments();
    });
  }

  /**
   * Navigate to the details page of a specific planar ornament.
   * @param planarOrnament The planar ornament to navigate to the details page for.
   */
  toDetails(planarOrnament: PlanarOrnament): void {
    if (planarOrnament.id !== this._selectedPlanarOrnament().id) {
      this._planarOrnamentsListFacadeService.goToDetails(planarOrnament);
    }
    this._router.navigate(['planar-ornament', 'detail', planarOrnament.id]);
  }

  /**
   * Navigate to a specific page of the planar ornament list.
   * @param page The page number to navigate to.
   */
  goToPage(page: number): void {
    this._planarOrnamentsListFacadeService.updatePage(page);
  }

  /**
   * Update the number of items displayed per page and reset to the first page.
   * @param size The new page size.
   */
  updatePageSize(size: number): void {
    this._planarOrnamentsListFacadeService.updateSize(size);
    this._planarOrnamentsListFacadeService.updatePage(1);
  }

  /**
   * Reset the search filters to their initial state.
   */
  resetFilters(): void {
    const initial: PlanarOrnamentSearchForm = {
      name: '',
      effect: '',
      sortBy: '',
      sortDirection: '',
    };
    this.searchForm().reset(initial);
    this._planarOrnamentsListFacadeService.updatePage(1);
  }

  // Load the list of planar ornaments based on the current search criteria, page, and size.
  private _loadPlanarOrnaments(): void {
    const { name, effect, sortBy, sortDirection } = this.searchForm().value();

    const criteria: PlanarOrnamentSearchCriteria = {
      name: name ?? '',
      effect: effect ?? '',
    };

    this._planarOrnamentsListFacadeService.filter(
      criteria,
      this.currentPage(),
      this.currentSize(),
      sortBy,
      sortDirection,
    );
  }

  // Check if the list of planar ornaments is empty.
  private _arePlanarOrnamentsEmpty(): boolean {
    return !this.planarOrnaments()?.data?.length;
  }
}
