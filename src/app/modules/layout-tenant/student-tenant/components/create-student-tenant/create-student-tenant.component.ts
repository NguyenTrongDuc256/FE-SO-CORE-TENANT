import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { ResizeImageService } from 'src/app/_services/resize-image.service';
import { AVATAR_DEFAULT, GENDER, MESSAGE_ERROR_CALL_API, REGEX_CODE, REGEX_PASSWORD, REGEX_PHONE, REGEX_USER_NAME, STUDENT_STATUS_SELECT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import * as moment from 'moment';
import { GeneralService } from 'src/app/_services/general.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { CreateStudentModel } from 'src/app/_models/layout-tenant/student/create-student.model';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { StudentService } from 'src/app/_services/layout-tenant/student/student.service';
import { LocationService } from 'src/app/_services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student-tenant',
  templateUrl: './create-student-tenant.component.html',
  styleUrls: ['./create-student-tenant.component.scss']
})
export class CreateStudentTenantComponent implements OnInit {
  isLoading: boolean = false;
  infoForm!: FormGroup;
  avatarUser: string = AVATAR_DEFAULT;
  fatherAvatarDefault: string = AVATAR_DEFAULT;
  motherAvatarDefault: string = AVATAR_DEFAULT;
  tutorAvatarDefault: string = AVATAR_DEFAULT;

  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;
  tabPersonalOrParents: boolean = true;
  gender = GENDER;
  currentDate = "1653706178"; // Date picker ngày truyền lên
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  studentStatus = STUDENT_STATUS_SELECT;
  studentDataRelate: any;
  dataGrades: any; // data khối
  dataHomeroomClasses: any; //data lớp
  cityList: any[] = [];
  districtList: any[] = [];
  wardList: any[] = [];
  cityListHK: any[] = [];
  districtListHK: any[] = [];
  txtSelect: string = 'student.select';
  nzNotFoundContent: string = 'student.notFoundContent';
  isShowPassword = false;

  constructor(
    private resizeImageService: ResizeImageService,
    private generalService: GeneralService,
    private studentService: StudentService,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private locationService: LocationService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getCityList()
    this.getStudentDataRelate();
    this.initForm();
  }

  initForm() {
    this.infoForm = this.fb.group({
      avatar: [],
      fullName: ['', [Validators.required]],
      moetCode: ['', [Validators.pattern(REGEX_CODE), Validators.maxLength(50)]],
      gender: 1,
      code: ['', [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(50)]],
      birthday: [''],//không có formcontrollname bên html, lấy từ hàm datepicker
      isHocSongNgu: false,
      isAccessApp: false,
      isActive: true,
      //thong tin chung
      schoolId: ['', [Validators.required]],
      gradeId: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)]],
      status: ['', [Validators.required]],
      homeroomClassId: [''],
      ethnic: ['', [Validators.required]],
      selectedType: [''],//hình thức trúng tuyển
      bloodType: [],
      religion: [''],
      email: ['', [Validators.email]],
      priorityLevel: [''], //đối tượng ưu tiên
      phone: ['', [Validators.pattern(REGEX_PHONE)]],
      nationality: [''],
      address: [],
      permanentResidence: [],
      cityCode: ['', [Validators.required]],
      placeOfBirth: [],
      districtCode: [''],///quận huyện,  ăn theo cityCode
      thanhPhoNoiSinh: [''],// Tỉnh/TP theo HK
      wardCode: [''],//phường xã , ăn theo districtCode
      quanHuyenNoiSinh: [''],// Quận/Huyện theo HK
      aceCode: [],
      isHoanThanhCTrinhTieuHoc: false,
      danTocTheoGiayKhai: [],
      thonXom: [],
      currentAccommodation: [],
      thuTu: ['', Validators.pattern(/^\d+$/)],

