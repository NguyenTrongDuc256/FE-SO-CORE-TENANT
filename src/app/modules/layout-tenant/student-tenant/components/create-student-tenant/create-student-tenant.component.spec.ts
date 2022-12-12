/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateStudentTenantComponent } from './create-student-tenant.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_core/core.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment.firebase';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { StudentModule } from '../../student-tenant.module';

describe('CreateStudentTenantComponent', () => {
  let component: CreateStudentTenantComponent;
  let fixture: ComponentFixture<CreateStudentTenantComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CreateStudentTenantComponent],
      imports: [
        CommonModule,
        CoreModule,
        StudentModule,
        RouterModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formGroup.contains('avatar')).toBeTruthy();
    expect(component.formGroup.contains('fullName')).toBeTruthy();//toBeTruthy(): Khẳng định rằng giá trị x là true hoặc ước lượng bằng true.
    expect(component.formGroup.contains('moetCode')).toBeTruthy();
    expect(component.formGroup.contains('gender')).toBeTruthy();
    expect(component.formGroup.contains('code')).toBeTruthy();
    expect(component.formGroup.contains('birthday')).toBeTruthy();
    expect(component.formGroup.contains('isHocSongNgu')).toBeTruthy();
    expect(component.formGroup.contains('isAccessApp')).toBeTruthy();
    expect(component.formGroup.contains('isActive')).toBeTruthy();
    //thong tin chung
    expect(component.formGroup.contains('schoolId')).toBeTruthy();
    expect(component.formGroup.contains('gradeId')).toBeTruthy();
    expect(component.formGroup.contains('username')).toBeTruthy();
    expect(component.formGroup.contains('password')).toBeTruthy();
    expect(component.formGroup.contains('status')).toBeTruthy();
    expect(component.formGroup.contains('homeroomClassId')).toBeTruthy();
    expect(component.formGroup.contains('ethnic')).toBeTruthy();
    expect(component.formGroup.contains('selectedType')).toBeTruthy();
    expect(component.formGroup.contains('bloodType')).toBeTruthy();
    expect(component.formGroup.contains('religion')).toBeTruthy();
    expect(component.formGroup.contains('email')).toBeTruthy();
    expect(component.formGroup.contains('priorityLevel')).toBeTruthy();
    expect(component.formGroup.contains('phone')).toBeTruthy();
    expect(component.formGroup.contains('nationality')).toBeTruthy();
    expect(component.formGroup.contains('address')).toBeTruthy();
    expect(component.formGroup.contains('permanentResidence')).toBeTruthy();
    expect(component.formGroup.contains('cityCode')).toBeTruthy();
    expect(component.formGroup.contains('permanentResidence')).toBeTruthy();
    expect(component.formGroup.contains('cityCode')).toBeTruthy();
    expect(component.formGroup.contains('placeOfBirth')).toBeTruthy();
    expect(component.formGroup.contains('districtCode')).toBeTruthy();
    expect(component.formGroup.contains('thanhPhoNoiSinh')).toBeTruthy();
    expect(component.formGroup.contains('wardCode')).toBeTruthy();
    expect(component.formGroup.contains('quanHuyenNoiSinh')).toBeTruthy();
    expect(component.formGroup.contains('aceCode')).toBeTruthy();
    expect(component.formGroup.contains('isHoanThanhCTrinhTieuHoc')).toBeTruthy();
    expect(component.formGroup.contains('danTocTheoGiayKhai')).toBeTruthy();
    expect(component.formGroup.contains('thonXom')).toBeTruthy();
    expect(component.formGroup.contains('currentAccommodation')).toBeTruthy();
    expect(component.formGroup.contains('thuTu')).toBeTruthy();

    expect(component.formGroup.contains('maKhuVuc')).toBeTruthy();
    expect(component.formGroup.contains('benhVeMat')).toBeTruthy();
    expect(component.formGroup.contains('disablilityCode')).toBeTruthy();
    expect(component.formGroup.contains('idNumber')).toBeTruthy();
    expect(component.formGroup.contains('policyObject')).toBeTruthy();
    expect(component.formGroup.contains('idNumberIssueDate')).toBeTruthy();
    expect(component.formGroup.contains('huongNghiepDayNghe')).toBeTruthy();
    expect(component.formGroup.contains('idNumberIssueBy')).toBeTruthy();
    expect(component.formGroup.contains('maLyDoThoiHoc')).toBeTruthy();
    expect(component.formGroup.contains('maSoBuoiHocTrenTuan')).toBeTruthy();
    //checkbox
    expect(component.formGroup.contains('isKhuyetTatKhongDanhGia')).toBeTruthy();
    expect(component.formGroup.contains('isHocLopMG5Tuoi')).toBeTruthy();
    expect(component.formGroup.contains('isBietBoiKy1')).toBeTruthy();
    expect(component.formGroup.contains('isHsdtHtnn')).toBeTruthy();
    expect(component.formGroup.contains('isHsdtTctv')).toBeTruthy();
    expect(component.formGroup.contains('isHoc2Buoi')).toBeTruthy();
    expect(component.formGroup.contains('isVungKhoKhan')).toBeTruthy();
    expect(component.formGroup.contains('isHoTroChiPhiHocTap')).toBeTruthy();
    expect(component.formGroup.contains('isCapGao')).toBeTruthy();
    expect(component.formGroup.contains('isKhuyetTatHocChuyenBiet')).toBeTruthy();
    expect(component.formGroup.contains('isDuDieuKienXetTotNghiep')).toBeTruthy();
    expect(component.formGroup.contains('partyMember')).toBeTruthy();
    expect(component.formGroup.contains('unionMember')).toBeTruthy();
    expect(component.formGroup.contains('isHocSinhTiengDanToc')).toBeTruthy();
    expect(component.formGroup.contains('kiNangSong')).toBeTruthy();
    expect(component.formGroup.contains('isMienHocPhi')).toBeTruthy();
    expect(component.formGroup.contains('isHoTroNhaO')).toBeTruthy();
    expect(component.formGroup.contains('isMoiTuyenDauCap')).toBeTruthy();
    expect(component.formGroup.contains('isHocTinHoc')).toBeTruthy();
    expect(component.formGroup.contains('isHsTotNghiepThcs')).toBeTruthy();
    expect(component.formGroup.contains('isHocCTGDCuaBo')).toBeTruthy();
    expect(component.formGroup.contains('isHocSinhNoiTruDanNuoi')).toBeTruthy();
    expect(component.formGroup.contains('isHocSinhBanTruDanNuoi')).toBeTruthy();
    expect(component.formGroup.contains('isHocSinhPtDtBanTru')).toBeTruthy();
    expect(component.formGroup.contains('isMeDt')).toBeTruthy();
    expect(component.formGroup.contains('isChaDt')).toBeTruthy();
    expect(component.formGroup.contains('isLuuBanNamTruoc')).toBeTruthy();
    expect(component.formGroup.contains('isHsdtTroGiang')).toBeTruthy();
    expect(component.formGroup.contains('isHocLopBanTru')).toBeTruthy();
    expect(component.formGroup.contains('isHoNgheo')).toBeTruthy();
    expect(component.formGroup.contains('isGiamHocPhi')).toBeTruthy();
    expect(component.formGroup.contains('isCapTienHangThang')).toBeTruthy();
    expect(component.formGroup.contains('isKhuyetTatHocHoaNhap')).toBeTruthy();
    expect(component.formGroup.contains('isHsDttsRatItNguoiDuocHtht')).toBeTruthy();
    expect(component.formGroup.contains('isPhCoSmartphone')).toBeTruthy();
    expect(component.formGroup.contains('isPhCoMayTinhInternet')).toBeTruthy();

    //thông tin phụ huynh
    //Bố ruột
    expect(component.formGroup.contains('isCreateFatherAccount')).toBeTruthy();
    expect(component.formGroup.contains('fatherAvatar')).toBeTruthy();
    expect(component.formGroup.contains('fatherFullName')).toBeTruthy();
    expect(component.formGroup.contains('fatherCode')).toBeTruthy();
    expect(component.formGroup.contains('fatherIsAccessApp')).toBeTruthy();
    expect(component.formGroup.contains('fatherIsActive')).toBeTruthy();
    expect(component.formGroup.contains('fatherUserName')).toBeTruthy();
    expect(component.formGroup.contains('fatherPassword')).toBeTruthy();
    expect(component.formGroup.contains('fatherPhone')).toBeTruthy();
    expect(component.formGroup.contains('fatherEmail')).toBeTruthy();
    expect(component.formGroup.contains('fatherBirthday')).toBeTruthy();
    expect(component.formGroup.contains('fatherJob')).toBeTruthy();

    //Mẹ đẻ
    expect(component.formGroup.contains('isCreateMotherAccount')).toBeTruthy();
    expect(component.formGroup.contains('motherAvatar')).toBeTruthy();
    expect(component.formGroup.contains('motherFullName')).toBeTruthy();
    expect(component.formGroup.contains('motherCode')).toBeTruthy();
    expect(component.formGroup.contains('motherIsAccessApp')).toBeTruthy();
    expect(component.formGroup.contains('motherIsActive')).toBeTruthy();
    expect(component.formGroup.contains('motherUserName')).toBeTruthy();
    expect(component.formGroup.contains('motherPassword')).toBeTruthy();
    expect(component.formGroup.contains('motherPhone')).toBeTruthy();
    expect(component.formGroup.contains('motherEmail')).toBeTruthy();
    expect(component.formGroup.contains('motherBirthday')).toBeTruthy();
    expect(component.formGroup.contains('motherJob')).toBeTruthy();

    //người đỡ đầu
    expect(component.formGroup.contains('isCreateTutorAccount')).toBeTruthy();
    expect(component.formGroup.contains('tutorAvatar')).toBeTruthy();
    expect(component.formGroup.contains('tutorFullName')).toBeTruthy();
    expect(component.formGroup.contains('tutorCode')).toBeTruthy();
    expect(component.formGroup.contains('tutorIsAccessApp')).toBeTruthy();
    expect(component.formGroup.contains('tutorIsActive')).toBeTruthy();
    expect(component.formGroup.contains('tutorGender')).toBeTruthy();
    expect(component.formGroup.contains('tutorUserName')).toBeTruthy();
    expect(component.formGroup.contains('tutorPassword')).toBeTruthy();
    expect(component.formGroup.contains('tutorPhone')).toBeTruthy();
    expect(component.formGroup.contains('tutorEmail')).toBeTruthy();
    expect(component.formGroup.contains('tutorBirthday')).toBeTruthy();
    expect(component.formGroup.contains('tutorJob')).toBeTruthy();
  });

  it('Should form valid', () => {
    const form = component.formGroup;
    form.patchValue(
      {
        avatar: "https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/09/29/files/uploads/1664448368_1664448368605-Union.png",
        fullName: "Lê Văn Thiện",
        moetCode: "moet123",
        gender: 1,
        code: "van1234",
        birthday: 1652547600,
        isHocSongNgu: 0,
        isAccessApp: 0,
        isActive: 1,
        schoolId: "a7e3a37d-c9a8-4534-94b1-ce9b7283aecf",
        gradeId: "f71371fb-7210-4780-b39a-a21057dcd4c9",
        username: "dangductoan",
        password: "111111111111111",
        status: "01",
        homeroomClassId: null,
        ethnic: "13",
        selectedType: "TRUNGTUYEN",
        bloodType: "a",
        religion: "02",
        email: "ahihi@gmail.com",
        priorityLevel: "priority_level.cudan",
        phone: "+84675745599",
        nationality: "004",
        address: "hà nộii",
        permanentResidence: "hà nội",
        cityCode: "01",
        placeOfBirth: "hà nội",
        districtCode: "001",
        thanhPhoNoiSinh: "01",
        wardCode: "00001",
        quanHuyenNoiSinh: "001",
        aceCode: "3232",
        isHoanThanhCTrinhTieuHoc: 0,
        danTocTheoGiayKhai: "2323",
        thonXom: "hà nội",
        currentAccommodation: "hà nội",
        thuTu: "1",
        maKhuVuc: "02",
        benhVeMat: "01",
        disablilityCode: "01",
        idNumber: "86543789564",
        policyObject: "CA-HANOI",
        idNumberIssueDate: 1661965200,
        huongNghiepDayNghe: "01",
        idNumberIssueBy: "CA-HANOI",
        maLyDoThoiHoc: "fffffffffffffff",
        maSoBuoiHocTrenTuan: "01",
        isKhuyetTatKhongDanhGia: 0,
        isHocLopMG5Tuoi: 0,
        isBietBoiKy1: 0,
        isHsdtHtnn: 0,
        isHsdtTctv: 0,
        isHoc2Buoi: 0,
        isVungKhoKhan: 0,
        isHoTroChiPhiHocTap: 0,
        isCapGao: 0,
        isKhuyetTatHocChuyenBiet: 0,
        isDuDieuKienXetTotNghiep: 0,
        partyMember: 0,
        unionMember: 0,
        isHocSinhTiengDanToc: 0,
        kiNangSong: 0,
        isMienHocPhi: 0,
        isHoTroNhaO: 0,
        isMoiTuyenDauCap: 0,
        isHocTinHoc: 0,
        isHsTotNghiepThcs: 0,
        isHocCTGDCuaBo: 0,
        isHocSinhNoiTruDanNuoi: 0,
        isHocSinhBanTruDanNuoi: 0,
        isHocSinhPtDtBanTru: 0,
        isMeDt: 0,
        isChaDt: 0,
        isLuuBanNamTruoc: 0,
        isHsdtTroGiang: 0,
        isHocLopBanTru: 0,
        isHoNgheo: 0,
        isGiamHocPhi: 0,
        isCapTienHangThang: 0,
        isKhuyetTatHocHoaNhap: 0,
        isHsDttsRatItNguoiDuocHtht: 0,
        isPhCoSmartphone: 0,
        isPhCoMayTinhInternet: 0,
        isCreateFatherAccount: 1,
        fatherAvatar: "https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/09/29/files/uploads/1664448361_1664448361216-mk4 3.png",
        fatherFullName: "thiện thật thà",
        fatherCode: "thiennnnn",
        fatherIsAccessApp: 0,
        fatherIsActive: 0,
        fatherUserName: "thienlv",
        fatherPassword: "45346546546",
        fatherPhone: "09676767676",
        fatherEmail: "thienlvvv@gmail.com",
        fatherBirthday: 1662397200,
        fatherJob: "gvvvv",
        isCreateMotherAccount: 1,
        motherAvatar: "https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/09/29/files/uploads/1664448364_1664448364717-mk4 cam.png",
        motherFullName: "Bố đức toàn",
        motherCode: "boductoan",
        motherIsAccessApp: 0,
        motherIsActive: 0,
        motherUserName: "boductoan",
        motherPassword: "53456456546",
        motherPhone: "09848634444",
        motherEmail: "boductoan@gmail.com",
        motherBirthday: 1662483600,
        motherJob: "chủ tịch",
        isCreateTutorAccount: 0,
        tutorAvatar: "",
        tutorFullName: "",
        tutorCode: "",
        tutorIsAccessApp: 0,
        tutorIsActive: 0,
        tutorGender: 1,
        tutorUserName: "",
        tutorPassword: null,
        tutorPhone: "",
        tutorEmail: "",
        tutorBirthday: null,
        tutorJob: ""
      }
    );
    expect(form.valid).toBeTrue();
  });

  it('Should fullName invalid empty', () => {
    const control = component.formGroup.controls['fullName'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid empty', () => {
    const control = component.formGroup.controls['code'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should schoolId invalid empty', () => {
    const control = component.formGroup.controls['schoolId'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should gradeId invalid empty', () => {
    const control = component.formGroup.controls['gradeId'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should username invalid empty', () => {
    const control = component.formGroup.controls['username'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should password invalid empty', () => {
    const control = component.formGroup.controls['password'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should status invalid empty', () => {
    const control = component.formGroup.controls['status'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should ethnic invalid empty', () => {
    const control = component.formGroup.controls['ethnic'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should cityCode invalid empty', () => {
    const control = component.formGroup.controls['cityCode'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });






});
