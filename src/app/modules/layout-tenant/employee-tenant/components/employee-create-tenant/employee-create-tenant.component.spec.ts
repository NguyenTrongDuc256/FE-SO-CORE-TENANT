import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from "@angular/common";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {EmployeeTenantRoutingModule} from "../../employee-tenant-routing.module";
import {RouterTestingModule} from "@angular/router/testing";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {EmployeeCreateTenantComponent} from "./employee-create-tenant.component";
import {EmployeeTenantModule} from "../../employee-tenant.module";
import {LocationService} from "../../../../../_services/location.service";
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {EmployeeService} from "../../../../../_services/layout-tenant/employee/employee.service";
import {BehaviorSubject, of} from "rxjs";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";

describe('EmployeeCreateTenantComponent', () => {
  let component: EmployeeCreateTenantComponent;
  let fixture: ComponentFixture<EmployeeCreateTenantComponent>;
  const paramsSubject = new BehaviorSubject({});
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 1,
      },
    },
    queryParams: {id: 'testABC'},
    params: paramsSubject,
  };

  const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', [
    'getInitializationData',
    'getDetail',
  ]);

  const locationServiceSpy = jasmine.createSpyObj('LocationService', [
    'getCityList',
    'getDistrictList',
    'getWardList'
  ]);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [EmployeeCreateTenantComponent],
      imports: [
        EmployeeTenantModule,
        CommonModule,
        EmployeeTenantRoutingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        NgxDaterangepickerMd.forRoot(),
        TranslocoModule,
        getTranslocoModule(),
        BrowserAnimationsModule,
        RouterModule,
      ],
      providers: [
        {provide: TRANSLOCO_SCOPE, useValue: 'employeeVi'},
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: LocationService, useValue: locationServiceSpy},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreateTenantComponent);
    component = fixture.componentInstance;
    employeeServiceSpy.getInitializationData.and.returnValue(of());
    locationServiceSpy.getCityList.and.returnValue(of());
    locationServiceSpy.getDistrictList.and.returnValue(of());
    locationServiceSpy.getWardList.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('Should create a form with controls', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.formGroup.contains('avatar')).toBeTruthy();
    expect(component.formGroup.contains('fullName')).toBeTruthy();
    expect(component.formGroup.contains('code')).toBeTruthy();
    expect(component.formGroup.contains('moetCode')).toBeTruthy();
    expect(component.formGroup.contains('roleId')).toBeTruthy();
    expect(component.formGroup.contains('birthday')).toBeTruthy();
    expect(component.formGroup.contains('gender')).toBeTruthy();
    expect(component.formGroup.contains('isAccessApp')).toBeTruthy();
    expect(component.formGroup.contains('isActive')).toBeTruthy();
    expect(component.formGroup.contains('schoolId')).toBeTruthy();
    expect(component.formGroup.contains('username')).toBeTruthy();
    expect(component.formGroup.contains('password')).toBeTruthy();
    expect(component.formGroup.contains('email')).toBeTruthy();
    expect(component.formGroup.contains('phone')).toBeTruthy();
    expect(component.formGroup.contains('ethnic')).toBeTruthy();
    expect(component.formGroup.contains('religion')).toBeTruthy();
    expect(component.formGroup.contains('bloodType')).toBeTruthy();
    expect(component.formGroup.contains('nationality')).toBeTruthy();
    expect(component.formGroup.contains('address')).toBeTruthy();
    expect(component.formGroup.contains('permanentResidence')).toBeTruthy();
    expect(component.formGroup.contains('cityCode')).toBeTruthy();
    expect(component.formGroup.contains('socialInsuranceNumber')).toBeTruthy();
    expect(component.formGroup.contains('districtCode')).toBeTruthy();
    expect(component.formGroup.contains('trangThaiCanBo')).toBeTruthy();
    expect(component.formGroup.contains('wardCode')).toBeTruthy();
    expect(component.formGroup.contains('isDoanVien')).toBeTruthy();
    expect(component.formGroup.contains('idNumber')).toBeTruthy();
    expect(component.formGroup.contains('isDangVien')).toBeTruthy();
    expect(component.formGroup.contains('placeOfBirth')).toBeTruthy();
    expect(component.formGroup.contains('viTriViecLam')).toBeTruthy();
    expect(component.formGroup.contains('capDay')).toBeTruthy();
    expect(component.formGroup.contains('nhiemVuKiemNhiem')).toBeTruthy();
    expect(component.formGroup.contains('nhomChucVu')).toBeTruthy();
    expect(component.formGroup.contains('soTietThucDayTrenTuan')).toBeTruthy();
    expect(component.formGroup.contains('ngayBoNhiem')).toBeTruthy();
    expect(component.formGroup.contains('soTietKiemNhiemTrenTuan')).toBeTruthy();
    expect(component.formGroup.contains('soLanBoNhiem')).toBeTruthy();
    expect(component.formGroup.contains('ngach')).toBeTruthy();
    expect(component.formGroup.contains('hinhThucHopDong')).toBeTruthy();
    expect(component.formGroup.contains('maSoNgach')).toBeTruthy();
    expect(component.formGroup.contains('coQuanTuyenDung')).toBeTruthy();
    expect(component.formGroup.contains('namVaoTruong')).toBeTruthy();
    expect(component.formGroup.contains('ngheNghiepTuyenDung')).toBeTruthy();
    expect(component.formGroup.contains('ngayTuyenDung')).toBeTruthy();
    expect(component.formGroup.contains('danhHieuPhongTangCaoNhat')).toBeTruthy();
    expect(component.formGroup.contains('isTapHuanDayKNS')).toBeTruthy();
    expect(component.formGroup.contains('isPhoPhuTrach')).toBeTruthy();
    expect(component.formGroup.contains('isDayHocHoaNhap')).toBeTruthy();
    expect(component.formGroup.contains('isDayLopKhuyetTat')).toBeTruthy();
    expect(component.formGroup.contains('isTongPhuTrachDoi')).toBeTruthy();
    expect(component.formGroup.contains('isDay1Buoi')).toBeTruthy();
    expect(component.formGroup.contains('isThamGiaBoiDuongTx')).toBeTruthy();
    expect(component.formGroup.contains('isDay2Buoi')).toBeTruthy();
    expect(component.formGroup.contains('isBoiDuongTCCD')).toBeTruthy();
    expect(component.formGroup.contains('isChuyenTrachDoanDoi')).toBeTruthy();
    expect(component.formGroup.contains('phuCapThuHutNghe')).toBeTruthy();
    expect(component.formGroup.contains('bacLuong')).toBeTruthy();
    expect(component.formGroup.contains('phuCapThamNien')).toBeTruthy();
    expect(component.formGroup.contains('phanTramVuotKhung')).toBeTruthy();
    expect(component.formGroup.contains('phuCapUuDaiNghe')).toBeTruthy();
    expect(component.formGroup.contains('heSoLuong')).toBeTruthy();
    expect(component.formGroup.contains('phuCapChucVuLanhDao')).toBeTruthy();
    expect(component.formGroup.contains('ngayHuongLuong')).toBeTruthy();
    expect(component.formGroup.contains('dienBienQuaTrinhLuong')).toBeTruthy();
    expect(component.formGroup.contains('ketQuaBoiDuongTX')).toBeTruthy();
    expect(component.formGroup.contains('loaiChungChiNgoaiNgu')).toBeTruthy();
    expect(component.formGroup.contains('trinhDoCMNV')).toBeTruthy();
    expect(component.formGroup.contains('khungNangLucNgoaiNgu')).toBeTruthy();
    expect(component.formGroup.contains('trinhDoLLCT')).toBeTruthy();
    expect(component.formGroup.contains('trinhDoTinHoc')).toBeTruthy();
    expect(component.formGroup.contains('trinhDoQLGD')).toBeTruthy();
    expect(component.formGroup.contains('chuyenMonChinh')).toBeTruthy();
    expect(component.formGroup.contains('thamGiaBDNghiepVuQLGD')).toBeTruthy();
    expect(component.formGroup.contains('trinhDoChinh')).toBeTruthy();
    expect(component.formGroup.contains('thamGiaBDCBQLCotCan')).toBeTruthy();
    expect(component.formGroup.contains('coSoDaoTao')).toBeTruthy();
    expect(component.formGroup.contains('thamGiaBDThaySach')).toBeTruthy();
    expect(component.formGroup.contains('chuyenMonKhac')).toBeTruthy();
    expect(component.formGroup.contains('ngoaiNguChinh')).toBeTruthy();
    expect(component.formGroup.contains('trinhDoKhac')).toBeTruthy();
    expect(component.formGroup.contains('trinhDoDaoTaoNgoaiNgu')).toBeTruthy();
    expect(component.formGroup.contains('chungChiDanTocTS')).toBeTruthy();
    expect(component.formGroup.contains('nhomChungChiNgoaiNgu')).toBeTruthy();
    expect(component.formGroup.contains('tongPhuTrachDoiGioi')).toBeTruthy();
    expect(component.formGroup.contains('diemNgoaiNgu')).toBeTruthy();
    expect(component.formGroup.contains('quaTrinhHocNgoaiNgu')).toBeTruthy();
    expect(component.formGroup.contains('quaTrinhDaoTaoBD')).toBeTruthy();
    expect(component.formGroup.contains('danhGiaVienChuc')).toBeTruthy();
    expect(component.formGroup.contains('gvDayGioi')).toBeTruthy();
    expect(component.formGroup.contains('gvChuNhiemGioi')).toBeTruthy();
    expect(component.formGroup.contains('danhHieuPhongTang')).toBeTruthy();
    expect(component.formGroup.contains('danhGiaChuanNgheNghiep')).toBeTruthy();
    expect(component.formGroup.contains('qhGiaDinh')).toBeTruthy();
    expect(component.formGroup.contains('khenThuong')).toBeTruthy();
    expect(component.formGroup.contains('qhGiaDinhVoChong')).toBeTruthy();
    expect(component.formGroup.contains('kyLuat')).toBeTruthy();
    expect(component.formGroup.contains('quaTrinhCongTac')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const formGroup = component.formGroup;
    formGroup.patchValue({
      avatar: 'https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/07/25/files/uploads/1658721291_1658721299786-Group 1000003688.png',
      fullName: 'Tôi của bạn',
      code: 'OMTCode',
      moetCode: '',
      roleId: 'd32f791b-5f11-4c95-ab58-8f069a725799',
      birthday: 1662742800,
      gender: 1,
      isAccessApp: true,
      isActive: true,
      schoolId: 'd32f791b-5f11-4c95-ab58-8f069a725798',
      username: 'username',
      password: '123456',
      email: '',
      phone: '',
      ethnic: '',
      religion: '',
      bloodType: '',
      nationality: '',
      address: '',
      permanentResidence: '',
      cityCode: '',
      socialInsuranceNumber: '',
      districtCode: '',
      trangThaiCanBo: '',
      wardCode: '',
      isDoanVien: false,
      idNumber: '',
      isDangVien: false,
      placeOfBirth: '',
      viTriViecLam: '',
      capDay: '',
      nhiemVuKiemNhiem: '',
      nhomChucVu: '',
      soTietThucDayTrenTuan: '',
      ngayBoNhiem: '',
      soTietKiemNhiemTrenTuan: '',
      soLanBoNhiem: '',
      ngach: '',
      hinhThucHopDong: '',
      maSoNgach: '',
      coQuanTuyenDung: '',
      namVaoTruong: '',
      ngheNghiepTuyenDung: '',
      ngayTuyenDung: '',
      danhHieuPhongTangCaoNhat: '',
      isTapHuanDayKNS: false,
      isPhoPhuTrach: false,
      isDayHocHoaNhap: false,
      isDayLopKhuyetTat: false,
      isTongPhuTrachDoi: false,
      isDay1Buoi: false,
      isThamGiaBoiDuongTx: false,
      isDay2Buoi: false,
      isBoiDuongTCCD: false,
      isChuyenTrachDoanDoi: false,
      phuCapThuHutNghe: '',
      bacLuong: '',
      phuCapThamNien: '',
      phanTramVuotKhung: '',
      phuCapUuDaiNghe: '',
      heSoLuong: '',
      phuCapChucVuLanhDao: '',
      ngayHuongLuong: '',
      dienBienQuaTrinhLuong: [],
      ketQuaBoiDuongTX: '',
      loaiChungChiNgoaiNgu: '',
      trinhDoCMNV: '',
      khungNangLucNgoaiNgu: '',
      trinhDoLLCT: '',
      trinhDoTinHoc: '',
      trinhDoQLGD: '',
      chuyenMonChinh: '',
      thamGiaBDNghiepVuQLGD: '',
      trinhDoChinh: '',
      thamGiaBDCBQLCotCan: '',
      coSoDaoTao: '',
      thamGiaBDThaySach: '',
      chuyenMonKhac: '',
      ngoaiNguChinh: '',
      trinhDoKhac: '',
      trinhDoDaoTaoNgoaiNgu: '',
      chungChiDanTocTS: '',
      nhomChungChiNgoaiNgu: '',
      tongPhuTrachDoiGioi: '',
      diemNgoaiNgu: '',
      quaTrinhHocNgoaiNgu: [],
      quaTrinhDaoTaoBD: [],
      danhGiaVienChuc: '',
      gvDayGioi: '',
      gvChuNhiemGioi: '',
      danhHieuPhongTang: '',
      danhGiaChuanNgheNghiep: [],
      qhGiaDinh: [],
      khenThuong: [],
      qhGiaDinhVoChong: [],
      kyLuat: [],
      quaTrinhCongTac: [],
    });
    expect(formGroup.valid).toBeTrue();
  });

  it('Should fullName invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['fullName'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should fullName invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['fullName'];
    control.setValue('Tên của tui đâyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy maxlength là 255 ký tự nhé, text này 256 ký tự đó heheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    console.log(control)
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['code'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['code'];
    control.setValue('textnay56kytunheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['code'];
    control.setValue('code co khoang trang nay');
    expect(control.invalid).toBeTruthy();
  });

  it('Should moetCode invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['moetCode'];
    control.setValue('textnay56kytunheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });

  it('Should moetCode invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['moetCode'];
    control.setValue('moetCode co khoang trang nay');
    expect(control.invalid).toBeTruthy();
  });

  it('Should roleId invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['roleId'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should schoolId invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['schoolId'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should username invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['username'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should username invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['username'];
    control.setValue('textnay56kytunheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });

  it('Should username invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['username'];
    control.setValue('username co khoang trang nay');
    expect(control.invalid).toBeTruthy();
  });

  it('Should password invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['password'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should password invalid minLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['password'];
    control.setValue('text5');
    expect(control.invalid).toBeTruthy();
  });

  it('Should password invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['password'];
    control.setValue('textnay56kytunheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });

  it('Should password invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['password'];
    control.setValue('password co khoang trang nay');
    expect(control.invalid).toBeTruthy();
  });

  it('Should email invalid email', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['email'];
    control.setValue('124234');
    expect(control.invalid).toBeTruthy();
  });

  it('Should phone invalid pattern', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['phone'];
    control.setValue('124234a');
    expect(control.invalid).toBeTruthy();
  });
});
