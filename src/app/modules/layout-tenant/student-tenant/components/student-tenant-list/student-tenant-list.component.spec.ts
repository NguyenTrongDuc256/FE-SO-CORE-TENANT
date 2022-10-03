import { ComponentFixture, TestBed } from '@angular/core/testing';
import {StudentTenantListComponent} from "./student-tenant-list.component";

describe('StudentIndexComponent', () => {
  let component: StudentTenantListComponent;
  let fixture: ComponentFixture<StudentTenantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTenantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
