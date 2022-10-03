import { SchoolYearListTenantComponent } from './school-year-list-tenant.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('SchoolYearListTenantComponent', () => {
  let component: SchoolYearListTenantComponent;
  let fixture: ComponentFixture<SchoolYearListTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolYearListTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearListTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
