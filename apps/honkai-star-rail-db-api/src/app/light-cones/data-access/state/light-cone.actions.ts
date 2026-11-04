import { createAction, props } from '@ngrx/store';
import {
  LightConeSearchCriteria,
  PaginatedResult,
  LightCone,
  Path,
  Type,
  Rarity,
  Faction,
} from 'honkai-star-rail-db/models';

export const lightConeActions = {
  loadLightCones: createAction(
    '[LightCone] Load LightCones',
    props<{ searchCriteria: LightConeSearchCriteria, page: number, size: number, by?: string, direction?:  string }>(),
  ),
  loadLightConesSuccess: createAction(
    '[LightCone] Load LightCones Success',
    props<{ lightCones: PaginatedResult<LightCone> }>(),
  ),
  selectLightCone: createAction(
    '[LightCone] Select LightCone',
    props<{ lightCone: LightCone }>(),
  ),
  loadPaths: createAction(
    '[LightCone] Load Paths',
  ),
  loadPathsSuccess: createAction(
    '[LightCone] Load Paths Success',
    props<{ paths: Path[] }>(),
  ),

  loadTypes: createAction(
    '[LightCone] Load Types',
  ),
  loadTypesSuccess: createAction(
    '[LightCone] Load Types Success',
    props<{ types: Type[] }>(),
  ),
  loadRarities: createAction(
    '[LightCone] Load Rarities',
  ),
  loadRaritiesSuccess: createAction(
    '[LightCone] Load Rarities Success',
    props<{ rarities: Rarity[] }>(),
  ), 
  loadFactions: createAction(
    '[LightCone] Load Factions',
  ),
  loadFactionsSuccess: createAction(
    '[LightCone] Load Factions Success',
    props<{ factions: Faction[] }>(),
  ),
  loadLightConeDetails: createAction(
    '[LightCone] Load LightCone Details',
    props<{ lightCone: LightCone }>(),
  ),
};
