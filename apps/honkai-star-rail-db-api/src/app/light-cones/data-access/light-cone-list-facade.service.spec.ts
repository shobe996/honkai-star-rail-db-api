import { TestBed } from '@angular/core/testing';

import { LightConeListFacadeService } from './light-cone-list-facade.service';

describe('LightConeFacade', () => {
  let service: LightConeListFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightConeListFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
