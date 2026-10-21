import {
  Character,
  CharacterSearchCriteria,
  PaginatedResult,
  Path,
} from 'honkai-star-rail-db/models';

export interface CharacterState {
  characters: PaginatedResult<Character>;
  searchCriteria: CharacterSearchCriteria;
  selectedCharacter: Character;
  page: number;
  size: number;
  by?: string;
  direction?: string;
  paths: Path[];
}

export const initialCharacterState: CharacterState = {
  characters: {
    data: [],
    hasMore: false,
    page: 1,
    size: 9,
    total: 0,
  } as PaginatedResult<Character>,
  paths: [],
  searchCriteria: {} as CharacterSearchCriteria,
  selectedCharacter: {} as Character,
  page: 1,
  size: 9,
  by: undefined,
  direction: undefined,
} as CharacterState;
