import { TestBed } from '@angular/core/testing';

import { CavernRelicService } from './cavern-relic.service';

describe('CavernRelicService', () => {
  let service: CavernRelicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CavernRelicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
