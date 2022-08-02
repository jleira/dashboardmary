import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreporteComponent } from './coreporte.component';

describe('CoreporteComponent', () => {
  let component: CoreporteComponent;
  let fixture: ComponentFixture<CoreporteComponent>;

  beforeEach(async(() => {
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
