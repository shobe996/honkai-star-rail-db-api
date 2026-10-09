import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { LightConeListFacadeService } from '../../data-access/light-cone-list.facade.service';
import { LightConeSearchForm } from '../../data-access/light-cone-search-form.model';
import {
  LightCone,
  lightConeRarityFilters,
  pathFilters,
} from 'honkai-star-rail-db';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { LightConeSearchCriteria } from 'honkai-star-rail-db/dist/types/light-cones';
import {
  BadgeComponent,
  CardComponent,
  FilterBarComponent,
  InputComponent,
  PaginatorComponent,
  SelectComponent,
} from '@honkai-star-rail-db/webkit';
import { Router } from '@angular/router';
import { SortOptions } from 'honkai-star-rail-db/dist/filters/base.filters';

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
  private _currentPage = signal(1);
  private _currentSize = signal(9);

  searchFormModel = signal<LightConeSearchForm>({
    name: '',
    path: '',
    rarity: '',
    effect: '',
    sortBy: '',
    sortDirection: '',
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
  paths = pathFilters.all();
  rarities = lightConeRarityFilters.all();
  toDetails(id: number) {
    this._router.navigate(['light-cone', 'detail', id]);
  }
  statsToggleState = new Map<number, 'level1' | 'level80'>();
  viewModel = toSignal(this._lightConeListFacadeSerice.viewModel$, {
    initialValue: {
      lightCones: {
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
      const { name, path, rarity, effect, sortBy, sortDirection } =
        this.searchForm().value();

      const criteria: LightConeSearchCriteria = {
        name: name ?? '',
        path: path ?? '',
        effect: effect ?? '',
        rarity: rarity ? Number.parseInt(rarity) : undefined,
      };

      if (sortBy && sortDirection) {
        const sortOptions: SortOptions<LightCone> = this.generateSortOptions(
          sortBy,
          sortDirection,
        );
        this._lightConeListFacadeSerice.filter(
          criteria,
          this._currentPage(),
          this._currentSize(),
          sortOptions,
        );
      } else {
        this._lightConeListFacadeSerice.filter(
          criteria,
          this._currentPage(),
          this._currentSize(),
        );
      }
    });
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

  private generateSortOptions(
    sortBy: string,
    sortDirection: string,
  ): SortOptions<LightCone> {
    let sortOptions: SortOptions<LightCone> = {} as SortOptions<LightCone>;
    if (sortBy && sortDirection) {
      switch (sortBy) {
        case 'id':
          sortOptions.by = (lightCone) => lightCone.id;
          break;
        case 'name':
          sortOptions.by = (lightCone) => lightCone.name;
          break;
        case 'rarity':
          sortOptions.by = (lightCone) => lightCone.rarity.value;
          break;
        case 'path':
          sortOptions.by = (lightCone) => lightCone.path.name;
          break;
      }
      sortOptions.direction = sortDirection as 'asc' | 'desc';
    }
    return sortOptions;
  }
}
