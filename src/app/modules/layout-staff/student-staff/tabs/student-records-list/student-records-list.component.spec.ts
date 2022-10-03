import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRecordsListComponent } from './student-records-list.component';

describe('StudentRecordsListComponent', () => {
  let component: StudentRecordsListComponent;
  let fixture: ComponentFixture<StudentRecordsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRecordsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRecordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
