import { TestBed } from '@angular/core/testing';
import { CharacterDetailFacadeService } from './character-detail.facade.service';


describe('CharacterDetailListFacadeService', () => {
  let service: CharacterDetailFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterDetailFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
