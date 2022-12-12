import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { ResizeImageService } from 'src/app/_services/resize-image.service';
import { AVATAR_DEFAULT, GENDER, MESSAGE_ERROR_CALL_API, REGEX_CODE, REGEX_PASSWORD, REGEX_PHONE, REGEX_USER_NAME, STUDENT_STATUS_SELECT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import * as moment from 'moment';
import { GeneralService } from 'src/app/_services/general.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { StudentService } from 'src/app/_services/layout-tenant/student/student.service';
import { LocationService } from 'src/app/_services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-student-tenant',
  templateUrl: './update-student-tenant.component.html',
  styleUrls: ['./update-student-tenant.component.scss']
})
export class UpdateStudentTenantComponent implements OnInit {
  isLoading: boolean = false;
  formGroup!: FormGroup;
  avatarUser: string = AVATAR_DEFAULT;
  fatherAvatarDefault: string = AVATAR_DEFAULT;
  motherAvatarDefault: string = AVATAR_DEFAULT;
  tutorAvatarDefault: string = AVATAR_DEFAULT;

  tabActive: string = 'student-info';

  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;
  tabPersonalOrParents: boolean = true;
  gender = GENDER;
  currentDate = "1653706178"; // Date picker ngày truyền lên
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  studentStatus = STUDENT_STATUS_SELECT;
  studentDataRelate: any;
  cityList: any[] = [];
  districtList: any[] = [];
  wardList: any[] = [];
  cityListHK: any[] = [];
  districtListHK: any[] = [];
  txtSelect: string = 'student.select';
  nzNotFoundContent: string = 'student.notFoundContent';
  isShowPassword = false;
  studentId: string;
  studentPesonInfo: any;
  dateNow = moment().format('X');


  constructor(
    private resizeImageService: ResizeImageService,
    private generalService: GeneralService,
    private studentService: StudentService,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private locationService: LocationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private showMessage: ShowMessageService,


  ) { }

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.params.studentId;
    this.getStudentPesonInfo();

