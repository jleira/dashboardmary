import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrecuenciaComponent } from './frecuencia.component';

describe('FrecuenciaComponent', () => {
  let component: FrecuenciaComponent;
  let fixture: ComponentFixture<FrecuenciaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrecuenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrecuenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
