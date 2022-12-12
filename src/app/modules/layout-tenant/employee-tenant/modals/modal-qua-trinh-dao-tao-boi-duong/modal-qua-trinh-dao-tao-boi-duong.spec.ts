import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalQuaTrinhDaoTaoBoiDuongComponent} from "./modal-qua-trinh-dao-tao-boi-duong.component";
import {EmployeeTenantModule} from "../../employee-tenant.module";
import {EmployeeTenantRoutingModule} from "../../employee-tenant-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {CoreModule} from "../../../../../_core/core.module";
import {RoleTenantModule} from "../../../role-tenant/role-tenant.module";
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {TranslocoModule} from "@ngneat/transloco";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";


describe('ModalQuaTrinhDaoTaoBoiDuongComponent', () => {
  let component: ModalQuaTrinhDaoTaoBoiDuongComponent;
  let fixture: ComponentFixture<ModalQuaTrinhDaoTaoBoiDuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQuaTrinhDaoTaoBoiDuongComponent ],
      imports: [
        EmployeeTenantModule,
        EmployeeTenantRoutingModule,
        RouterTestingModule,
        CoreModule,
        RoleTenantModule,
        getTranslocoModule(),
        TranslocoModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        NgxDaterangepickerMd.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        NgbActiveModal,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQuaTrinhDaoTaoBoiDuongComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {},
      duLieuQuaTrinhDaoTaoBD: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.formGroup.contains('quaTrinhDaoTaoBD')).toBeTruthy();
  });
});
