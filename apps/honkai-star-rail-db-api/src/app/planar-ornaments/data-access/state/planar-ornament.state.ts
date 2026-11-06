import {
    PaginatedResult,
    PlanarOrnament,
    PlanarOrnamentSearchCriteria,
  } from 'honkai-star-rail-db/models';
  
  export interface PlanarOrnamentState {
    planarOrnaments: PaginatedResult<PlanarOrnament>;
    searchCriteria: PlanarOrnamentSearchCriteria;
    selectedPlanarOrnament: PlanarOrnament;
    page: number;
    size: number;
    by?: string;
    direction?: string;
  }
  
  export const initialPlanarOrnamentState: PlanarOrnamentState = {
    planarOrnaments: {
      data: [],
      total: 0,
      hasMore: false,
      page: 1,
      size: 9,
    },
    page: 1,
    size: 9,
    searchCriteria: {} as PlanarOrnamentSearchCriteria,
    selectedPlanarOrnament: {} as PlanarOrnament,
    by: undefined,
    direction: undefined,
  };
  