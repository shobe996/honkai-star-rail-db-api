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
  private _planarOrnamentsListFacadeService = inject(
    PlanarOrnamentListFacadeService,
  );
  private _router = inject(Router);
  private _store = inject(Store);

  planarOrnaments = this._store.selectSignal(
    planarOrnamentSelectors.selectPlanarOrnaments,
  );

  private _storeCriteria = this._store.selectSignal(
    planarOrnamentSelectors.selectSearchCriteria,
  );
  private _storeSortOptions = this._store.selectSignal(
    planarOrnamentSelectors.selectSortOptions,
  );
  private _storePage = this._store.selectSignal(
    planarOrnamentSelectors.selectPage,
  );
  private _storeSize = this._store.selectSignal(
    planarOrnamentSelectors.selectSize,
  );
  private _selectedPlanarOrnament = this._store.selectSignal(
    planarOrnamentSelectors.selectPlanarOrnament,
  );

  private _currentPage = signal(1);
  private _currentSize = signal(9);

  searchFormModel = signal<PlanarOrnamentSearchForm>({
    name: this._storeCriteria().name ?? '',
    effect: this._storeCriteria().effect ?? '',
    sortBy: this._storeSortOptions().by ?? '',
    sortDirection: this._storeSortOptions().direction ?? '',
  });

  sortByOptions = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Two Set Effect', value: 'two_set_effect' },
  ];
  sortDirectionOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  searchForm = form(this.searchFormModel);

  private isInitialized = false;

  constructor() {
    const page = this._storePage();
    const size = this._storeSize();

    this._currentPage.set(page);
    this._currentSize.set(size);

    if (this.arePlanarOrnamentsEmpty()) {
      this.loadPlanarOrnaments();
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
      this.loadPlanarOrnaments();
    });
  }

  toDetails(planarOrnament: PlanarOrnament) {
    if (planarOrnament.id !== this._selectedPlanarOrnament().id) {
      this._planarOrnamentsListFacadeService.goToDetails(planarOrnament);
    }
    this._router.navigate(['planar-ornament', 'detail', planarOrnament.id]);
  }

  goToPage(page: number) {
    this._currentPage.set(page);
  }

  updatePageSize(size: number) {
    this._currentSize.set(size);
    this._currentPage.set(1);
  }

  resetFilters() {
    const initial: PlanarOrnamentSearchForm = {
      name: '',
      effect: '',
      sortBy: '',
      sortDirection: '',
    };
    this.searchForm().reset(initial);
    this._currentPage.set(1);
  }

  loadPlanarOrnaments() {
    const { name, effect, sortBy, sortDirection } = this.searchForm().value();

    const criteria: PlanarOrnamentSearchCriteria = {
      name: name ?? '',
      effect: effect ?? '',
    };

    this._planarOrnamentsListFacadeService.filter(
      criteria,
      this._currentPage(),
      this._currentSize(),
      sortBy,
      sortDirection,
    );
  }

   private arePlanarOrnamentsEmpty(): boolean {
    return !this.planarOrnaments()?.data?.length;
  }
}
