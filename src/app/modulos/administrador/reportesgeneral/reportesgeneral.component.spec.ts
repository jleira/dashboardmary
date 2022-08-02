import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesgeneralComponent } from './reportesgeneral.component';

describe('ReportesgeneralComponent', () => {
  let component: ReportesgeneralComponent;
  let fixture: ComponentFixture<ReportesgeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesgeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesgeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
