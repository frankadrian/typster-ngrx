import { TestBed } from '@angular/core/testing';

import { TypetestService } from './typetest.service';

describe('TypetestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypetestService = TestBed.get(TypetestService);
    expect(service).toBeTruthy();
  });
});
