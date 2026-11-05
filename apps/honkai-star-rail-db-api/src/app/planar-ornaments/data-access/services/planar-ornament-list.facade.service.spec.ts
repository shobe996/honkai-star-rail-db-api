import { TestBed } from '@angular/core/testing';
import { PlanarOrnamentListFacadeService } from './planar-ornament-list.facade.service';

describe('PlanarOrnamentsListFacadeService', () => {
  let service: PlanarOrnamentListFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanarOrnamentListFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
