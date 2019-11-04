import { TestBed } from '@angular/core/testing';

import { TypetestResultResolverService } from './typetest-result-resolver.service';

describe('TypetestResultResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypetestResultResolverService = TestBed.get(TypetestResultResolverService);
    expect(service).toBeTruthy();
  });
});
