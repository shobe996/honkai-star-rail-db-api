import { Component, effect, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  CardComponent,
  FilterBarComponent,
  InputComponent,
  PaginatorComponent,
  SelectComponent,
} from '@honkai-star-rail-db/webkit';
import { PlanarOrnamentSearchForm } from '../../data-access/planar-ornament-search-form-model';
import { PlanarOrnamentListFacadeService } from '../../data-access/planar-ornament-list.facade.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PlanarOrnament } from 'honkai-star-rail-db';
import { SortOptions } from 'honkai-star-rail-db/dist/filters/base.filters';
import { PlanarOrnamentSearchCriteria } from 'honkai-star-rail-db/dist/types/planar-ornaments/planar-ornament-criteria.types';

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

  private _currentPage = signal(1);
  private _currentSize = signal(9);

  searchFormModel = signal<PlanarOrnamentSearchForm>({
    name: '',
    effect: '',
    sortBy: '',
    sortDirection: '',
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

  viewModel = toSignal(this._planarOrnamentsListFacadeService.viewModel$, {
    initialValue: {
      planarOrnaments: {
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

      const criteria: PlanarOrnamentSearchCriteria = {
        name: name ?? '',
        effect: effect ?? '',
      };

      if (sortBy && sortDirection) {
        const sortOptions: SortOptions<PlanarOrnament> =
          this.generateSortOptions(sortBy, sortDirection);

        this._planarOrnamentsListFacadeService.filter(
          criteria,
          this._currentPage(),
          this._currentSize(),
          sortOptions,
        );
      } else {
        this._planarOrnamentsListFacadeService.filter(
          criteria,
          this._currentPage(),
          this._currentSize(),
        );
      }
    });
  }

  toDetails(id: number) {
    this._router.navigate(['planar-ornament', 'detail', id]);
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

  private generateSortOptions(
    sortBy: string,
    sortDirection: string,
  ): SortOptions<PlanarOrnament> {
    let sortOptions: SortOptions<PlanarOrnament> =
      {} as SortOptions<PlanarOrnament>;
    if (sortBy && sortDirection) {
      switch (sortBy) {
        case 'id':
          sortOptions.by = (planarOrnament) => planarOrnament.id;
          break;
        case 'name':
          sortOptions.by = (planarOrnament) => planarOrnament.name;
          break;
        case 'two_set_effect':
          sortOptions.by = (planarOrnament) => planarOrnament.two_set_effect;
          break;
      }
      sortOptions.direction = sortDirection as 'asc' | 'desc';
    }
    return sortOptions;
  }
}
