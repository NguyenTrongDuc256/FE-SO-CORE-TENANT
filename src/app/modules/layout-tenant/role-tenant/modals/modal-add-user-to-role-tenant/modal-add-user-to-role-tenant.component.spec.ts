import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { RoleTenantModule } from '../../role-tenant.module';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment.firebase';
import { ModalAddUserToRoleTenantComponent } from './modal-add-user-to-role-tenant.component';

describe('ModalAssignPermissionComponent', () => {
  let component: ModalAddUserToRoleTenantComponent;
  let fixture: ComponentFixture<ModalAddUserToRoleTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddUserToRoleTenantComponent],
      imports: [
        RouterTestingModule,
        CoreModule,
        RoleTenantModule,
        getTranslocoModule(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
      ],
      providers: [
        NgbActiveModal,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddUserToRoleTenantComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        roleId: '0012300-3434-2312',
        nameRole: 'Role 1',
        codeRole: 'OMT',
        layoutCode: 'staff',
        listUsers: [],
        collectionSize: 0,
        listSchools: [],
        listCampus: [],
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map true name layout', () => {
    component.isLoading = false;
    component.dataFromParent.layoutCode = 'staff';
    fixture.detectChanges();
    expect(component.mapNameLayout()).toEqual('Cán bộ, nhân viên');
  });

  it('should map false name layout', () => {
    component.isLoading = false;
    component.dataFromParent.layoutCode = '';
    fixture.detectChanges();
    expect(component.mapNameLayout()).toEqual('--');
  });
});
