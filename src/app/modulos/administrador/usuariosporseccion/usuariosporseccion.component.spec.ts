import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosporseccionComponent } from './usuariosporseccion.component';

describe('UsuariosporseccionComponent', () => {
  let component: UsuariosporseccionComponent;
  let fixture: ComponentFixture<UsuariosporseccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosporseccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosporseccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
