import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariossupervisionComponent } from './usuariossupervision.component';

describe('UsuariossupervisionComponent', () => {
  let component: UsuariossupervisionComponent;
  let fixture: ComponentFixture<UsuariossupervisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariossupervisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariossupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
