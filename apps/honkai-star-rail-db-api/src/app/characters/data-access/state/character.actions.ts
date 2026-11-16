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

/**
 * Actions for managing character state.
 */
export const characterActions = {
  /**
   * Loads characters based on the given search criteria, pagination, and sorting options.
   * @prop searchCriteria The search criteria for filtering characters.
   * @prop page The current page number for pagination.
   * @prop size The number of items per page for pagination.
   * @prop by Optional field by which to sort characters.
   * @prop direction Optional direction of sorting (e.g., 'asc' or 'desc').
   */
  loadCharacters: createAction(
    '[Character] Load Characters',
    props<{
      searchCriteria: CharacterSearchCriteria;
      page: number;
      size: number;
      by?: string;
      direction?: string;
    }>(),
  ),

  /**
   * Action dispatched when characters are successfully loaded.
   * @prop characters The paginated result of characters.
   */
  loadCharactersSuccess: createAction(
    '[Character] Load Characters Success',
    props<{ characters: PaginatedResult<Character> }>(),
  ),

  /**
   * Loads all available paths for characters.
   */
  loadPaths: createAction('[Character] Load Paths'),

  /**
   * Loads all available paths for characters.
   * @prop paths The available paths for characters.
   */
  loadPathsSuccess: createAction(
    '[Character] Load Paths Success',
    props<{ paths: Path[] }>(),
  ),

  /**
   * Loads all available types for characters.
   */
  loadTypes: createAction('[Character] Load Types'),

  /**
   * Loads all available types for characters.
   * @prop types The available types for characters.
   */
  loadTypesSuccess: createAction(
    '[Character] Load Types Success',
    props<{ types: Type[] }>(),
  ),

  /**
   * Loads all available rarities for characters.
   */
  loadRarities: createAction('[Character] Load Rarities'),

  /**
   * Loads all available rarities for characters.
   * @prop rarities The available rarities for characters.
   */
  loadRaritiesSuccess: createAction(
    '[Character] Load Rarities Success',
    props<{ rarities: Rarity[] }>(),
  ),

  /**
   * Loads all available factions for characters.
   */
  loadFactions: createAction('[Character] Load Factions'),

  /**
   * Loads all available factions for characters.
   * @prop factions The available factions for characters.
   */
  loadFactionsSuccess: createAction(
    '[Character] Load Factions Success',
    props<{ factions: Faction[] }>(),
  ),

  /**
   * Loads the details of a specific character.
   * @prop character The character to load details for.
   */
  loadCharacterDetails: createAction(
    '[Character] Load Character Details',
    props<{ character: Character }>(),
  ),

  /**
   * Updates the current page number for pagination.
   * @prop page The new page number.
   */
  updatePage: createAction(
    '[Cavern Relic] Update Page',
    props<{ page: number }>(),
  ),
  
  /**
   * Updates the number of items per page for pagination.
   * @prop size The new page size.
   */
  updateSize: createAction(
    '[Cavern Relic] Update Size',
    props<{ size: number }>(),
  ),
};
