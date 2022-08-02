import { TestBed } from '@angular/core/testing';

import { PerfiladministradorGuard } from './perfiladministrador.guard';

describe('PerfiladministradorGuard', () => {
  let guard: PerfiladministradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PerfiladministradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
