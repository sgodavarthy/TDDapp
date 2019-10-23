import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPortalComponent } from './member-portal.component';

describe('MemberPortalComponent', () => {
  let component: MemberPortalComponent;
  let fixture: ComponentFixture<MemberPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
