import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportesgeneralComponent } from './reportesgeneral.component';

describe('ReportesgeneralComponent', () => {
  let component: ReportesgeneralComponent;
  let fixture: ComponentFixture<ReportesgeneralComponent>;

  beforeEach(waitForAsync(() => {
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
