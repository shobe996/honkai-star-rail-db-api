import { TestBed } from '@angular/core/testing';
import { RarityService } from './rarity.service';

describe('RarityService', () => {
  let service: RarityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RarityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
