import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TendenciasComponent } from './tendencias.component';

describe('TendenciasComponent', () => {
  let component: TendenciasComponent;
  let fixture: ComponentFixture<TendenciasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TendenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TendenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
