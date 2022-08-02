import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleformularioComponent } from './detalleformulario.component';

describe('DetalleformularioComponent', () => {
  let component: DetalleformularioComponent;
  let fixture: ComponentFixture<DetalleformularioComponent>;

  beforeEach(async(() => {
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
