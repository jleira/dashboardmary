import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReporteponderadoComponent } from './reporteponderado.component';

describe('ReporteponderadoComponent', () => {
  let component: ReporteponderadoComponent;
  let fixture: ComponentFixture<ReporteponderadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteponderadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteponderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
