import { TestBed } from '@angular/core/testing';

import { LightConeService } from './light-cone.service';

describe('LightConeService', () => {
  let service: LightConeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightConeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
