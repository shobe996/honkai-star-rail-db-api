import { TestBed } from '@angular/core/testing';

import { CharacterListFacadeService } from './character-list-facade.service';

describe('CharacterListFacadeService', () => {
  let service: CharacterListFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterListFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
