import { Component, effect, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  CardComponent,
  FilterBarComponent,
  InputComponent,
  PaginatorComponent,
} from '@honkai-star-rail-db/webkit';
import { PlanarOrnamentSearchForm } from '../../data-access/planar-ornament-search-form-model';
import { PlanarOrnamentListFacadeService } from '../../data-access/planar-ornament-list.facade.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-component',
  imports: [
    CardComponent,
    PaginatorComponent,
    FilterBarComponent,
    InputComponent,
    FormField,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListComponent {
  private _planarOrnamentsListFacadeService = inject(PlanarOrnamentListFacadeService);
  private _router = inject(Router);

  private _currentPage = signal(1);
  private _currentSize = signal(9);

  searchFormModel = signal<PlanarOrnamentSearchForm>({
    name: '',
    effect: '',
  });

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
      const { name, effect } = this.searchForm().value();

      this._planarOrnamentsListFacadeService.filter(
        { name: name ?? '', effect: effect ?? '' },
        this._currentPage(),
        this._currentSize()
      );
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
    };
    this.searchForm().reset(initial);
    this._currentPage.set(1);
  }
}
