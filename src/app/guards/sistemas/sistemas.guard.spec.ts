import { TestBed } from '@angular/core/testing';

import { SistemasGuard } from './sistemas.guard';

describe('SistemasGuard', () => {
  let guard: SistemasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SistemasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
