import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  BadgeComponent,
  CardComponent,
  PaginatorComponent,
  FilterBarComponent,
  SelectComponent,
  InputComponent,
} from '@honkai-star-rail-db/webkit';
import { CharacterListFacadeService } from '../../data-access/character-list.facade.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { CharacterSearchForm } from '../../data-access/character-search-form.model';
import { Router } from '@angular/router';
import { characterRarityFilters, pathFilters, typeFilters, factionFilters } from 'honkai-star-rail-db/filters';
import { Character, CharacterSearchCriteria, SortOptions } from 'honkai-star-rail-db/models';


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
  private _characterListFacadeSerice = inject(CharacterListFacadeService);
  private _currentPage = signal(1);
  private _currentSize = signal(9);
  private _router = inject(Router);

  searchFormModel = signal<CharacterSearchForm>({
    name: '',
    description: '',
    path: '',
    type: '',
    rarity: '',
    faction: '',
    sortBy: '',
    sortDirection: '',
  });

  sortByOptions = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Rarity', value: 'rarity' },
    { label: 'Release Date', value: 'release_date' },
    { label: 'Faction', value: 'faction' },
    { label: 'Type', value: 'type' },
    { label: 'Path', value: 'path' },
  ];
  sortDirectionOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ];

  searchForm = form(this.searchFormModel);
  paths = pathFilters.all();
  types = typeFilters.all();
  rarities = characterRarityFilters.all();
  factions = factionFilters.all();
  toDetails(id: number) {
    this._router.navigate(['character', 'detail', id]);
  }
  statsToggleState = new Map<number, 'level1' | 'level80'>();
  viewModel = toSignal(this._characterListFacadeSerice.viewModel$, {
    initialValue: {
      characters: {
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
      const {
        name,
        description,
        path,
        type,
        rarity,
        faction,
        sortBy,
        sortDirection,
      } = this.searchForm().value();

      const criteria: CharacterSearchCriteria = {
        name: name ?? '',
        description: description ?? '',
        path: path ?? '',
        type: type ?? '',
        faction: faction ?? '',
        rarity: rarity ? Number.parseInt(rarity) : undefined,
      };

      if (sortBy && sortDirection) {
        const sortOptions: SortOptions<Character> = this.generateSortOptions(
          sortBy,
          sortDirection,
        );
        this._characterListFacadeSerice.filter(
          criteria,
          this._currentPage(),
          this._currentSize(),
          sortOptions,
        );
      } else {
        this._characterListFacadeSerice.filter(
          criteria,
          this._currentPage(),
          this._currentSize(),
        );
      }
    });
  }

  toggleStats(characterId: number) {
    const current = this.statsToggleState.get(characterId) || 'level1';
    this.statsToggleState.set(
      characterId,
      current === 'level1' ? 'level80' : 'level1',
    );
  }

  getStats(character: Character, id: number) {
    const level = this.statsToggleState.get(id) || 'level1';
    return character.stats[level];
  }

  goToPage(page: number) {
    this._currentPage.set(page);
  }

  updatePageSize(size: number) {
    this._currentSize.set(size);
    this._currentPage.set(1);
  }

  resetFilters() {
    const initial: CharacterSearchForm = {
      name: '',
      description: '',
      path: '',
      type: '',
      rarity: '',
      faction: '',
      sortBy: '',
      sortDirection: '',
    };
    this.searchForm().reset(initial);
    this._currentPage.set(1);
  }

  private generateSortOptions(
    sortBy: string,
    sortDirection: string,
  ): SortOptions<Character> {
    const sortOptions: SortOptions<Character> = {} as SortOptions<Character>;
    if (sortBy && sortDirection) {
      switch (sortBy) {
        case 'id':
          sortOptions.by = (character) => character.id;
          break;
        case 'name':
          sortOptions.by = (character) => character.name;
          break;
        case 'rarity':
          sortOptions.by = (character) => character.rarity.value;
          break;
        case 'release_date':
          sortOptions.by = (character) => character.release_date;
          break;
        case 'faction':
          sortOptions.by = (character) => character.faction.name;
          break;
        case 'type':
          sortOptions.by = (character) => character.type.name;
          break;
        case 'path':
          sortOptions.by = (character) => character.path.name;
          break;
      }
      sortOptions.direction = sortDirection as 'asc' | 'desc';
    }
    return sortOptions;
  }
}
