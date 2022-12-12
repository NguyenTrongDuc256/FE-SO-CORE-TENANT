import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscriber } from 'rxjs';
import { CreateStudentModel } from 'src/app/_models/layout-staff/student/create-student.model';
import { GeneralService } from 'src/app/_services/general.service';
import { StudentStaffService } from 'src/app/_services/layout-staff/student/student-staff.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { LocationService } from 'src/app/_services/location.service';
import { ResizeImageService } from 'src/app/_services/resize-image.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { AVATAR_DEFAULT, GENDER, MESSAGE_ERROR_CALL_API, REGEX_CODE, REGEX_PASSWORD, REGEX_PHONE, REGEX_USER_NAME, STUDENT_STATUS_SELECT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-create-student-staff',
  templateUrl: './create-student-staff.component.html',
  styleUrls: ['./create-student-staff.component.scss']
})
export class CreateStudentStaffComponent implements OnInit {
  isLoading: boolean = false;
  formGroup!: FormGroup;
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
  currentSchoolId: string;
  cityList: any[] = [];
  districtList: any[] = [];
  wardList: any[] = [];
  cityListHK: any[] = [];
  districtListHK: any[] = [];
  txtSelect: string = 'student.select';
  nzNotFoundContent: string = 'student.notFoundContent';
  isShowPassword = false;
  dateNow = moment().format('X');

  constructor(
    private resizeImageService: ResizeImageService,
    private generalService: GeneralService,
    private studentStaffService: StudentStaffService,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private locationService: LocationService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getCityList();
    this.getStudentDataRelate();
    // this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      avatar: [],
      fullName: ['', [Validators.required, Validators.maxLength(255)]],
      moetCode: ['', [Validators.pattern(REGEX_CODE), Validators.maxLength(50)]],
      gender: 1,
      code: ['', [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(50)]],
      birthday: [''],//không có formcontrollname bên html, lấy từ hàm datepicker
      isHocSongNgu: false,
      isAccessApp: false,
      isActive: true,
      //thong tin chung
      // schoolId: ['', [Validators.required]],
      gradeId: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)]],
      status: ['', [Validators.required]],
      homeroomClassId: ['', [Validators.required]],
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
      // isCreateFatherAccount: false,
      // fatherAvatar: [],
      // fatherFullName: ['', [Validators.required]],
      // fatherCode: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_CODE)]],
      // fatherIsAccessApp: false,
      // fatherIsActive: false,
      // fatherUserName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      // fatherPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)]],
      // fatherPhone: ['', [Validators.pattern(REGEX_PHONE)]],
      // fatherEmail: ['', [Validators.email]],
      // fatherBirthday: [''],
      // fatherJob: [''],
      isCreateFatherAccount: false,
      fatherAvatar: [],
      fatherFullName: [''],
      fatherCode: [''],
      fatherIsAccessApp: false,
      fatherIsActive: false,
      fatherUserName: [''],
      fatherPassword: [''],
      fatherPhone: [''],
      fatherEmail: [''],
      fatherBirthday: [''],
      fatherJob: [''],

      //Mẹ đẻ
      // isCreateMotherAccount: true,
      // motherAvatar: [],
      // motherFullName: ['', [Validators.required]],
      // motherCode: ['', [Validators.required,Validators.maxLength(50), Validators.pattern(REGEX_CODE)]],
      // motherIsAccessApp: false,
      // motherIsActive: false,
      // motherUserName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
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
      // tutorUserName: ['', [Validators.required,Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
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
      avatar: this.formGroup.value.avatar,
      fullName: this.formGroup.value.fullName,
      moetCode: this.formGroup.value.moetCode,
      gender: this.formGroup.value.gender,
      code: this.formGroup.value.code,
      birthday: this.formGroup.value.birthday ? this.formGroup.value.birthday : null,
      isHocSongNgu: this.formGroup.value.isHocSongNgu ? 1 : 0,
      isAccessApp: this.formGroup.value.isAccessApp ? 1 : 0,
      isActive: this.formGroup.value.isActive ? 1 : 0,

      //thong tin chung
      // schoolId: this.formGroup.value.schoolId,
      gradeId: this.formGroup.value.gradeId,
      username: this.formGroup.value.username,
      password: this.formGroup.value.password,
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
      idNumberIssueDate: this.formGroup.value.idNumberIssueDate ? this.formGroup.value.idNumberIssueDate : null,
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
    this.listenFireBase('create', 'student');
    this.studentStaffService.createStudent(dataRequest).subscribe((res: any) => {
      this.showMessageService.error(res.msg);
      this.isLoading = false;
    },
      (_err: any) => {
        this.isLoading = false;
        this.validateAllFormFieldsErrorServer(_err.errors);

      })
  }

  onSubmit() {
    // this.createStudent();
    if (this.formGroup.valid) {
      this.createStudent();
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
        this.formGroup.get(item).clearValidators();
        this.formGroup.get(item).updateValueAndValidity();
      });
    }

    else {
      getParentKey?.forEach((item, index) => {
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

  onDeleteFileInputAvatar(inputFor): void {
    this.fileInputAvatar.nativeElement.value = '';
    //this.avatarUser = AVATAR_DEFAULT;
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
      case 3://bố ruột
        this.formGroup.get('fatherBirthday').setValue(Number(event));
        break;
      case 4://mẹ đẻ
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
    this.studentStaffService.getStudentDataRelate().subscribe((res: any) => {
      this.studentDataRelate = res.data;
      this.getDataGrade();
      this.isLoading = false;

    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
    });
  }

  getDataGrade() {
    this.currentSchoolId = JSON.parse(localStorage.getItem('currentUnit')).id
    let schoolSelected = this.studentDataRelate.schools.find(item => item.id == this.currentSchoolId);
    this.dataGrades = this.studentDataRelate.grades.filter(item => item.educationStages == schoolSelected?.educationStages);//get array Grade
    this.initForm();
  }

  onChangeGrade(event): void {
    if (event) {
      // this.dataHomeroomClasses = this.studentDataRelate.homeroomClasses.filter(item => item.schoolId == this.formGroup.value.schoolId && item.gradeId == this.formGroup.value.gradeId)//get homeroomClasses
      this.dataHomeroomClasses = this.studentDataRelate.homeroomClasses.filter(item => item.schoolId == this.currentSchoolId && item.gradeId == this.formGroup.value.gradeId)//get homeroomClasses
    } else {
      this.dataHomeroomClasses = [];
    }
    this.formGroup.get('homeroomClassId').patchValue('');
  }

  getCityList(): void {
    this.isLoading = true;
    this.locationService.getCityList().subscribe((res: any): void => {
      this.cityList = res.data;
      this.cityListHK = res.data;
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

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
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
        this.router.navigate(['/staff/student']);
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
      { type: 'minlength', message: 'student.validators.fatherUserName.minlength' },
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
    '1': [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(50)],//Code
    '2': [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)],//UserName
    '3': [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)],//Password
    '4': [Validators.pattern(REGEX_PHONE)],//Phone
    '5': [Validators.email],//Email

  }
}
