import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TabAttendanceTeacherComponent} from "./tab-attendance-teacher.component";


describe('TabAttendanceTeacherComponent', () => {
  let component: TabAttendanceTeacherComponent;
  let fixture: ComponentFixture<TabAttendanceTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAttendanceTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAttendanceTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
