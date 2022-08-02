import { TestBed } from '@angular/core/testing';

import { ConsultasGuard } from './consultas.guard';

describe('ConsultasGuard', () => {
  let guard: ConsultasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConsultasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
