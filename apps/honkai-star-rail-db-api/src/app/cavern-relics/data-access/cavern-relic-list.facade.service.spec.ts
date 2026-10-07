import { TestBed } from '@angular/core/testing';

import { CavernRelicListFacadeService } from './cavern-relic-list.facade.service';

describe('CavernRelicListFacadeService', () => {
  let service: CavernRelicListFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CavernRelicListFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
