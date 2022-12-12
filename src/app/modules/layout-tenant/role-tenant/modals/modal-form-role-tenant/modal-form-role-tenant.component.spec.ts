import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/app/_core/core.module';
import { environment } from 'src/environments/environment.firebase';

import { ModalFormRoleTenantComponent } from './modal-form-role-tenant.component';

describe('ModalCreateRoleComponent', () => {
  let component: ModalFormRoleTenantComponent;
  let fixture: ComponentFixture<ModalFormRoleTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormRoleTenantComponent ],
      imports: [
        CommonModule,
        CoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
      ],
      providers: [NgbActiveModal],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormRoleTenantComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        keyFirebaseAction: "create",
        keyFirebaseModule: "role",
        nameForm: "update",
        role: {
          code: 'admin123',
          description: "Quyền quản trị tenant",
          id: '01c6d050-766d-44f8-b85c-49d50b0cc68s',
          name: 'Admin',
          layout: 'admin',
          permissionNumber: 10,
          userNumber: 5
        }
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formRole.contains('name')).toBeTruthy();
    expect(component.formRole.contains('code')).toBeTruthy();
    expect(component.formRole.contains('requestLayout')).toBeTruthy();
    expect(component.formRole.contains('desc')).toBeTruthy();
  });

  it('Should form valid', () => {
    const form = component.formRole;
    form.patchValue({
      name: 'Role 1',
      code: 'OMT01',
      requestLayout: 'staff',
      desc: 'mô tả'
    });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid max length', () => {
    const control = component.formRole.controls['name'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid required', () => {
    const control = component.formRole.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid empty', () => {
    const control = component.formRole.controls['name'];
    control.setValue('     ');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid required', () => {
    const control = component.formRole.controls['code'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid regex', () => {
    const control = component.formRole.controls['code'];
    control.setValue('@ạ sdk_-');
    expect(control.invalid).toBeTruthy();
  });

  it('Should layout required', () => {
    const control = component.formRole.controls['requestLayout'];
    let input = null || 'null';
    control.setValue(input);
    expect(control.invalid).toBeTruthy();
  });

  it('should map true name layout', () => {
    component.dataFromParent.role.layout = 'staff';
    expect(component.mapNameLayout()).toEqual('Cán bộ, nhân viên');
  });

  it('should map false name layout', () => {
    component.dataFromParent.role.layouts = null;
    expect(component.mapNameLayout()).toEqual('--');
  });
});
