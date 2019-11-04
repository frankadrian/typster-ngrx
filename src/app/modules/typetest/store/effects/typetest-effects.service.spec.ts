import { TestBed } from '@angular/core/testing';

import { TypetestEffectsService } from './typetest-effects.service';

describe('TypetestEffectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypetestEffectsService = TestBed.get(TypetestEffectsService);
    expect(service).toBeTruthy();
  });
});
