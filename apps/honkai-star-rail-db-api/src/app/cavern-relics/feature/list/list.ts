import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CavernRelicSearchForm } from '../../data-access/cavern-relic-search-form.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { CardComponent, FilterBarComponent, InputComponent, PaginatorComponent } from '@honkai-star-rail-db/webkit';
import { CavernRelicListFacadeService } from '../../data-access/cavern-relic-list.facade.service';

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
  });

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
      const { name, effect } = this.searchForm().value();

      this._cavernRelicListFacadeService.filter(
        { name: name ?? '', effect: effect ?? '' },
        this._currentPage(),
        this._currentSize()
      );
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
    };
    this.searchForm().reset(initial);
    this._currentPage.set(1);
  }
}
