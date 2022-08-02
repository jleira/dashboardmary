import { TestBed } from '@angular/core/testing';

import { EnfermeriaGuard } from './enfermeria.guard';

describe('EnfermeriaGuard', () => {
  let guard: EnfermeriaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnfermeriaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
