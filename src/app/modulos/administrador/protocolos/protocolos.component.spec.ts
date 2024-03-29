import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProtocolosComponent } from './protocolos.component';

describe('ProtocolosComponent', () => {
  let component: ProtocolosComponent;
  let fixture: ComponentFixture<ProtocolosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
