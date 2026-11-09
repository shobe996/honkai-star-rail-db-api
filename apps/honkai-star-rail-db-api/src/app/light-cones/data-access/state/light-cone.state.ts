import {
  LightCone,
  LightConeSearchCriteria,
  PaginatedResult,
  Path,
  Rarity,
} from 'honkai-star-rail-db/models';

export interface LightConeState {
  lightCones: PaginatedResult<LightCone>;
  searchCriteria: LightConeSearchCriteria;
  selectedLightCone: LightCone;
  page: number;
  size: number;
  by?: string;
  direction?: string;
  paths: Path[];
  rarities: Rarity[];
}

export const initialLightConeState: LightConeState = {
  lightCones: {} as PaginatedResult<LightCone>,
  paths: [],
  rarities: [],
  searchCriteria: {} as LightConeSearchCriteria,
  selectedLightCone: {} as LightCone,
  page: 1,
  size: 9,
  by: undefined,
  direction: undefined,
};