      //thong tin ca nhan
      maKhuVuc: [''],
      benhVeMat: [''],
      disablilityCode: [''],
      idNumber: ['', Validators.pattern(/^\d+$/)],
      policyObject: [''],
      idNumberIssueDate: [''],//không có formcontrollname bên html, lấy từ hàm datepicker
      huongNghiepDayNghe: [''],
      idNumberIssueBy: [''],//nơi cấp
      maLyDoThoiHoc: [],
      maSoBuoiHocTrenTuan: [''],
      //checkbox
      isKhuyetTatKhongDanhGia: false,
      isHocLopMG5Tuoi: false,
      isBietBoiKy1: false,
      isHsdtHtnn: false,
      isHsdtTctv: false,
      isHoc2Buoi: false,
      isVungKhoKhan: false,
      isHoTroChiPhiHocTap: false,
      isCapGao: false,
      isKhuyetTatHocChuyenBiet: false,
      isDuDieuKienXetTotNghiep: false,
      partyMember: false,
      unionMember: false,
      isHocSinhTiengDanToc: false,
      kiNangSong: false,
      isMienHocPhi: false,
      isHoTroNhaO: false,
      isMoiTuyenDauCap: false,
      isHocTinHoc: false,
      isHsTotNghiepThcs: false,
      isHocCTGDCuaBo: false,
      isHocSinhNoiTruDanNuoi: false,
      isHocSinhBanTruDanNuoi: false,
      isHocSinhPtDtBanTru: false,
      isMeDt: false,
      isChaDt: false,
      isLuuBanNamTruoc: false,
      isHsdtTroGiang: false,
      isHocLopBanTru: false,
      isHoNgheo: false,
      isGiamHocPhi: false,
      isCapTienHangThang: false,
      isKhuyetTatHocHoaNhap: false,
      isHsDttsRatItNguoiDuocHtht: false,
      isPhCoSmartphone: false,
      isPhCoMayTinhInternet: false,

