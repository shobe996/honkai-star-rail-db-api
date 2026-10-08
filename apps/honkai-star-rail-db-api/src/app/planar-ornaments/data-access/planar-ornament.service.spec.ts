import { TestBed } from '@angular/core/testing';
import { PlanarOrnamentService } from './planar-ornament.service';

describe('PlanarOrnamentsService', () => {
  let service: PlanarOrnamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanarOrnamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
