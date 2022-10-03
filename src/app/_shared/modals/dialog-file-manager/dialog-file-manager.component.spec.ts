import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogFileManagerComponent } from './dialog-file-manager.component';

describe('DialogFileManagerComponent', () => {
  let component: DialogFileManagerComponent;
  let fixture: ComponentFixture<DialogFileManagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFileManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
