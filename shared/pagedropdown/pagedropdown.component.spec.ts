import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedropdownComponent } from './pagedropdown.component';

describe('PagedropdownComponent', () => {
  let component: PagedropdownComponent;
  let fixture: ComponentFixture<PagedropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagedropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
