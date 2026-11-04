import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { LightConeListFacadeService } from '../../data-access/services/light-cone-list.facade.service';
import { LightConeSearchForm } from '../../data-access/models/light-cone-search-form.model';
import {
  LightCone,
  LightConeSearchCriteria,
} from 'honkai-star-rail-db/models';
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
  private _lightConeListFacadeSerice = inject(LightConeListFacadeService);
  private _router = inject(Router);
  private _store = inject(Store);

  private _storeCriteria = this._store.selectSignal(
    lightConeSelectors.selectSearchCriteria,
  );
  private _storeSortOptions = this._store.selectSignal(
    lightConeSelectors.selectSortOptions,
  );
  private _storePage = this._store.selectSignal(lightConeSelectors.selectPage);
  private _storeSize = this._store.selectSignal(lightConeSelectors.selectSize);

  private _currentPage = signal(1);
  private _currentSize = signal(9);

  searchFormModel = signal<LightConeSearchForm>({
    name: this._storeCriteria().name ?? '',
    path: this._storeCriteria().path ?? '',
    rarity: this._storeCriteria().rarity
      ? this._storeCriteria().rarity + '-Star'
      : '',
    effect: this._storeCriteria().effect ?? '',
    sortBy: this._storeSortOptions().by ?? '',
    sortDirection: this._storeSortOptions().direction ?? '',
  });

  sortByOptions = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Rarity', value: 'rarity' },
    { label: 'Path', value: 'path' },
  ];
  sortDirectionOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  searchForm = form(this.searchFormModel);
  lightCones = this._store.selectSignal(lightConeSelectors.selectLightCones);
  paths = this._store.selectSignal(lightConeSelectors.selectPaths);
  rarities = this._store.selectSignal(lightConeSelectors.selectRarities);

  private isInitialized = false;

  statsToggleState = new Map<number, 'level1' | 'level80'>();

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
      this.loadLightCones();
    });
  }

  toDetails(lightCone: LightCone) {
    this._lightConeListFacadeSerice.goToDetails(lightCone);
    this._router.navigate(['light-cone', 'detail', lightCone.id]);
  }

  private loadLightCones(): void {
    const { name, effect, path, rarity, sortBy, sortDirection } =
      this.searchForm().value();

    const criteria: LightConeSearchCriteria = {
      name: name ?? '',
      effect: effect ?? '',
      path: path ?? '',
      rarity: rarity ? Number.parseInt(rarity) : undefined,
    };

    this._lightConeListFacadeSerice.filter(
      criteria,
      this._currentPage(),
      this._currentSize(),
      sortBy,
      sortDirection,
    );
  }

  toggleStats(lightConeId: number) {
    const current = this.statsToggleState.get(lightConeId) || 'level1';
    this.statsToggleState.set(
      lightConeId,
      current === 'level1' ? 'level80' : 'level1',
    );
  }

  getStats(lightCone: LightCone, id: number) {
    const level = this.statsToggleState.get(id) || 'level1';
    return lightCone.stats[level];
  }

  goToPage(page: number) {
    this._currentPage.set(page);
  }

  updatePageSize(size: number) {
    this._currentSize.set(size);
    this._currentPage.set(1);
  }

  resetFilters() {
    const initial: LightConeSearchForm = {
      name: '',
      path: '',
      rarity: '',
      effect: '',
      sortBy: '',
      sortDirection: '',
    };
    this.searchForm().reset(initial);
    this._currentPage.set(1);
  }

  private _loadOptions() {
    if (this.areLightConesEmpty()) {
      this.loadLightCones();
    }

    if (this.arePathsEmpty()) {
      this._lightConeListFacadeSerice.getPaths();
    }

    if (this.areRaritiesEmpty()) {
      this._lightConeListFacadeSerice.getRarities();
    }
  }

  private areLightConesEmpty(): boolean {
    return !this.lightCones()?.data?.length;
  }

  private arePathsEmpty(): boolean {
    return !this.paths().length;
  }

  private areRaritiesEmpty(): boolean {
    return !this.rarities().length;
  }
}
