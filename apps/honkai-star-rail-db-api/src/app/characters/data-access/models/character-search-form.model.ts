import { DateRangeArray } from '@honkai-star-rail-db/webkit';

/**
 * Interface representing the search form for characters.
 */
export interface CharacterSearchForm {
  /**
   * The name of the character.
   */
  name: string;

  /**
   * The description of the character.
   */
  description: string;

  /**
   * The path of the character.
   */
  path: string;

  /**
   * The type of the character.
   */
  type: string;

  /**
   * The rarity of the character.
   */
  rarity: string;

  /**
   * The faction of the character.
   */
  faction: string;

  /**
   * The release date of the character.
   */
  releaseDate: Date | null;

  /**
   * The date range for the character's release date.
   */
  dateRange: DateRangeArray | null;

  /**
   * The field to sort by.
   */
  sortBy: string;

  /**
   * The direction to sort by.
   */
  sortDirection: string;
}
