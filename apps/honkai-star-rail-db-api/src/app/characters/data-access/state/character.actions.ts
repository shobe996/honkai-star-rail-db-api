import { createAction, props } from '@ngrx/store';
import {
  CharacterSearchCriteria,
  PaginatedResult,
  Character,
  Path,
} from 'honkai-star-rail-db/models';

export const characterActions = {
  loadCharacters: createAction(
    '[Character] Load Characters',
    props<{ searchCriteria: CharacterSearchCriteria, page: number, size: number, by?: string, direction?:  string }>(),
  ),
  loadCharactersSuccess: createAction(
    '[Character] Load Characters Success',
    props<{ characters: PaginatedResult<Character> }>(),
  ),
  selectCharacter: createAction(
    '[Character] Select Character',
    props<{ character: Character }>(),
  ),
  loadPaths: createAction(
    '[Character] Load Paths',
  ),
  loadPathsSuccess: createAction(
    '[Character] Load Paths Success',
    props<{ paths: Path[] }>(),
  ),
};
