import { createReducer, on } from '@ngrx/store';
import { planarOrnamentActions } from './planar-ornament.actions';
import { initialPlanarOrnamentState } from './planar-ornament.state';

export const planarOrnamentReducer = createReducer(
  initialPlanarOrnamentState,
  on(
    planarOrnamentActions.loadPlanarOrnaments,
    (state, { searchCriteria, page, size, by, direction }) => ({
      ...state,
      searchCriteria,
      page,
      size,
      by,
      direction,
    }),
  ),
  on(
    planarOrnamentActions.loadPlanarOrnamentsSuccess,
    (state, { planarOrnaments }) => ({
      ...state,
      planarOrnaments,
    }),
  ),
  on(planarOrnamentActions.loadPlanarOrnamentDetails, (state, { selectedPlanarOrnament }) => ({
    ...state,
    selectedPlanarOrnament,
  }))
);
