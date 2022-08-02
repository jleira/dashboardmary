import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteporusuarioComponent } from './reporteporusuario.component';

describe('ReporteporusuarioComponent', () => {
  let component: ReporteporusuarioComponent;
  let fixture: ComponentFixture<ReporteporusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteporusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteporusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
