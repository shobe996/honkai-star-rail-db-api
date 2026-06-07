import { TestBed } from '@angular/core/testing';

import { LightConeDetailFacadeService } from './light-cone-detail-facade.service';

describe('LightConeDetailFacadeService', () => {
  let service: LightConeDetailFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightConeDetailFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
