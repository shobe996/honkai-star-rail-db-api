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
  private _cavernRelicListFacadeService = inject(CavernRelicListFacadeService);
  private _router = inject(Router);
  private _store = inject(Store);

  cavernRelics = this._store.selectSignal(cavernRelicSelectors.selectCavernRelics);

  private _storeCriteria = this._store.selectSignal(
    cavernRelicSelectors.selectSearchCriteria,
  );
  private _storeSortOptions = this._store.selectSignal(
    cavernRelicSelectors.selectSortOptions,
  );
  private _storePage = this._store.selectSignal(
    cavernRelicSelectors.selectPage,
  );
  private _storeSize = this._store.selectSignal(
    cavernRelicSelectors.selectSize,
  );

  private _currentPage = signal(1);
  private _currentSize = signal(9);

  searchFormModel = signal<CavernRelicSearchForm>({
    name: this._storeCriteria().name ?? '',
    effect: this._storeCriteria().effect ?? '',
    sortBy: this._storeSortOptions().by ?? '',
    sortDirection: this._storeSortOptions().direction ?? '',
  });

  sortByOptions = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Two Set Effect', value: 'two_set_effect' },
    { label: 'Four Set Effect', value: 'four_set_effect' },
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

    if (this.areCavernRelicsEmpty()) {
      this.loadCavernRelics();
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
      this.loadCavernRelics();
    });
  }

  toDetails(cavernRelic: CavernRelic) {
    this._cavernRelicListFacadeService.goToDetails(cavernRelic);
    this._router.navigate(['cavern-relic', 'detail', cavernRelic.id]);
  }

  loadCavernRelics() {
    const { name, effect, sortBy, sortDirection } = this.searchForm().value();

    const criteria: CavernRelicSearchCriteria = {
      name: name ?? '',
      effect: effect ?? '',
    };

    this._cavernRelicListFacadeService.filter(
      criteria,
      this._currentPage(),
      this._currentSize(),
      sortBy,
      sortDirection,
    );
  }

  goToPage(page: number) {
    this._currentPage.set(page);
  }

  updatePageSize(size: number) {
    this._currentSize.set(size);
    this._currentPage.set(1);
  }

  resetFilters() {
    const initial: CavernRelicSearchForm = {
      name: '',
      effect: '',
      sortBy: '',
      sortDirection: '',
    };
    this.searchForm().reset(initial);
    this._currentPage.set(1);
  }

  private areCavernRelicsEmpty(): boolean {
    return !this.cavernRelics()?.data?.length;
  }

}
