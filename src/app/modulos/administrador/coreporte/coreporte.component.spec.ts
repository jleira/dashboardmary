import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoreporteComponent } from './coreporte.component';

describe('CoreporteComponent', () => {
  let component: CoreporteComponent;
  let fixture: ComponentFixture<CoreporteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
