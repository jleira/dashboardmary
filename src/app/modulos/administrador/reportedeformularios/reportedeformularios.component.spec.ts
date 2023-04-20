import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportedeformulariosComponent } from './reportedeformularios.component';

describe('ReportedeformulariosComponent', () => {
  let component: ReportedeformulariosComponent;
  let fixture: ComponentFixture<ReportedeformulariosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedeformulariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedeformulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
