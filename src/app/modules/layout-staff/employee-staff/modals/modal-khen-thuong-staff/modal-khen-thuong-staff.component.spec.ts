import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalKhenThuongStaffComponent} from "./modal-khen-thuong-staff.component";
import {EmployeeStaffModule} from "../../employee-staff.module";
import {EmployeeStaffRoutingModule} from "../../employee-staff-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {CoreModule} from "../../../../../_core/core.module";
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {TranslocoModule} from "@ngneat/transloco";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";


describe('ModalKhenThuongStaffComponent', () => {
  let component: ModalKhenThuongStaffComponent;
  let fixture: ComponentFixture<ModalKhenThuongStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalKhenThuongStaffComponent ],
      imports: [
        EmployeeStaffModule,
        EmployeeStaffRoutingModule,
        RouterTestingModule,
        CoreModule,
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
    fixture = TestBed.createComponent(ModalKhenThuongStaffComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {},
      duLieuKhenThuongGV: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.formGroup.contains('khenThuong')).toBeTruthy();
  });
});