    this.activatedRoute.queryParams.subscribe(el => {
      if (el.tab) {
        this.tabActive = el.tab;
      } else {
        this.tabActive = 'student-info';
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: 'student-info'
          },
          queryParamsHandling: 'merge'
        });
      }
    })
  }

  activeTab(value: string) {
    this.tabActive = value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tab: value
      },
      queryParamsHandling: 'merge'
    });
  }

  initForm() {
    this.formGroup = this.fb.group({
      avatar: [this.studentPesonInfo?.avatar ? this.studentPesonInfo?.avatar : this.avatarUser],
      fullName: [this.studentPesonInfo?.fullName, [Validators.required, Validators.maxLength(255)]],
      moetCode: [this.studentPesonInfo?.moetCode, [Validators.pattern(REGEX_CODE), Validators.maxLength(50)]],
      gender: this.studentPesonInfo?.gender,
      code: [this.studentPesonInfo?.code, [Validators.required, Validators.pattern(REGEX_CODE)]],
      birthday: [this.studentPesonInfo?.birthday, [Validators.required]],//không có formcontrollname bên html, lấy từ hàm datepicker
      isHocSongNgu: this.studentPesonInfo?.isHocSongNgu == 1 ? true : false,
      isAccessApp: this.studentPesonInfo?.isAccessApp == 1 ? true : false,
      isActive: this.studentPesonInfo?.isActive == 1 ? true : false,
      //thong tin chung
      schoolId: [this.studentPesonInfo?.schoolId, [Validators.required]],
      gradeId: [this.studentPesonInfo?.gradeId, [Validators.required]],
      username: [this.studentPesonInfo?.username, [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      // password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)]],
      status: [this.studentPesonInfo?.status, [Validators.required]],
      homeroomClassId: [this.studentPesonInfo?.homeroomClassId],
      ethnic: [this.studentPesonInfo?.ethnic, [Validators.required]],
      selectedType: [this.studentPesonInfo?.selectedType],
      bloodType: [this.studentPesonInfo?.bloodType],
      religion: [this.studentPesonInfo?.religion],
      email: [this.studentPesonInfo?.email, [Validators.email]],
      priorityLevel: [this.studentPesonInfo?.priorityLevel],
      phone: [this.studentPesonInfo?.phone, [Validators.pattern(REGEX_PHONE)]],
      nationality: [this.studentPesonInfo?.nationality],
      address: [this.studentPesonInfo?.address],
      permanentResidence: [this.studentPesonInfo?.permanentResidence],
      cityCode: [this.studentPesonInfo?.cityCode, [Validators.required]],
      placeOfBirth: [this.studentPesonInfo?.placeOfBirth],
      districtCode: [this.studentPesonInfo?.districtCode],
      thanhPhoNoiSinh: [this.studentPesonInfo?.thanhPhoNoiSinh],
      wardCode: [this.studentPesonInfo?.wardCode],
      quanHuyenNoiSinh: [this.studentPesonInfo?.quanHuyenNoiSinh],
      aceCode: [this.studentPesonInfo?.aceCode],
      isHoanThanhCTrinhTieuHoc: this.studentPesonInfo?.isHoanThanhCTrinhTieuHoc == 1 ? true : false,
      danTocTheoGiayKhai: [this.studentPesonInfo?.danTocTheoGiayKhai],
      thonXom: [this.studentPesonInfo?.thonXom],
      currentAccommodation: [this.studentPesonInfo?.currentAccommodation],
      thuTu: [this.studentPesonInfo?.thuTu, Validators.pattern(/^\d+$/)],

      //thong tin ca nhan
      maKhuVuc: [this.studentPesonInfo?.maKhuVuc],
      benhVeMat: [this.studentPesonInfo?.benhVeMat],
      disablilityCode: [this.studentPesonInfo?.disablilityCode],
      idNumber: [this.studentPesonInfo?.idNumber, Validators.pattern(/^\d+$/)],
      policyObject: [this.studentPesonInfo?.policyObject],
      idNumberIssueDate: [this.studentPesonInfo?.idNumberIssueDate],//không có formcontrollname bên html, lấy từ hàm datepicker
      huongNghiepDayNghe: [this.studentPesonInfo?.huongNghiepDayNghe],
      idNumberIssueBy: [this.studentPesonInfo?.idNumberIssueBy],
      maLyDoThoiHoc: [this.studentPesonInfo?.maLyDoThoiHoc],
      maSoBuoiHocTrenTuan: [this.studentPesonInfo?.maSoBuoiHocTrenTuan],
      //checkbox
      isKhuyetTatKhongDanhGia: this.studentPesonInfo?.isKhuyetTatKhongDanhGia == 1 ? true : false,
      isHocLopMG5Tuoi: this.studentPesonInfo?.isHocLopMG5Tuoi == 1 ? true : false,
      isBietBoiKy1: this.studentPesonInfo?.isBietBoiKy1 == 1 ? true : false,
      isHsdtHtnn: this.studentPesonInfo?.isHsdtHtnn == 1 ? true : false,
      isHsdtTctv: this.studentPesonInfo?.isHsdtTctv == 1 ? true : false,
      isHoc2Buoi: this.studentPesonInfo?.isHoc2Buoi == 1 ? true : false,
      isVungKhoKhan: this.studentPesonInfo?.isVungKhoKhan == 1 ? true : false,
      isHoTroChiPhiHocTap: this.studentPesonInfo?.isHoTroChiPhiHocTap == 1 ? true : false,
      isCapGao: this.studentPesonInfo?.isCapGao == 1 ? true : false,
      isKhuyetTatHocChuyenBiet: this.studentPesonInfo?.isKhuyetTatHocChuyenBiet == 1 ? true : false,
      isDuDieuKienXetTotNghiep: this.studentPesonInfo?.isDuDieuKienXetTotNghiep == 1 ? true : false,
      partyMember: this.studentPesonInfo?.partyMember == 1 ? true : false,
      unionMember: this.studentPesonInfo?.unionMember == 1 ? true : false,
      isHocSinhTiengDanToc: this.studentPesonInfo?.isHocSinhTiengDanToc == 1 ? true : false,
      kiNangSong: this.studentPesonInfo?.kiNangSong == 1 ? true : false,
      isMienHocPhi: this.studentPesonInfo?.isMienHocPhi == 1 ? true : false,
      isHoTroNhaO: this.studentPesonInfo?.isHoTroNhaO == 1 ? true : false,
      isMoiTuyenDauCap: this.studentPesonInfo?.isMoiTuyenDauCap == 1 ? true : false,
      isHocTinHoc: this.studentPesonInfo?.isHocTinHoc == 1 ? true : false,
      isHsTotNghiepThcs: this.studentPesonInfo?.isHsTotNghiepThcs == 1 ? true : false,
      isHocCTGDCuaBo: this.studentPesonInfo?.isHocCTGDCuaBo == 1 ? true : false,
      isHocSinhNoiTruDanNuoi: this.studentPesonInfo?.isHocSinhNoiTruDanNuoi == 1 ? true : false,
      isHocSinhBanTruDanNuoi: this.studentPesonInfo?.isHocSinhBanTruDanNuoi == 1 ? true : false,
      isHocSinhPtDtBanTru: this.studentPesonInfo?.isHocSinhPtDtBanTru == 1 ? true : false,
      isMeDt: this.studentPesonInfo?.isMeDt == 1 ? true : false,
      isChaDt: this.studentPesonInfo?.isChaDt == 1 ? true : false,
      isLuuBanNamTruoc: this.studentPesonInfo?.isLuuBanNamTruoc == 1 ? true : false,
      isHsdtTroGiang: this.studentPesonInfo?.isHsdtTroGiang == 1 ? true : false,
      isHocLopBanTru: this.studentPesonInfo?.isHocLopBanTru == 1 ? true : false,
      isHoNgheo: this.studentPesonInfo?.isHoNgheo == 1 ? true : false,
      isGiamHocPhi: this.studentPesonInfo?.isGiamHocPhi == 1 ? true : false,
      isCapTienHangThang: this.studentPesonInfo?.isCapTienHangThang == 1 ? true : false,
      isKhuyetTatHocHoaNhap: this.studentPesonInfo?.isKhuyetTatHocHoaNhap == 1 ? true : false,
      isHsDttsRatItNguoiDuocHtht: this.studentPesonInfo?.isHsDttsRatItNguoiDuocHtht == 1 ? true : false,
      isPhCoSmartphone: this.studentPesonInfo?.isPhCoSmartphone == 1 ? true : false,
      isPhCoMayTinhInternet: this.studentPesonInfo?.isPhCoMayTinhInternet == 1 ? true : false,

      //thông tin phụ huynh
      //Bố ruột
      isCreateFatherAccount: this.studentPesonInfo?.father != null ? true : false,
      fatherAvatar: [this.studentPesonInfo?.father?.avatar ? this.studentPesonInfo?.father?.avatar : this.fatherAvatarDefault],
      fatherFullName: [this.studentPesonInfo?.father?.fullName],
      fatherCode: [this.studentPesonInfo?.father?.code],
      fatherIsAccessApp: this.studentPesonInfo?.father?.isAccessApp == 1 ? true : false,
      fatherIsActive: this.studentPesonInfo?.father?.isActive == 1 ? true : false,
      fatherUserName: [this.studentPesonInfo?.father?.userName],
      fatherPassword: [],
      fatherPhone: [this.studentPesonInfo?.father?.phone],
      fatherEmail: [this.studentPesonInfo?.father?.email],
      fatherBirthday: [this.studentPesonInfo?.father?.birthday],
      fatherJob: [this.studentPesonInfo?.father?.job],

      //Mẹ đẻ
      isCreateMotherAccount: this.studentPesonInfo?.mother != null ? true : false,
      motherAvatar: [this.studentPesonInfo?.mother?.avatar ? this.studentPesonInfo?.mother?.avatar : this.motherAvatarDefault],
      motherFullName: [this.studentPesonInfo?.mother?.fullName],
      motherCode: [this.studentPesonInfo?.mother?.code],
      motherIsAccessApp: this.studentPesonInfo?.mother?.isAccessApp == 1 ? true : false,
      motherIsActive: this.studentPesonInfo?.mother?.isActive == 1 ? true : false,
      motherUserName: [this.studentPesonInfo?.mother?.userName],
      motherPassword: [],
      motherPhone: [this.studentPesonInfo?.mother?.phone],
      motherEmail: [this.studentPesonInfo?.mother?.email],
      motherBirthday: [this.studentPesonInfo?.mother?.birthday],
      motherJob: [this.studentPesonInfo?.mother?.job],

      //người đỡ đầu
      isCreateTutorAccount: this.studentPesonInfo?.tutor != null ? true : false,
      tutorAvatar: [this.studentPesonInfo?.tutor?.avatar ? this.studentPesonInfo?.tutor?.avatar : this.tutorAvatarDefault],
      tutorFullName: [this.studentPesonInfo?.tutor?.fullName],
      tutorCode: [this.studentPesonInfo?.tutor?.code],
      tutorIsAccessApp: this.studentPesonInfo?.tutor?.isAccessApp == 1 ? true : false,
      tutorIsActive: this.studentPesonInfo?.tutor?.isActive == 1 ? true : false,
      tutorGender: this.studentPesonInfo?.tutor?.gender == 2 ? true : false,
      tutorUserName: [this.studentPesonInfo?.tutor?.userName],
      tutorPassword: [],
      tutorPhone: [this.studentPesonInfo?.tutor?.phone],
      tutorEmail: [this.studentPesonInfo?.tutor?.email],
      tutorBirthday: [this.studentPesonInfo?.tutor?.birthday],
      tutorJob: [this.studentPesonInfo?.tutor?.job],

    });
    this.checkCreateParentsValdidator();
  }

  updateStudent() {
    this.isLoading = true;
    let dataRequest: any = {
      studentId: this.studentId,
      avatar: this.formGroup.value.avatar ? this.formGroup.value.avatar : null,
      fullName: this.formGroup.value.fullName,
      moetCode: this.formGroup.value.moetCode,
      gender: this.formGroup.value.gender,
      code: this.formGroup.value.code,
      birthday: this.formGroup.value.birthday,
      isHocSongNgu: this.formGroup.value.isHocSongNgu ? 1 : 0,
      isAccessApp: this.formGroup.value.isAccessApp ? 1 : 0,
      isActive: this.formGroup.value.isActive ? 1 : 0,

      //thong tin chung
      schoolId: this.formGroup.value.schoolId,
      gradeId: this.formGroup.value.gradeId,
      username: this.formGroup.value.username,
      // password: this.formGroup.value.password,
      status: this.formGroup.value.status,
      homeroomClassId: this.formGroup.value.homeroomClassId ? this.formGroup.value.homeroomClassId : null,
      ethnic: this.formGroup.value.ethnic,
      selectedType: this.formGroup.value.selectedType,//hình thức trúng tuyển
      bloodType: this.formGroup.value.bloodType,
      religion: this.formGroup.value.religion,
      email: this.formGroup.value.email,
      priorityLevel: this.formGroup.value.priorityLevel, //đối tượng ưu tiên
      phone: this.formGroup.value.phone,
      nationality: this.formGroup.value.nationality,
      address: this.formGroup.value.address,
      permanentResidence: this.formGroup.value.permanentResidence,
      cityCode: this.formGroup.value.cityCode,
      placeOfBirth: this.formGroup.value.placeOfBirth,
      districtCode: this.formGroup.value.districtCode,
      thanhPhoNoiSinh: this.formGroup.value.thanhPhoNoiSinh,
      wardCode: this.formGroup.value.wardCode, //phường xã , ăn theo districtCode
      quanHuyenNoiSinh: this.formGroup.value.quanHuyenNoiSinh,// Quận/Huyện theo HK
      aceCode: this.formGroup.value.aceCode,
      isHoanThanhCTrinhTieuHoc: this.formGroup.value.isHoanThanhCTrinhTieuHoc ? 1 : 0,
      danTocTheoGiayKhai: this.formGroup.value.danTocTheoGiayKhai,
      thonXom: this.formGroup.value.thonXom,
      currentAccommodation: this.formGroup.value.currentAccommodation,
      thuTu: this.formGroup.value.thuTu ? this.formGroup.value.thuTu : null,

      //thong tin ca nhan
      maKhuVuc: this.formGroup.value.maKhuVuc,
      benhVeMat: this.formGroup.value.benhVeMat,
      disablilityCode: this.formGroup.value.disablilityCode,
      idNumber: this.formGroup.value.idNumber,
      policyObject: this.formGroup.value.policyObject,
      idNumberIssueDate: this.formGroup.value.idNumberIssueDate,
      huongNghiepDayNghe: this.formGroup.value.huongNghiepDayNghe,
      idNumberIssueBy: this.formGroup.value.idNumberIssueBy,//nơi cấp
      maLyDoThoiHoc: this.formGroup.value.maLyDoThoiHoc,
      maSoBuoiHocTrenTuan: this.formGroup.value.maSoBuoiHocTrenTuan,
      //checkbox
      isKhuyetTatKhongDanhGia: this.formGroup.value.isKhuyetTatKhongDanhGia ? 1 : 0,
      isHocLopMG5Tuoi: this.formGroup.value.isHocLopMG5Tuoi ? 1 : 0,
      isBietBoiKy1: this.formGroup.value.isBietBoiKy1 ? 1 : 0,
      isHsdtHtnn: this.formGroup.value.isHsdtHtnn ? 1 : 0,
      isHsdtTctv: this.formGroup.value.isHsdtTctv ? 1 : 0,
      isHoc2Buoi: this.formGroup.value.isHoc2Buoi ? 1 : 0,
      isVungKhoKhan: this.formGroup.value.isVungKhoKhan ? 1 : 0,
      isHoTroChiPhiHocTap: this.formGroup.value.isHoTroChiPhiHocTap ? 1 : 0,
      isCapGao: this.formGroup.value.isCapGao ? 1 : 0,
      isKhuyetTatHocChuyenBiet: this.formGroup.value.isKhuyetTatHocChuyenBiet ? 1 : 0,
      isDuDieuKienXetTotNghiep: this.formGroup.value.isDuDieuKienXetTotNghiep ? 1 : 0,
      partyMember: this.formGroup.value.partyMember ? 1 : 0,
      unionMember: this.formGroup.value.unionMember ? 1 : 0,
      isHocSinhTiengDanToc: this.formGroup.value.isHocSinhTiengDanToc ? 1 : 0,
      kiNangSong: this.formGroup.value.kiNangSong ? 1 : 0,
      isMienHocPhi: this.formGroup.value.isMienHocPhi ? 1 : 0,
      isHoTroNhaO: this.formGroup.value.isHoTroNhaO ? 1 : 0,
      isMoiTuyenDauCap: this.formGroup.value.isMoiTuyenDauCap ? 1 : 0,
      isHocTinHoc: this.formGroup.value.isHocTinHoc ? 1 : 0,
      isHsTotNghiepThcs: this.formGroup.value.isHsTotNghiepThcs ? 1 : 0,
      isHocCTGDCuaBo: this.formGroup.value.isHocCTGDCuaBo ? 1 : 0,
      isHocSinhNoiTruDanNuoi: this.formGroup.value.isHocSinhNoiTruDanNuoi ? 1 : 0,
      isHocSinhBanTruDanNuoi: this.formGroup.value.isHocSinhBanTruDanNuoi ? 1 : 0,
      isHocSinhPtDtBanTru: this.formGroup.value.isHocSinhPtDtBanTru ? 1 : 0,
      isMeDt: this.formGroup.value.isMeDt ? 1 : 0,
      isChaDt: this.formGroup.value.isChaDt ? 1 : 0,
      isLuuBanNamTruoc: this.formGroup.value.isLuuBanNamTruoc ? 1 : 0,
      isHsdtTroGiang: this.formGroup.value.isHsdtTroGiang ? 1 : 0,
      isHocLopBanTru: this.formGroup.value.isHocLopBanTru ? 1 : 0,
      isHoNgheo: this.formGroup.value.isHoNgheo ? 1 : 0,
      isGiamHocPhi: this.formGroup.value.isGiamHocPhi ? 1 : 0,
      isCapTienHangThang: this.formGroup.value.isCapTienHangThang ? 1 : 0,
      isKhuyetTatHocHoaNhap: this.formGroup.value.isKhuyetTatHocHoaNhap ? 1 : 0,
      isHsDttsRatItNguoiDuocHtht: this.formGroup.value.isHsDttsRatItNguoiDuocHtht ? 1 : 0,
      isPhCoSmartphone: this.formGroup.value.isPhCoSmartphone ? 1 : 0,
      isPhCoMayTinhInternet: this.formGroup.value.isPhCoMayTinhInternet ? 1 : 0,

      //thông tin phụ huynh
      //Bố ruột
      isCreateFatherAccount: this.formGroup.value.isCreateFatherAccount ? 1 : 0,
      fatherAvatar: this.formGroup.value.isCreateFatherAccount ? this.formGroup.value.fatherAvatar : null,
      fatherFullName: this.formGroup.value.isCreateFatherAccount ? this.formGroup.value.fatherFullName : '',
      fatherCode: this.formGroup.value.isCreateFatherAccount ? this.formGroup.value.fatherCode : '',
      // mối quan hệ, giới tính ?????
      fatherIsAccessApp: this.formGroup.value.fatherIsAccessApp ? 1 : 0,
      fatherIsActive: this.formGroup.value.fatherIsActive ? 1 : 0,
      fatherUserName: this.formGroup.value.isCreateFatherAccount ? this.formGroup.value.fatherUserName : '',
      fatherPassword: this.formGroup.value.isCreateFatherAccount ? this.formGroup.value.fatherPassword : null,
      fatherPhone: this.formGroup.value.isCreateFatherAccount ? this.formGroup.value.fatherPhone : '',
      fatherEmail: this.formGroup.value.isCreateFatherAccount ? this.formGroup.value.fatherEmail : '',
      fatherBirthday: this.formGroup.value.isCreateFatherAccount ? this.formGroup.value.fatherBirthday : null,
      fatherJob: this.formGroup.value.isCreateFatherAccount ? this.formGroup.value.fatherJob : '',

      //Mẹ đẻ
      isCreateMotherAccount: this.formGroup.value.isCreateMotherAccount ? 1 : 0,
      motherAvatar: this.formGroup.value.isCreateMotherAccount ? this.formGroup.value.motherAvatar : null,
      motherFullName: this.formGroup.value.isCreateMotherAccount ? this.formGroup.value.motherFullName : '',
      motherCode: this.formGroup.value.isCreateMotherAccount ? this.formGroup.value.motherCode : '',
      // mối quan hệ, giới tính ?????
      motherIsAccessApp: this.formGroup.value.motherIsAccessApp ? 1 : 0,
      motherIsActive: this.formGroup.value.motherIsActive ? 1 : 0,
      motherUserName: this.formGroup.value.isCreateMotherAccount ? this.formGroup.value.motherUserName : '',
      motherPassword: this.formGroup.value.isCreateMotherAccount ? this.formGroup.value.motherPassword : null,
      motherPhone: this.formGroup.value.isCreateMotherAccount ? this.formGroup.value.motherPhone : '',
      motherEmail: this.formGroup.value.isCreateMotherAccount ? this.formGroup.value.motherEmail : '',
      motherBirthday: this.formGroup.value.isCreateMotherAccount ? this.formGroup.value.motherBirthday : null,
      motherJob: this.formGroup.value.isCreateMotherAccount ? this.formGroup.value.motherJob : '',

      //người đỡ đầu
      isCreateTutorAccount: this.formGroup.value.isCreateTutorAccount ? 1 : 0,
      tutorAvatar: this.formGroup.value.isCreateTutorAccount ? this.formGroup.value.tutorAvatar : null,
      tutorFullName: this.formGroup.value.isCreateTutorAccount ? this.formGroup.value.tutorFullName : '',
      tutorCode: this.formGroup.value.isCreateTutorAccount ? this.formGroup.value.tutorCode : '',
      tutorIsAccessApp: this.formGroup.value.tutorIsAccessApp ? 1 : 0,
      tutorIsActive: this.formGroup.value.tutorIsActive ? 1 : 0,
      tutorGender: this.formGroup.value.tutorGender ? 2 : 1,
      tutorUserName: this.formGroup.value.isCreateTutorAccount ? this.formGroup.value.tutorUserName : '',
      tutorPassword: this.formGroup.value.isCreateTutorAccount ? this.formGroup.value.tutorPassword : null,
      tutorPhone: this.formGroup.value.isCreateTutorAccount ? this.formGroup.value.tutorPhone : '',
      tutorEmail: this.formGroup.value.isCreateTutorAccount ? this.formGroup.value.tutorEmail : '',
      tutorBirthday: this.formGroup.value.isCreateTutorAccount ? this.formGroup.value.tutorBirthday : null,
      tutorJob: this.formGroup.value.isCreateTutorAccount ? this.formGroup.value.tutorJob : '',
    }

    // for (const key in this.formGroup.controls) {//log ra các feid đang bắt validator
    //   if (this.formGroup.get(key)?.hasError('required'))
    //     console.log("validator required", key);
    // }
    this.listenFireBase('update', 'student');
    this.studentService.updateStudent(dataRequest).subscribe((res: any) => {
      this.isLoading = false;
    },
      (_err: any) => {
        this.isLoading = false;
        this.validateAllFormFieldsErrorServer(_err.errors);
      })
  }

  onSubmit() {
    // this.updateStudent();
    if (this.formGroup.valid) {
      this.updateStudent();
    } else {
      this.validateAllFormFields(this.formGroup);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((item: FormGroup) => {
          this.validateAllFormFields(item);
        })
      }
    });
  }

  validateAllFormFieldsErrorServer(error: any) {
    Object.keys(error).forEach(key => {
      let arrKey = String(key).split('.');
      let indexKey = '';
      if (arrKey.length == 1) {
        this.validationMessagesServer[arrKey[0]] = {
          message: error[key]
        }
      } else {
        arrKey.forEach((itemKey: any) => {
          if (!isNaN(itemKey)) {
            indexKey += `${itemKey}`;
          }
          Object.keys(this.validationMessagesServer).forEach(itemMessage => {
            if (itemMessage == arrKey[arrKey.length - 1]) {
              if (indexKey) {
                this.validationMessagesServer[itemMessage][indexKey] = {
                  message: error[key]
                }
              }
            }
          });
        })
      }
    });
  }

  checkCreateParentsValdidator() {
    if (this.studentPesonInfo?.father != null) {
      this.onChangeisCreateAccount(true, 1);
      this.formGroup.get('fatherPassword').clearValidators();//đã tạo mới phụ huynh thì không validator password
      this.formGroup.get('fatherPassword').updateValueAndValidity();
    }
    if (this.studentPesonInfo?.mother != null) {
      this.onChangeisCreateAccount(true, 2);
      this.formGroup.get('motherPassword').clearValidators();//đã tạo mới phụ huynh thì không validator password
      this.formGroup.get('motherPassword').updateValueAndValidity();
    }
    if (this.studentPesonInfo?.tutor != null) {
      this.onChangeisCreateAccount(true, 3);
      this.formGroup.get('tutorPassword').clearValidators();//đã tạo mới phụ huynh thì không validator password
      this.formGroup.get('tutorPassword').updateValueAndValidity();
    }
  }

  onChangeisCreateAccount(event, type: number) {// Bố ruột: 1, Mẹ đẻ: 2, người đỡ đầu: 3
    let getParentKey: Array<any>;
    switch (type) {
      case 1:
        getParentKey = this.dataSetOrClearValidator.createFatherAccountKey;
        break;
      case 2:
        getParentKey = this.dataSetOrClearValidator.createMotherAccountKey;
        break;
      case 3:
        getParentKey = this.dataSetOrClearValidator.createTutorAccountKey;
        break;
    }

    if (!event) {
      getParentKey?.forEach((item) => {/* ko click checkbox tạo phụ huynh thì clear validator */
        this.formGroup.get(item).clearValidators();
        this.formGroup.get(item).updateValueAndValidity();
      });
    }

    else {
      getParentKey?.forEach((item, index) => {/* click tạo phụ huynh thì set validator */
        this.formGroup.get(item).setValidators(this.validationType[index]);
        this.formGroup.get(item).updateValueAndValidity();
      });
    }
  }

  onChangeFileInputAvatar(event, inputFor): void {//inputFor//học sinh-1, bố ruột-2, mẹ đẻ-3, người đỡ đầu-4
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.resizeImageService.readFile(file, subscriber);
      })
      dataReadFile.subscribe((data) => {
        switch (inputFor) {
          case 1:
            this.avatarUser = data as string;
            break;
          case 2:
            this.fatherAvatarDefault = data as string;
            break;
          case 3:
            this.motherAvatarDefault = data as string;
            break;
          case 4:
            this.tutorAvatarDefault = data as string;
            break;
        }
        let dataInput = {
          base64Input: data,
          fileName: `${moment().format('x')}-${file.name}`
        }
        this.generalService.uploadFileBase64(dataInput).subscribe((res: any) => {
          switch (inputFor) {
            case 1:
              this.formGroup.controls["avatar"].setValue(res.data);// học sinh
              break;
            case 2:
              this.formGroup.controls["fatherAvatar"].setValue(res.data);//bố
              break;
            case 3:
              this.formGroup.controls["motherAvatar"].setValue(res.data);//mẹ
              break;
            case 4:
              this.formGroup.controls["tutorAvatar"].setValue(res.data);//người đỡ đầu
              break;
          }
        })
      })
    }
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  onDeleteFileInputAvatar(inputFor): void {
    this.fileInputAvatar.nativeElement.value = '';
    switch (inputFor) {
      case 1:
        this.avatarUser = AVATAR_DEFAULT;
        this.formGroup.controls["avatar"].setValue(this.avatarUser);// học sinh
        break;
      case 2:
        this.fatherAvatarDefault = AVATAR_DEFAULT;
        this.formGroup.controls["fatherAvatar"].setValue(this.fatherAvatarDefault);//bố
        break;
      case 3:
        this.motherAvatarDefault = AVATAR_DEFAULT;
        this.formGroup.controls["motherAvatar"].setValue(this.motherAvatarDefault);//mẹ
        break;
      case 4:
        this.tutorAvatarDefault = AVATAR_DEFAULT;
        this.formGroup.controls["tutorAvatar"].setValue(this.tutorAvatarDefault);//người đỡ đầu
        break;
    }
  }

  dataTimeBirthday(event: any, sendFrom) {//lấy ngày sinh date picker
    switch (sendFrom) {
      case 1:// học sinh
        this.formGroup.get('birthday').setValue(Number(event));
        break;
      case 2://ngày cấp
        this.formGroup.get('idNumberIssueDate').setValue(Number(event));
        break;
      case 3://mẹ đẻ
        this.formGroup.get('fatherBirthday').setValue(Number(event));
        break;
      case 4://bố ruột
        this.formGroup.get('motherBirthday').setValue(Number(event));
        break;
      case 5://người đỡ đầu
        this.formGroup.get('tutorBirthday').setValue(Number(event));
        break;
    }
  }

  getStudentDataRelate() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.studentService.getStudentDataRelate().subscribe((res: any) => {
      this.studentDataRelate = res.data;
      this.initForm();
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
    });
  }

  getStudentPesonInfo() {
    this.isLoading = true;
    this.studentService.getStudentPesonInfo(this.studentId).subscribe((res: any) => {
      this.studentPesonInfo = res.data;
      if (this.studentPesonInfo?.avatar) {/* đã tạo avatar thì đưa lên input */
        this.avatarUser = this.studentPesonInfo?.avatar;
      }
      if (this.studentPesonInfo?.father?.avatar) {/* đã tạo avatar thì đưa lên input */
        this.fatherAvatarDefault = this.studentPesonInfo?.father?.avatar;
      }
      if (this.studentPesonInfo?.mother?.avatar) {/* đã tạo avatar thì đưa lên input */
        this.motherAvatarDefault = this.studentPesonInfo?.mother?.avatar;
      }
      if (this.studentPesonInfo?.tutor?.avatar) {/* đã tạo avatar thì đưa lên input */
        this.tutorAvatarDefault = this.studentPesonInfo?.tutor?.avatar;
      }
      this.getCityList();
      if (this.studentPesonInfo?.cityCode) {
        this.getDistrictList(this.studentPesonInfo?.cityCode);
      }
      if (this.studentPesonInfo?.thanhPhoNoiSinh) {
        this.getDistrictList(this.studentPesonInfo?.thanhPhoNoiSinh, 1);
      }
      if (this.studentPesonInfo?.districtCode) {
        this.getWardList(this.studentPesonInfo?.districtCode);
      }
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    }
    );
  }

  getCityList(): void {
    this.isLoading = true;
    this.locationService.getCityList().subscribe((res: any): void => {
      this.cityList = res.data;
      this.cityListHK = res.data;
      this.getStudentDataRelate();
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);

    }
    );
  }

  getDistrictList(cityCode: string, type?: number): void {
    this.isLoading = true;
    this.locationService.getDistrictList(cityCode).subscribe((res: any): void => {
      if (type == 1) {
        this.districtListHK = res.data;
      }
      else {
        this.districtList = res.data;
      }
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    }
    );
  }

  getWardList(districtCode: string): void {
    this.isLoading = true;
    this.locationService.getWardList(districtCode).subscribe((res: any): void => {
      this.wardList = res.data;
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    }
    );
  }

  onChangeCity(event, type?: number): void {
    if (type == 1) {
      event ? this.getDistrictList(event, 1) : this.districtListHK = [];
      this.formGroup.get('quanHuyenNoiSinh').patchValue('');
    }
    else {
      event ? this.getDistrictList(event) : this.districtList = [];
      this.formGroup.get('districtCode').patchValue('');
    }
  }

  onChangeDistrict(event): void {
    event ? this.getWardList(event) : this.wardList = [];
    this.formGroup.get('wardCode').patchValue('');
  }

  isTabPersonalOrParents() {
    this.tabPersonalOrParents = !this.tabPersonalOrParents;
  }


  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        this.router.navigate(['/tenant/student']);
      } else {
        this.isLoading = false;
      }
    });
  }

  validationMessages = {
    'fullName': [
      { type: 'required', message: 'requiredName' },
      { type: 'pattern', message: 'student.validators.fullName.pattern' },
      { type: 'maxlength', message: 'student.validators.fullName.maxlength' },

    ],
    'code': [
      { type: 'required', message: 'requiredCode' },
      { type: 'pattern', message: 'patternCode' },
      { type: 'maxlength', message: 'maxLengthCode' },

    ],
    'moetCode': [
      { type: 'required', message: 'requiredCode' },
      { type: 'pattern', message: 'patternCode' },
      { type: 'maxlength', message: 'maxLengthCode' },
    ],
    'birthday': [
      { type: 'required', message: 'student.validators.birthday.required' },
    ],
    'schoolId': [
      { type: 'required', message: 'student.validators.schoolId.required' },
    ],
    'gradeId': [
      { type: 'required', message: 'student.validators.gradeId.required' },
    ],
    'username': [
      { type: 'required', message: 'student.validators.username.required' },
      { type: 'minlength', message: 'student.validators.username.minlength' },
      { type: 'maxlength', message: 'student.validators.username.maxlength' },
      { type: 'pattern', message: 'student.validators.username.pattern' },
    ],
    'password': [
      { type: 'required', message: 'requiredPassword' },
      { type: 'minlength', message: 'student.validators.password.minlength' },
      { type: 'maxlength', message: 'student.validators.password.maxlength' },
      { type: 'pattern', message: 'student.validators.password.pattern' },
    ],
    'status': [
      { type: 'required', message: 'student.validators.status.required' },
    ],
    'homeroomClassId': [
      { type: 'required', message: 'student.validators.homeroomClassId.required' },
    ],
    'ethnic': [
      { type: 'required', message: 'student.validators.ethnic.required' },
    ],
    'email': [
      { type: 'required', message: 'student.validators.email.required' },
      { type: 'email', message: 'student.validators.email.email' },
    ],
    'phone': [
      { type: 'required', message: 'student.validators.phone.required' },
      { type: 'pattern', message: 'student.validators.phone.pattern' },
    ],
    'cityCode': [
      { type: 'required', message: 'student.validators.cityCode.required' },
    ],
    'thuTu': [
      { type: 'pattern', message: 'student.validators.thuTu.pattern' },
    ],
    'idNumber': [
      { type: 'pattern', message: 'student.validators.idNumber.pattern' },
    ],
    'fatherFullName': [
      { type: 'required', message: 'requiredName' },
      { type: 'pattern', message: 'student.validators.fatherFullName.pattern' },
      { type: 'maxlength', message: 'student.validators.fatherFullName.maxlength' },

    ],
    'fatherCode': [
      { type: 'required', message: 'requiredCode' },
      { type: 'pattern', message: 'patternCode' },
      { type: 'maxlength', message: 'maxLengthCode' },

    ],
    'fatherUserName': [
      { type: 'required', message: 'student.validators.fatherUserName.required' },
      { type: 'maxlength', message: 'student.validators.fatherUserName.maxlength' },
      { type: 'maxLength', message: 'student.validators.fatherUserName.maxlength' },
      { type: 'pattern', message: 'student.validators.fatherUserName.pattern' },
    ],
    'fatherPassword': [
      { type: 'required', message: 'requiredPassword' },
      { type: 'minlength', message: 'minLengthPassword' },
      { type: 'maxlength', message: 'maxLengthPassword' },
      { type: 'pattern', message: 'student.validators.fatherPassword.pattern' },
    ],
    'fatherPhone': [
      { type: 'pattern', message: 'student.validators.fatherPhone.pattern' },
    ],
    'fatherEmail': [
      { type: 'email', message: 'student.validators.fatherEmail.email' },
    ],
    'motherFullName': [
      { type: 'required', message: 'requiredName' },
      { type: 'pattern', message: 'student.validators.motherFullName.pattern' },
      { type: 'maxlength', message: 'student.validators.motherFullName.maxlength' },

    ],
    'motherCode': [
      { type: 'required', message: 'requiredCode' },
      { type: 'pattern', message: 'patternCode' },
      { type: 'maxlength', message: 'maxLengthCode' },

    ],
    'motherUserName': [
      { type: 'required', message: 'student.validators.motherUserName.required' },
      { type: 'minlength', message: 'student.validators.motherUserName.minlength' },
      { type: 'maxlength', message: 'student.validators.motherUserName.maxlength' },
      { type: 'pattern', message: 'student.validators.motherUserName.pattern' },
    ],
    'motherPassword': [
      { type: 'required', message: 'requiredPassword' },
      { type: 'minlength', message: 'minLengthPassword' },
      { type: 'maxlength', message: 'maxLengthPassword' },
      { type: 'pattern', message: 'student.validators.motherPassword.pattern' },
    ],
    'motherPhone': [
      { type: 'pattern', message: 'student.validators.motherPhone.pattern' },
    ],
    'motherEmail': [
      { type: 'email', message: 'student.validators.motherEmail.email' },
    ],
    'tutorFullName': [
      { type: 'required', message: 'requiredName' },
      { type: 'pattern', message: 'student.validators.tutorFullName.pattern' },
      { type: 'maxlength', message: 'student.validators.tutorFullName.maxlength' },

    ],
    'tutorCode': [
      { type: 'required', message: 'requiredCode' },
      { type: 'pattern', message: 'patternCode' },
      { type: 'maxlength', message: 'maxLengthCode' },

    ],
    'tutorUserName': [
      { type: 'required', message: 'student.validators.tutorUserName.required' },
      { type: 'minlength', message: 'student.validators.tutorUserName.minlength' },
      { type: 'maxlength', message: 'student.validators.tutorUserName.maxlength' },
      { type: 'pattern', message: 'student.validators.tutorUserName.pattern' },
    ],
    'tutorPassword': [
      { type: 'required', message: 'requiredPassword' },
      { type: 'minlength', message: 'minLengthPassword' },
      { type: 'maxlength', message: 'maxLengthPassword' },
      { type: 'pattern', message: 'student.validators.tutorPassword.pattern' },
    ],
    'tutorPhone': [
      { type: 'pattern', message: 'student.validators.tutorPhone.pattern' },
    ],
    'tutorEmail': [
      { type: 'email', message: 'student.validators.tutorEmail.email' },
    ]
  }

  validationMessagesServer = {
    avatar: {},
    fullName: {},
    moetCode: {},
    gender: {},
    code: {},
    birthday: {},
    isHocSongNgu: {},
    isAccessApp: {},
    isActive: {},
    schoolId: {},
    gradeId: {},
    username: {},
    password: {},
    status: {},
    homeroomClassId: {},
    ethnic: {},
    selectedType: {},
    bloodType: {},
    religion: {},
    email: {},
    priorityLevel: {},
    phone: {},
    nationality: {},
    address: {},
    permanentResidence: {},
    cityCode: {},
    placeOfBirth: {},
    districtCode: {},
    thanhPhoNoiSinh: {},
    wardCode: {},
    quanHuyenNoiSinh: {},
    aceCode: {},
    isHoanThanhCTrinhTieuHoc: {},
    danTocTheoGiayKhai: {},
    thonXom: {},
    currentAccommodation: {},
    thuTu: {},
    maKhuVuc: {},
    benhVeMat: {},
    disablilityCode: {},
    idNumber: {},
    policyObject: {},
    idNumberIssueDate: {},
    huongNghiepDayNghe: {},
    idNumberIssueBy: {},
    maLyDoThoiHoc: {},
    maSoBuoiHocTrenTuan: {},
    isKhuyetTatKhongDanhGia: {},
    isHocLopMG5Tuoi: {},
    isBietBoiKy1: {},
    isHsdtHtnn: {},
    isHsdtTctv: {},
    isHoc2Buoi: {},
    isVungKhoKhan: {},
    isHoTroChiPhiHocTap: {},
    isCapGao: {},
    isKhuyetTatHocChuyenBiet: {},
    isDuDieuKienXetTotNghiep: {},
    partyMember: {},
    unionMember: {},
    isHocSinhTiengDanToc: {},
    kiNangSong: {},
    isMienHocPhi: {},
    isHoTroNhaO: {},
    isMoiTuyenDauCap: {},
    isHocTinHoc: {},
    isHsTotNghiepThcs: {},
    isHocCTGDCuaBo: {},
    isHocSinhNoiTruDanNuoi: {},
    isHocSinhBanTruDanNuoi: {},
    isHocSinhPtDtBanTru: {},
    isMeDt: {},
    isChaDt: {},
    isLuuBanNamTruoc: {},
    isHsdtTroGiang: {},
    isHocLopBanTru: {},
    isHoNgheo: {},
    isGiamHocPhi: {},
    isCapTienHangThang: {},
    isKhuyetTatHocHoaNhap: {},
    isHsDttsRatItNguoiDuocHtht: {},
    isPhCoSmartphone: {},
    isPhCoMayTinhInternet: {},
    isCreateFatherAccount: {},
    fatherAvatar: {},
    fatherFullName: {},
    fatherCode: {},
    fatherIsAccessApp: {},
    fatherIsActive: {},
    fatherUserName: {},
    fatherPassword: {},
    fatherPhone: {},
    fatherEmail: {},
    fatherBirthday: {},
    fatherJob: {},
    isCreateMotherAccount: {},
    motherAvatar: {},
    motherFullName: {},
    motherCode: {},
    motherIsAccessApp: {},
    motherIsActive: {},
    motherUserName: {},
    motherPassword: {},
    motherPhone: {},
    motherEmail: {},
    motherBirthday: {},
    motherJob: {},
    isCreateTutorAccount: {},
    tutorAvatar: {},
    tutorFullName: {},
    tutorCode: {},
    tutorIsAccessApp: {},
    tutorIsActive: {},
    tutorGender: {},
    tutorUserName: {},
    tutorPassword: {},
    tutorPhone: {},
    tutorEmail: {},
    tutorBirthday: {},
    tutorJob: {},
  }

  dataSetOrClearValidator = {
    "createFatherAccountKey": [
      "fatherFullName",//0
      "fatherCode",//1
      "fatherUserName",//2
      "fatherPassword",//3
      "fatherPhone",//4
      "fatherEmail",//5
    ],

    "createMotherAccountKey": [
      "motherFullName",//0
      "motherCode",//1
      "motherUserName",//2
      "motherPassword",//3
      "motherPhone",//4
      "motherEmail",//5
    ],

    "createTutorAccountKey": [
      "tutorFullName",//0
      "tutorCode",//1
      "tutorUserName",//2
      "tutorPassword",//3
      "tutorPhone",//4
      "tutorEmail",//5
    ],
  }

  validationType = {// use in forEach
    '0': [Validators.required, Validators.maxLength(255)],//FullName
    '1': [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_CODE)],//Code
    '2': [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)],//UserName
    '3': [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)],//Password
    '4': [Validators.pattern(REGEX_PHONE)],//Phone
    '5': [Validators.email],//Email

  }
}
