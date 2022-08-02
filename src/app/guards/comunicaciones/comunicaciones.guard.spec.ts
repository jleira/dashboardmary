import { TestBed } from '@angular/core/testing';

import { ComunicacionesGuard } from './comunicaciones.guard';

describe('ComunicacionesGuard', () => {
  let guard: ComunicacionesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComunicacionesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
