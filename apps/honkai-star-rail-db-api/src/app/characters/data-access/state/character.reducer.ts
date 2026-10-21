import { createReducer, on } from '@ngrx/store';
import { initialCharacterState } from './character.state';
import { characterActions } from './character.actions';

export const characterReducer = createReducer(
  initialCharacterState,
  on(characterActions.loadCharacters, (state, { searchCriteria, page, size, by, direction }) => ({
    ...state,
    searchCriteria,
    page,
    size,
    by,
    direction,
  })),
  on(characterActions.loadCharactersSuccess, (state, { characters }) => ({
    ...state,
    characters,
  })),
  on(characterActions.loadPathsSuccess, (state, { paths }) => ({
    ...state,
    paths,
  })),
);