      //thông tin phụ huynh
      //Bố ruột
      isCreateFatherAccount: true,
      fatherAvatar: [],
      fatherFullName: ['', [Validators.required]],
      fatherCode: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_CODE)]],
      fatherIsAccessApp: false,
      fatherIsActive: false,
      fatherUserName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      fatherPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)]],
      fatherPhone: ['', [Validators.pattern(REGEX_PHONE)]],
      fatherEmail: ['', [Validators.email]],
      fatherBirthday: [''],
      fatherJob: [''],

      //Mẹ đẻ
      // isCreateMotherAccount: true,
      // motherAvatar: [],
      // motherFullName: ['', [Validators.required]],
      // motherCode: ['', [Validators.required,Validators.maxLength(50), Validators.pattern(REGEX_CODE)]],
      // motherIsAccessApp: false,
      // motherIsActive: false,
      // motherUserName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      // motherPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)]],
      // motherPhone: ['', [Validators.pattern(REGEX_PHONE)]],
      // motherEmail: ['', [Validators.email]],
      // motherBirthday: [''],
      // motherJob: [],
      isCreateMotherAccount: false,
      motherAvatar: [],
      motherFullName: [''],
      motherCode: [''],
      motherIsAccessApp: false,
      motherIsActive: false,
      motherUserName: [''],
      motherPassword: [''],
      motherPhone: [''],
      motherEmail: [''],
      motherBirthday: [''],
      motherJob: [],

      //người đỡ đầu
      // isCreateTutorAccount: true,
      // tutorAvatar: [],
      // tutorFullName: ['', [Validators.required]],
      // tutorCode: ['', [Validators.required,Validators.maxLength(50), Validators.pattern(REGEX_CODE)]],
      // tutorIsAccessApp: false,
      // tutorIsActive: false,
      // tutorGender: 1,
      // tutorUserName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      // tutorPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)]],
      // tutorPhone: ['', [Validators.pattern(REGEX_PHONE)]],
      // tutorEmail: ['', [Validators.email]],
      // tutorBirthday: [''],
      // tutorJob: [],
      isCreateTutorAccount: false,
      tutorAvatar: [],
      tutorFullName: [''],
      tutorCode: [''],
      tutorIsAccessApp: false,
      tutorIsActive: false,
      tutorGender: 1,
      tutorUserName: [''],
      tutorPassword: [''],
      tutorPhone: [''],
      tutorEmail: [''],
      tutorBirthday: [''],
      tutorJob: [],

    });

  }

  createStudent() {
    this.isLoading = true;
    let dataRequest: CreateStudentModel = {
      avatar: this.infoForm.value.avatar,
      fullName: this.infoForm.value.fullName,
      moetCode: this.infoForm.value.moetCode,
      gender: this.infoForm.value.gender,
      code: this.infoForm.value.code,
      birthday: this.infoForm.value.birthday ? this.infoForm.value.birthday : null,
      isHocSongNgu: this.infoForm.value.isHocSongNgu ? 1 : 0,
      isAccessApp: this.infoForm.value.isAccessApp ? 1 : 0,
      isActive: this.infoForm.value.isActive ? 1 : 0,

      //thong tin chung
      schoolId: this.infoForm.value.schoolId,
      gradeId: this.infoForm.value.gradeId,
      username: this.infoForm.value.username,
      password: this.infoForm.value.password,
      status: this.infoForm.value.status,
      homeroomClassId: this.infoForm.value.homeroomClassId ? this.infoForm.value.homeroomClassId : null,
      ethnic: this.infoForm.value.ethnic,
      selectedType: this.infoForm.value.selectedType,//hình thức trúng tuyển
      bloodType: this.infoForm.value.bloodType,
      religion: this.infoForm.value.religion,
      email: this.infoForm.value.email,
      priorityLevel: this.infoForm.value.priorityLevel, //đối tượng ưu tiên
      phone: this.infoForm.value.phone,
      nationality: this.infoForm.value.nationality,
      address: this.infoForm.value.address,
      permanentResidence: this.infoForm.value.permanentResidence,
      cityCode: this.infoForm.value.cityCode,
      placeOfBirth: this.infoForm.value.placeOfBirth,
      districtCode: this.infoForm.value.districtCode,
      thanhPhoNoiSinh: this.infoForm.value.thanhPhoNoiSinh,
      wardCode: this.infoForm.value.wardCode, //phường xã , ăn theo districtCode
      quanHuyenNoiSinh: this.infoForm.value.quanHuyenNoiSinh,// Quận/Huyện theo HK
      aceCode: this.infoForm.value.aceCode,
      isHoanThanhCTrinhTieuHoc: this.infoForm.value.isHoanThanhCTrinhTieuHoc ? 1 : 0,
      danTocTheoGiayKhai: this.infoForm.value.danTocTheoGiayKhai,
      thonXom: this.infoForm.value.thonXom,
      currentAccommodation: this.infoForm.value.currentAccommodation,
      thuTu: this.infoForm.value.thuTu ? this.infoForm.value.thuTu : null,

      //thong tin ca nhan
      maKhuVuc: this.infoForm.value.maKhuVuc,
      benhVeMat: this.infoForm.value.benhVeMat,
      disablilityCode: this.infoForm.value.disablilityCode,
      idNumber: this.infoForm.value.idNumber,
      policyObject: this.infoForm.value.policyObject,
      idNumberIssueDate: this.infoForm.value.idNumberIssueDate ? this.infoForm.value.idNumberIssueDate : null,
      huongNghiepDayNghe: this.infoForm.value.huongNghiepDayNghe,
      idNumberIssueBy: this.infoForm.value.idNumberIssueBy,//nơi cấp
      maLyDoThoiHoc: this.infoForm.value.maLyDoThoiHoc,
      maSoBuoiHocTrenTuan: this.infoForm.value.maSoBuoiHocTrenTuan,
      //checkbox
      isKhuyetTatKhongDanhGia: this.infoForm.value.isKhuyetTatKhongDanhGia ? 1 : 0,
      isHocLopMG5Tuoi: this.infoForm.value.isHocLopMG5Tuoi ? 1 : 0,
      isBietBoiKy1: this.infoForm.value.isBietBoiKy1 ? 1 : 0,
      isHsdtHtnn: this.infoForm.value.isHsdtHtnn ? 1 : 0,
      isHsdtTctv: this.infoForm.value.isHsdtTctv ? 1 : 0,
      isHoc2Buoi: this.infoForm.value.isHoc2Buoi ? 1 : 0,
      isVungKhoKhan: this.infoForm.value.isVungKhoKhan ? 1 : 0,
      isHoTroChiPhiHocTap: this.infoForm.value.isHoTroChiPhiHocTap ? 1 : 0,
      isCapGao: this.infoForm.value.isCapGao ? 1 : 0,
      isKhuyetTatHocChuyenBiet: this.infoForm.value.isKhuyetTatHocChuyenBiet ? 1 : 0,
      isDuDieuKienXetTotNghiep: this.infoForm.value.isDuDieuKienXetTotNghiep ? 1 : 0,
      partyMember: this.infoForm.value.partyMember ? 1 : 0,
      unionMember: this.infoForm.value.unionMember ? 1 : 0,
      isHocSinhTiengDanToc: this.infoForm.value.isHocSinhTiengDanToc ? 1 : 0,
      kiNangSong: this.infoForm.value.kiNangSong ? 1 : 0,
      isMienHocPhi: this.infoForm.value.isMienHocPhi ? 1 : 0,
      isHoTroNhaO: this.infoForm.value.isHoTroNhaO ? 1 : 0,
      isMoiTuyenDauCap: this.infoForm.value.isMoiTuyenDauCap ? 1 : 0,
      isHocTinHoc: this.infoForm.value.isHocTinHoc ? 1 : 0,
      isHsTotNghiepThcs: this.infoForm.value.isHsTotNghiepThcs ? 1 : 0,
      isHocCTGDCuaBo: this.infoForm.value.isHocCTGDCuaBo ? 1 : 0,
      isHocSinhNoiTruDanNuoi: this.infoForm.value.isHocSinhNoiTruDanNuoi ? 1 : 0,
      isHocSinhBanTruDanNuoi: this.infoForm.value.isHocSinhBanTruDanNuoi ? 1 : 0,
      isHocSinhPtDtBanTru: this.infoForm.value.isHocSinhPtDtBanTru ? 1 : 0,
      isMeDt: this.infoForm.value.isMeDt ? 1 : 0,
      isChaDt: this.infoForm.value.isChaDt ? 1 : 0,
      isLuuBanNamTruoc: this.infoForm.value.isLuuBanNamTruoc ? 1 : 0,
      isHsdtTroGiang: this.infoForm.value.isHsdtTroGiang ? 1 : 0,
      isHocLopBanTru: this.infoForm.value.isHocLopBanTru ? 1 : 0,
      isHoNgheo: this.infoForm.value.isHoNgheo ? 1 : 0,
      isGiamHocPhi: this.infoForm.value.isGiamHocPhi ? 1 : 0,
      isCapTienHangThang: this.infoForm.value.isCapTienHangThang ? 1 : 0,
      isKhuyetTatHocHoaNhap: this.infoForm.value.isKhuyetTatHocHoaNhap ? 1 : 0,
      isHsDttsRatItNguoiDuocHtht: this.infoForm.value.isHsDttsRatItNguoiDuocHtht ? 1 : 0,
      isPhCoSmartphone: this.infoForm.value.isPhCoSmartphone ? 1 : 0,
      isPhCoMayTinhInternet: this.infoForm.value.isPhCoMayTinhInternet ? 1 : 0,

      //thông tin phụ huynh
      //Bố ruột
      isCreateFatherAccount: this.infoForm.value.isCreateFatherAccount ? 1 : 0,
      fatherAvatar: this.infoForm.value.isCreateFatherAccount ? this.infoForm.value.fatherAvatar : '',
      fatherFullName: this.infoForm.value.isCreateFatherAccount ? this.infoForm.value.fatherFullName : '',
      fatherCode: this.infoForm.value.isCreateFatherAccount ? this.infoForm.value.fatherCode : '',
      // mối quan hệ, giới tính ?????
      fatherIsAccessApp: this.infoForm.value.fatherIsAccessApp ? 1 : 0,
      fatherIsActive: this.infoForm.value.fatherIsActive ? 1 : 0,
      fatherUserName: this.infoForm.value.isCreateFatherAccount ? this.infoForm.value.fatherUserName : '',
      fatherPassword: this.infoForm.value.isCreateFatherAccount ? this.infoForm.value.fatherPassword : null,
      fatherPhone: this.infoForm.value.isCreateFatherAccount ? this.infoForm.value.fatherPhone : '',
      fatherEmail: this.infoForm.value.isCreateFatherAccount ? this.infoForm.value.fatherEmail : '',
      fatherBirthday: this.infoForm.value.isCreateFatherAccount ? this.infoForm.value.fatherBirthday : null,
      fatherJob: this.infoForm.value.isCreateFatherAccount ? this.infoForm.value.fatherJob : '',

      //Mẹ đẻ
      isCreateMotherAccount: this.infoForm.value.isCreateMotherAccount ? 1 : 0,
      motherAvatar: this.infoForm.value.isCreateMotherAccount ? this.infoForm.value.motherAvatar : '',
      motherFullName: this.infoForm.value.isCreateMotherAccount ? this.infoForm.value.motherFullName : '',
      motherCode: this.infoForm.value.isCreateMotherAccount ? this.infoForm.value.motherCode : '',
      // mối quan hệ, giới tính ?????
      motherIsAccessApp: this.infoForm.value.motherIsAccessApp ? 1 : 0,
      motherIsActive: this.infoForm.value.motherIsActive ? 1 : 0,
      motherUserName: this.infoForm.value.isCreateMotherAccount ? this.infoForm.value.motherUserName : '',
      motherPassword: this.infoForm.value.isCreateMotherAccount ? this.infoForm.value.motherPassword : null,
      motherPhone: this.infoForm.value.isCreateMotherAccount ? this.infoForm.value.motherPhone : '',
      motherEmail: this.infoForm.value.isCreateMotherAccount ? this.infoForm.value.motherEmail : '',
      motherBirthday: this.infoForm.value.isCreateMotherAccount ? this.infoForm.value.motherBirthday : null,
      motherJob: this.infoForm.value.isCreateMotherAccount ? this.infoForm.value.motherJob : '',

      //người đỡ đầu
      isCreateTutorAccount: this.infoForm.value.isCreateTutorAccount ? 1 : 0,
      tutorAvatar: this.infoForm.value.isCreateTutorAccount ? this.infoForm.value.tutorAvatar : '',
      tutorFullName: this.infoForm.value.isCreateTutorAccount ? this.infoForm.value.tutorFullName : '',
      tutorCode: this.infoForm.value.isCreateTutorAccount ? this.infoForm.value.tutorCode : '',
      tutorIsAccessApp: this.infoForm.value.tutorIsAccessApp ? 1 : 0,
      tutorIsActive: this.infoForm.value.tutorIsActive ? 1 : 0,
      tutorGender: this.infoForm.value.tutorGender,
      tutorUserName: this.infoForm.value.isCreateTutorAccount ? this.infoForm.value.tutorUserName : '',
      tutorPassword: this.infoForm.value.isCreateTutorAccount ? this.infoForm.value.tutorPassword : null,
      tutorPhone: this.infoForm.value.isCreateTutorAccount ? this.infoForm.value.tutorPhone : '',
      tutorEmail: this.infoForm.value.isCreateTutorAccount ? this.infoForm.value.tutorEmail : '',
      tutorBirthday: this.infoForm.value.isCreateTutorAccount ? this.infoForm.value.tutorBirthday : null,
      tutorJob: this.infoForm.value.isCreateTutorAccount ? this.infoForm.value.tutorJob : '',

    }
    // console.log("isCreateFatherAccount", this.infoForm.value.isCreateFatherAccount);
    // console.log("validator required FullName  ", this.infoForm.get('fatherFullName')?.hasError('required'));
    // console.log("validator required code", this.infoForm.get('fatherCode')?.hasError('required'));
    // console.log("validator required UserName", this.infoForm.get('fatherUserName')?.hasError('required'));
    // console.log("validator required Password", this.infoForm.get('fatherPassword')?.hasError('required'));

    // console.log("isCreateFatherAccount2", this.infoForm.value.isCreateMotherAccount);
    // console.log("validator required FullName2  ", this.infoForm.get('motherFullName')?.hasError('required'));
    // console.log("validator required code2", this.infoForm.get('motherCode')?.hasError('required'));
    // console.log("validator required UserName2", this.infoForm.get('motherUserName')?.hasError('required'));

    // console.log("isCreateFatherAccount3", this.infoForm.value.isCreateTutorAccount);
    // console.log("validator required FullName3  ", this.infoForm.get('tutorFullName')?.hasError('required'));
    // console.log("validator required code3", this.infoForm.get('tutorCode')?.hasError('required'));
    // console.log("validator required UserName3", this.infoForm.get('tutorUserName')?.hasError('required'));

    // for (const key in this.infoForm.controls) {//log ra các feid đang bắt validator
    //   if (this.infoForm.get(key)?.hasError('required'))
    //     console.log("validator required", key);
    // }

    // console.log('ngày sinh', dataRequest.birthday);
    // console.log('ngày cấp idNumberIssueDate', dataRequest.idNumberIssueDate);
    // console.log('ngày sinh fatherBirthday', dataRequest.fatherBirthday);
    // console.log('ngày sinh motherBirthday', dataRequest.motherBirthday);
    // console.log('ngày sinh tutorBirthday', dataRequest.tutorBirthday);

    this.studentService.createStudent(dataRequest).subscribe((res: any) => {
      if (res.status == 0) {
        this.showMessageService.error(res.msg);
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
      }
    },
      (_err: any) => {
        this.isLoading = false;
      })
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
      getParentKey?.forEach((item) => {
        this.infoForm.get(item).clearValidators();
        this.infoForm.get(item).updateValueAndValidity();
      });
    }

    else {
      getParentKey?.forEach((item, index) => {
        this.infoForm.get(item).setValidators(this.validationType[index]);
        this.infoForm.get(item).updateValueAndValidity();
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
              this.infoForm.controls["avatar"].setValue(res.data);// học sinh
              break;
            case 2:
              this.infoForm.controls["fatherAvatar"].setValue(res.data);//bố
              break;
            case 3:
              this.infoForm.controls["motherAvatar"].setValue(res.data);//mẹ
              break;
            case 4:
              this.infoForm.controls["tutorAvatar"].setValue(res.data);//người đỡ đầu
              break;
          }
        })
      })
    }
  }

  onDeleteFileInputAvatar(inputFor): void {
    this.fileInputAvatar.nativeElement.value = '';
    //this.avatarUser = AVATAR_DEFAULT;
    switch (inputFor) {
      case 1:
        this.avatarUser = AVATAR_DEFAULT;
        this.infoForm.controls["avatar"].setValue(this.avatarUser);// học sinh
        break;
      case 2:
        this.fatherAvatarDefault = AVATAR_DEFAULT;
        this.infoForm.controls["fatherAvatar"].setValue(this.fatherAvatarDefault);//bố
        break;
      case 3:
        this.motherAvatarDefault = AVATAR_DEFAULT;
        this.infoForm.controls["motherAvatar"].setValue(this.motherAvatarDefault);//mẹ
        break;
      case 4:
        this.tutorAvatarDefault = AVATAR_DEFAULT;
        this.infoForm.controls["tutorAvatar"].setValue(this.tutorAvatarDefault);//người đỡ đầu
        break;
    }
  }

  dataTimeBirthday(event: any, sendFrom) {//lấy ngày sinh date picker
    switch (sendFrom) {
      case 1:// học sinh
        this.infoForm.get('birthday').setValue(Number(event));
        break;
      case 2://ngày cấp
        this.infoForm.get('idNumberIssueDate').setValue(Number(event));
        break;
      case 3://bố ruột
        this.infoForm.get('fatherBirthday').setValue(Number(event));
        break;
      case 4://mẹ đẻ
        this.infoForm.get('motherBirthday').setValue(Number(event));
        break;
      case 5://người đỡ đầu
        this.infoForm.get('tutorBirthday').setValue(Number(event));
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
      if (res.status === 1) {
        this.studentDataRelate = res.data;
        this.isLoading = false;
      }

      if (res.status === 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    });
  }

  onChangeSchool(event): void {
    event ? this.getDistrictList(event) : this.districtList = [];
    if (event) {
      let schoolSelected = this.studentDataRelate.schools.find(item => item.id == this.infoForm.value.schoolId);
      this.dataGrades = this.studentDataRelate.grades.filter(item => item.educationStages == schoolSelected?.educationStages);//get array Grade
    } else {
      this.dataGrades = [];
    }
    this.infoForm.get('gradeId').patchValue('');
  }

  onChangeGrade(event): void {
    if (event) {
      this.dataHomeroomClasses = this.studentDataRelate.homeroomClasses.filter(item => item.schoolId == this.infoForm.value.schoolId && item.gradeId == this.infoForm.value.gradeId)//get homeroomClasses
    } else {
      this.dataHomeroomClasses = [];
    }
    this.infoForm.get('homeroomClassId').patchValue('');
  }

  getCityList(): void {
    this.isLoading = true;
    this.locationService.getCityList().subscribe((res: any): void => {
      if (res.status != undefined && res.status == 1) {
        this.cityList = res.data;
        this.cityListHK = res.data;
      } else {
        this.showMessageService.error(res.msg);
      }
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
    }
    );
  }

  getDistrictList(cityCode: string, type?: number): void {
    this.isLoading = true;
    this.locationService.getDistrictList(cityCode).subscribe((res: any): void => {
      if (res.status != undefined && res.status == 1) {
        if (type == 1) {
          this.districtListHK = res.data;
        }
        else {
          this.districtList = res.data;
        }
      } else {
        this.showMessageService.error(res.msg);
      }
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
    }
    );
  }

  getWardList(districtCode: string): void {
    this.isLoading = true;
    this.locationService.getWardList(districtCode).subscribe((res: any): void => {
      if (res.status != undefined && res.status == 1) {
        this.wardList = res.data;
      } else {
        this.showMessageService.error(res.msg);
      }
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
    }
    );
  }

  onChangeCity(event, type?: number): void {
    if (type == 1) {
      event ? this.getDistrictList(event, 1) : this.districtListHK = [];
      this.infoForm.get('quanHuyenNoiSinh').patchValue('');
    }
    else {
      event ? this.getDistrictList(event) : this.districtList = [];
      this.infoForm.get('districtCode').patchValue('');
    }
  }


  onChangeDistrict(event): void {
    event ? this.getWardList(event) : this.wardList = [];
    this.infoForm.get('wardCode').patchValue('');
  }

  isTabPersonalOrParents() {
    this.tabPersonalOrParents = !this.tabPersonalOrParents;
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  onSubmit() {
    this.isLoading = true;
    this.listenFireBase('create', 'student');
    this.createStudent();
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

  validation_messages = {
    'fullName': [
      { type: 'required', message: 'requiredName' },
      { type: 'pattern', message: 'student.validators.fullName.pattern' },
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
    '0': [Validators.required],//FullName
    '1': [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(50)],//Code
    '2': [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)],//UserName
    '3': [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)],//Password
    '4': [Validators.pattern(REGEX_PHONE)],//Phone
    '5': [Validators.email],//Email

  }
}
