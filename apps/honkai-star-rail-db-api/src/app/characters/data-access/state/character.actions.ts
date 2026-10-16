import { createAction, props } from '@ngrx/store';
import {
  CharacterSearchCriteria,
  PaginatedResult,
  Character,
  SortOptions,
} from 'honkai-star-rail-db/models';

export const characterActions = {
  loadCharacters: createAction(
    '[Character] Load Characters',
    props<{ searchCriteria: CharacterSearchCriteria, page: number, size: number, sortOptions?: SortOptions<Character> }>(),
  ),
  loadCharactersSuccess: createAction(
    '[Character] Load Characters Success',
    props<{ characters: PaginatedResult<Character> }>(),
  ),
  selectCharacter: createAction(
    '[Character] Select Character',
    props<{ character: Character }>(),
  ),
};
