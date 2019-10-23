import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDirectoryCellComponent } from './program-directory-cell.component';

describe('ProgramDirectoryCellComponent', () => {
  let component: ProgramDirectoryCellComponent;
  let fixture: ComponentFixture<ProgramDirectoryCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDirectoryCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDirectoryCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
