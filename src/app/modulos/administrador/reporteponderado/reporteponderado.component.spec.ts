import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteponderadoComponent } from './reporteponderado.component';

describe('ReporteponderadoComponent', () => {
  let component: ReporteponderadoComponent;
  let fixture: ComponentFixture<ReporteponderadoComponent>;

  beforeEach(async(() => {
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
