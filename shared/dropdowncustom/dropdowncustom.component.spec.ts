import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdowncustomComponent } from './dropdowncustom.component';

describe('DropdowncustomComponent', () => {
  let component: DropdowncustomComponent;
  let fixture: ComponentFixture<DropdowncustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdowncustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdowncustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
