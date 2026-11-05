import {
    CavernRelic,
    CavernRelicSearchCriteria,
    PaginatedResult,
  } from 'honkai-star-rail-db/models';
  
  export interface CavernRelicState {
    cavernRelics: PaginatedResult<CavernRelic>;
    searchCriteria: CavernRelicSearchCriteria;
    selectedCavernRelic: CavernRelic;
    page: number;
    size: number;
    by?: string;
    direction?: string;
  }
  
  export const initialCavernRelicState: CavernRelicState = {
    cavernRelics: {
      data: [],
      hasMore: false,
      page: 1,
      size: 9,
      total: 0,
    },
    searchCriteria: {} as CavernRelicSearchCriteria,
    selectedCavernRelic: {} as CavernRelic,
    page: 1,
    size: 9,
    by: undefined,
    direction: undefined,
  } as CavernRelicState;
  