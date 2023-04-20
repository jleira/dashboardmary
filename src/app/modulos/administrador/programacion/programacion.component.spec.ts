import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgramacionComponent } from './programacion.component';

describe('ProgramacionComponent', () => {
  let component: ProgramacionComponent;
  let fixture: ComponentFixture<ProgramacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
