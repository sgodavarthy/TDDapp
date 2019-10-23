import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentShared } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponentShared;
  let fixture: ComponentFixture<LoginComponentShared>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponentShared ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponentShared);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
