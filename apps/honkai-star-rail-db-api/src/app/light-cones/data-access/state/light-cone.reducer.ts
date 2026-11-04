import { createReducer, on } from '@ngrx/store';
import { initialLightConeState } from './light-cone.state';
import { lightConeActions } from './light-cone.actions';

export const lightConeReducer = createReducer(
  initialLightConeState,
  on(
    lightConeActions.loadLightCones,
    (state, { searchCriteria, page, size, by, direction }) => ({
      ...state,
      searchCriteria,
      page,
      size,
      by,
      direction,
    }),
  ),
  on(lightConeActions.loadLightConesSuccess, (state, { lightCones }) => ({
    ...state,
    lightCones,
  })),
  on(lightConeActions.loadPathsSuccess, (state, { paths }) => ({
    ...state,
    paths,
  })),
  on(lightConeActions.loadRaritiesSuccess, (state, { rarities }) => ({
    ...state,
    rarities,
  })),
  on(lightConeActions.loadLightConeDetails, (state, { lightCone }) => ({
    ...state,
    selectedLightCone: lightCone,
  })),
);
