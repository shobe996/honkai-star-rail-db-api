import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CavernRelicSearchForm } from '../../data-access/cavern-relic-search-form.model';
import type { CavernRelicSearchCriteria } from 'honkai-star-rail-db/dist/types/cavern-relics/cavern-relic-criteria.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import {
  CardComponent,
  FilterBarComponent,
  InputComponent,
  PaginatorComponent,
  SelectComponent,
} from '@honkai-star-rail-db/webkit';
import { CavernRelicListFacadeService } from '../../data-access/cavern-relic-list.facade.service';
import { SortOptions } from 'honkai-star-rail-db/dist/filters/base.filters';
import { CavernRelic } from 'honkai-star-rail-db';

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

  private _currentPage = signal(1);
  private _currentSize = signal(9);

  searchFormModel = signal<CavernRelicSearchForm>({
    name: '',
    effect: '',
    sortBy: '',
    sortDirection: '',
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

  viewModel = toSignal(this._cavernRelicListFacadeService.viewModel$, {
    initialValue: {
      cavernRelics: {
        data: [],
        total: 0,
        hasMore: false,
        page: 0,
        size: 0,
      },
    },
  });

  constructor() {
    effect(() => {
      const { name, effect, sortBy, sortDirection } = this.searchForm().value();

      const criteria: CavernRelicSearchCriteria = {
        name: name ?? '',
        effect: effect ?? '',
      };

      if (sortBy && sortDirection) {
        const sortOptions: SortOptions<CavernRelic> = this.generateSortOptions(
          sortBy,
          sortDirection,
        );
        this._cavernRelicListFacadeService.filter(
          criteria,
          this._currentPage(),
          this._currentSize(),
          sortOptions,
        );
      } else {
        this._cavernRelicListFacadeService.filter(
          criteria,
          this._currentPage(),
          this._currentSize(),
        );
      }
    });
  }

  toDetails(id: number) {
    this._router.navigate(['cavern-relic', 'detail', id]);
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

  private generateSortOptions(
    sortBy: string,
    sortDirection: string,
  ): SortOptions<CavernRelic> {
    let sortOptions: SortOptions<CavernRelic> = {} as SortOptions<CavernRelic>;
    if (sortBy && sortDirection) {
      switch (sortBy) {
        case 'id':
          sortOptions.by = (cavernRelic) => cavernRelic.id;
          break;
        case 'name':
          sortOptions.by = (cavernRelic) => cavernRelic.name;
          break;
        case 'two_set_effect':
          sortOptions.by = (cavernRelic) => cavernRelic.two_set_effect;
          break;
        case 'four_set_effect':
          sortOptions.by = (cavernRelic) => cavernRelic.four_set_effect;
          break;
      }
      sortOptions.direction = sortDirection as 'asc' | 'desc';
    }
    return sortOptions;
  }
}
