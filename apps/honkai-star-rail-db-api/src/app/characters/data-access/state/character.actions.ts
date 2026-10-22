import { createAction, props } from '@ngrx/store';
import {
  CharacterSearchCriteria,
  PaginatedResult,
  Character,
  Path,
  Type,
  Rarity,
  Faction,
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

  loadTypes: createAction(
    '[Character] Load Types',
  ),
  loadTypesSuccess: createAction(
    '[Character] Load Types Success',
    props<{ types: Type[] }>(),
  ),
  loadRarities: createAction(
    '[Character] Load Rarities',
  ),
  loadRaritiesSuccess: createAction(
    '[Character] Load Rarities Success',
    props<{ rarities: Rarity[] }>(),
  ), 
  loadFactions: createAction(
    '[Character] Load Factions',
  ),
  loadFactionsSuccess: createAction(
    '[Character] Load Factions Success',
    props<{ factions: Faction[] }>(),
  ),
  loadCharacterDetails: createAction(
    '[Character] Load Character Details',
    props<{ character: Character }>(),
  ),
};
