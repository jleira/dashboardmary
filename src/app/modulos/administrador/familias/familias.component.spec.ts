import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FamiliasComponent } from './familias.component';

describe('FamiliasComponent', () => {
  let component: FamiliasComponent;
  let fixture: ComponentFixture<FamiliasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
