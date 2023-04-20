import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsuariosporseccionComponent } from './usuariosporseccion.component';

describe('UsuariosporseccionComponent', () => {
  let component: UsuariosporseccionComponent;
  let fixture: ComponentFixture<UsuariosporseccionComponent>;

  beforeEach(waitForAsync(() => {
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
