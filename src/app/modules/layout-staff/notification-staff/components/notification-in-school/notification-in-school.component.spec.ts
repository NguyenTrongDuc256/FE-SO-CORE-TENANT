import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationInSchoolComponent } from './notification-in-school.component';

describe('NotificationInSchoolComponent', () => {
  let component: NotificationInSchoolComponent;
  let fixture: ComponentFixture<NotificationInSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationInSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationInSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
