import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopstatusBarComponent } from './topstatus-bar.component';

describe('TopstatusBarComponent', () => {
  let component: TopstatusBarComponent;
  let fixture: ComponentFixture<TopstatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopstatusBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopstatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
