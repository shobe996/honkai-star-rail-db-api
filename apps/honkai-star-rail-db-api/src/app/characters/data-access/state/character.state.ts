import {
  Character,
  CharacterSearchCriteria,
  PaginatedResult,
  Path,
  Type,
  Rarity,
  Faction,
} from 'honkai-star-rail-db/models';

/**
 * State interface for the character feature.
 */
export interface CharacterState {
  /**
   * Paginated list of characters.
   */
  characters: PaginatedResult<Character>;

  /**
   * Search criteria for filtering characters.
   */
  searchCriteria: CharacterSearchCriteria;

  /**
   * Currently selected character.
   */
  selectedCharacter: Character;

  /**
   * Current page number for pagination.
   */
  page: number;
  /**
   * Number of items per page for pagination.
   */
  size: number;

  /**
   * Field by which to sort characters.
   */
  by?: string;

  /**
   * Direction of sorting (e.g., 'asc' or 'desc').
   */
  direction?: string;

  /**
   * List of character paths.
   */
  paths: Path[];

  /**
   * List of character types.
   */
  types: Type[];

  /**
   * List of character rarities.
   */
  rarities: Rarity[];

  /**
   * List of character factions.
   */
  factions: Faction[];
}

export const initialCharacterState: CharacterState = {
  characters: {} as PaginatedResult<Character>,
  paths: [],
  types: [],
  rarities: [],
  factions: [],
  searchCriteria: {} as CharacterSearchCriteria,
  selectedCharacter: {} as Character,
  page: 1,
  size: 9,
  by: undefined,
  direction: undefined,
};
