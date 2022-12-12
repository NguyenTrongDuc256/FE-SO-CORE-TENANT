import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassListTeacherComponent } from './class-list-teacher.component';

describe('ClassListTeacherComponent', () => {
  let component: ClassListTeacherComponent;
  let fixture: ComponentFixture<ClassListTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassListTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassListTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
