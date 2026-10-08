import { TestBed } from '@angular/core/testing';
import { PlanarOrnamentDetailFacadeService } from './planar-ornament-detail.facade.service';

describe('PlanarOrnamentDetailFacadeService', () => {
  let service: PlanarOrnamentDetailFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanarOrnamentDetailFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
