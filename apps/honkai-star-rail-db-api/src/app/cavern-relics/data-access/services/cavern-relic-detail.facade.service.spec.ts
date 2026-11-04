import { TestBed } from '@angular/core/testing';
import { CavernRelicDetailFacadeService } from './cavern-relic-detail.facade.service';

describe('CavernRelicDetailFacadeService', () => {
  let service: CavernRelicDetailFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CavernRelicDetailFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
