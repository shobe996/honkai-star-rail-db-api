import { createAction, props } from '@ngrx/store';
import {
  PaginatedResult,
  PlanarOrnament,
  PlanarOrnamentSearchCriteria,
} from 'honkai-star-rail-db/models';

export const planarOrnamentActions = {
  loadPlanarOrnaments: createAction(
    '[Planar Ornament] Load Planar Ornaments',
    props<{
      searchCriteria: PlanarOrnamentSearchCriteria;
      page: number;
      size: number;
      by?: string;
      direction?: string;
    }>(),
  ),
  loadPlanarOrnamentsSuccess: createAction(
    '[Planar Ornament] Load Planar Ornaments Success',
    props<{ planarOrnaments: PaginatedResult<PlanarOrnament> }>(),
  ),
  loadPlanarOrnamentDetails: createAction(
    '[Planar Ornament] Load Planar Ornament Details',
    props<{ selectedPlanarOrnament: PlanarOrnament }>(),
  ),
};
