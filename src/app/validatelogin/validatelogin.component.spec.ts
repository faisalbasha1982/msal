import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateloginComponent } from './validatelogin.component';

describe('ValidateloginComponent', () => {
  let component: ValidateloginComponent;
  let fixture: ComponentFixture<ValidateloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
