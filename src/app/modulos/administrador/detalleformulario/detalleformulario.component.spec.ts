import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetalleformularioComponent } from './detalleformulario.component';

describe('DetalleformularioComponent', () => {
  let component: DetalleformularioComponent;
  let fixture: ComponentFixture<DetalleformularioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleformularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
