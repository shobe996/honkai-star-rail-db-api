import {
    Character,
    CharacterSearchCriteria,
    PaginatedResult,
  } from 'honkai-star-rail-db/models';
  
  export interface CharacterState {
    characters: PaginatedResult<Character>;
    searchCriteria: CharacterSearchCriteria;
    selectedCharacter: Character;
    page: number;
    size: number;
  }
  
  export const initialCharacterState: CharacterState = {
    characters: {
      data: [],
      hasMore: false,
      page: 1,
      size: 9,
      total: 0,
    } as PaginatedResult<Character>,
    searchCriteria: {} as CharacterSearchCriteria,
    selectedCharacter: {} as Character,
    page: 1,
    size: 9,
  } as CharacterState;
  