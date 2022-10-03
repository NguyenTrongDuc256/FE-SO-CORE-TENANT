import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSubjectTenantComponent } from './list-subject-tenant.component';

describe('ListSubjectComponent', () => {
  let component: ListSubjectTenantComponent;
  let fixture: ComponentFixture<ListSubjectTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSubjectTenantComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubjectTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
