import { REGEX_EMAIL } from './../../../../_shared/utils/constant';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { forkJoin, Observable, Subscriber } from "rxjs";
import { ValidatorNotEmptyString, ValidatorNotNull } from "src/app/_services/validator-custom.service";
import {
  DATA_PERMISSION, INFO_ADVANCED_SCHOOL,
  REGEX_NUMBER_POSITIVE, REGEX_PHONE,
  TIME_OUT_LISTEN_FIREBASE,
  TRAINING_LEVEL
} from 'src/app/_shared/utils/constant';
import { School } from "../../../../_models/layout-staff/school/school.model";
import { GeneralService } from "../../../../_services/general.service";
import { SchoolService } from "../../../../_services/layout-staff/school/school.service";
import { ListenFirebaseService } from "../../../../_services/listen-firebase.service";

@Component({
  selector: 'app-info-setting-school-staff',
  templateUrl: './info-setting-school-staff.component.html',
  styleUrls: ['./info-setting-school-staff.component.scss']
})
export class InfoSettingSchoolStaffComponent implements OnInit {
  arrInfoAdvanced = INFO_ADVANCED_SCHOOL;
  isLoading = false;
  permission = DATA_PERMISSION;
  infoBasicSchool: School;
  schoolId: string;
  formSchool: FormGroup;
  moetCategories: any;
  arrCampus = [];
  arrTrainingLevel = TRAINING_LEVEL;
  cityCode: string;
  districtCode: string;
  logo: string = '';
  fileName: string = '';
  validationMessages = {
    Name: [
      {type: "required", message: 'school.requiredName'},
      {type: "maxlength", message: 'school.validateMaxLengthName'},
      {type: "notEmpty", message: 'school.requiredName'},
    ],
    Campus: [
      {type: "required", message: 'school.requiredCampus'}
    ],
    TrainingLevel: [
      {type: "required", message: 'school.requiredCampus'}
    ],
    Email: [
      {type: "pattern", message: 'school.patternEmail'}
    ],
    SendFromEmail: [
      {type: "pattern", message: 'school.patternEmail'}
    ],
    Phone: [
      {type: "pattern", message: 'school.patternPhone'}
    ],
    Hotline: [
      {type: "pattern", message: 'school.patternHotline'}
    ],
    Fax: [
      {type: "pattern", message: 'school.patternFax'}
    ],
    TenHieuTruong: [
      {type: "maxlength", message: 'school.validateMaxLengthName'}
    ],
    EmailHieuTruong: [
      {type: "pattern", message: 'school.patternEmail'}
    ],
    DienThoaiHieuTruong: [
      {type: "pattern", message: 'school.patternPhone'}
    ],
    IndexOrder: [
      {type: "pattern", message: 'patternNumberInteger'}
    ],
    NamThanhLap: [
      {type: "maxlength", message: 'school.validateMaxLength'}
    ],
    DienTich: [
      {type: "maxlength", message: 'school.validateMaxLength'}
    ],



  };
  validationMessagesServer = {
    Name: {},
    Campus: {},
    TrainingLevel: {},
    Email: {},
    SendFromEmail: {},
    Phone: {},
    Hotline: {},
    Fax: {},
    TenHieuTruong: {},
    EmailHieuTruong: {},
    DienThoaiHieuTruong: {},
    IndexOrder: {},
    NamThanhLap: {},
    DienTich: {},

  }
  constructor(
    private schoolService: SchoolService,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private listenFirebaseService: ListenFirebaseService,
  ) {}

  ngOnInit(): void {
    this.schoolId = JSON.parse(localStorage.getItem('currentUnit')).id;
    this.callApiFirst();
    this.initForm();
  }

  initForm() {
    this.formSchool = this.fb.group({
      Name: ['', [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString]],
      Campus: [null, [Validators.required, ValidatorNotNull]],
      TrainingLevel: [null,[Validators.required, ValidatorNotNull]],
      LoaiHinhTruong: '',
      LoaiTruong: '',
      ChinhSachVung: '',
      KhuVuc: '',
      Email: ['', Validators.pattern(REGEX_EMAIL)],
      SendFromEmail: ['', Validators.pattern(REGEX_EMAIL)],
      Phone: ['', Validators.pattern(REGEX_PHONE)],
      Hotline: ['', Validators.pattern(REGEX_PHONE)],
      Fax: ['', Validators.pattern(REGEX_PHONE)],
      TenHieuTruong: ['', [Validators.maxLength(255)]],
      EmailHieuTruong: ['', Validators.pattern(REGEX_EMAIL)],
      DienThoaiHieuTruong: ['', Validators.pattern(REGEX_PHONE)],
      IndexOrder: ['', Validators.pattern(REGEX_NUMBER_POSITIVE)],
      NamThanhLap: ['', [Validators.maxLength(255)]],
      MaDuAn: '',
      DienTich: ['', [Validators.maxLength(255)]],
      MucChuanQuocGia: '',
      MaVungKhoKhan: '',

      IsCoChiBoDang: false,
      IsTruongQuocTe: false,
      IsHocSinhKhuyetTat: false,
      IsHocSinhBanTru: false,
      IsKhiHauThienTai: false,
      IsKyNangSongGDXG: false,
      IsHocSinhNoiTru: false,
      IsVungDacBietKhoKhan: false,
      IsDatChatLuongToiThieu: false,
      // Is2BuoiNgay: false,
      IsSuDungMayTinhDayHoc: false,
      IsKhaiThacInternetDayHoc: false,
      IsDienLuoi: false,
      IsNguonNuocSach: false,
      IsCongTrinhVeSinh: false,
      IsCtGdvsDoiTay: false,
      IsChuongTrinhGiaoDucCoBan: false,
      IsCoHaTangTlhtPhuHopHskt: false,
      IsCongTacTuVanHocDuong: false,
      IsTruongPtDtBanTru: false,
      IsChuyenBietKhuyetTat: false,
      IsCoNuocUong: false,
      IsHocChuongTrinhSongNgu: false,
      IsActive: false
    });
  }

  callApiFirst() {
    this.isLoading = true;
    const APIGetDataToMap = this.schoolService.getAnotherInfoToMapSchool();
    const APIGetListCity = this.generalService.getListCity();
    const APIDetailSchool = this.schoolService.getDetail(this.schoolId);
    forkJoin([APIGetDataToMap, APIGetListCity, APIDetailSchool]).subscribe(
      (results: any) => {
        this.moetCategories = results[0].data.MoetCategories;
        this.arrCampus = results[0].data.Campuses;
        this.infoBasicSchool = results[2].data;
        this.patchValueFormGroup(this.infoBasicSchool);
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      }
    );
  }

  patchValueFormGroup(valueForm: any) {
    this.formSchool.setValue({
      Name: valueForm?.Name,
      Campus: valueForm?.CampusId ? valueForm?.CampusId : null,
      TrainingLevel: valueForm?.EducationalStages ? valueForm?.EducationalStages : null,
      LoaiHinhTruong: valueForm?.MaLoaiHinhTruong ? valueForm?.MaLoaiHinhTruong : '',
      LoaiTruong: valueForm?.MaLoaiTruong ? valueForm?.MaLoaiTruong : '',
      ChinhSachVung: valueForm?.ChinhSachVung ? valueForm?.ChinhSachVung : '',
      KhuVuc: valueForm?.KhuVuc ? valueForm?.KhuVuc : '',
      Email: valueForm?.Email ? valueForm?.Email : '',
      SendFromEmail: valueForm?.SendFromEmail ? valueForm?.SendFromEmail : '',
      Phone: valueForm?.Phone ? valueForm?.Phone : '',
      Hotline: valueForm?.Hotline ? valueForm?.Hotline : '',
      Fax: valueForm?.Fax ? valueForm?.Fax : '',
      TenHieuTruong: valueForm?.TenHieuTruong ? valueForm?.TenHieuTruong : '',
      EmailHieuTruong: valueForm?.EmailHieuTruong ? valueForm?.EmailHieuTruong : '',
      DienThoaiHieuTruong: valueForm?.DienThoaiHieuTruong ? valueForm?.DienThoaiHieuTruong : '',
      IndexOrder: valueForm?.IndexOrder ? valueForm?.IndexOrder : '',
      NamThanhLap: valueForm?.NamThanhLap ? valueForm?.NamThanhLap : '',
      MaDuAn: valueForm?.MaDuAn ? valueForm?.MaDuAn : '',
      DienTich: valueForm?.DienTich ? valueForm?.DienTich : '',
      MucChuanQuocGia: valueForm?.MucChuanQuocGia ? valueForm?.MucChuanQuocGia : '',
      MaVungKhoKhan: valueForm?.MaVungKhoKhan ? valueForm?.MaVungKhoKhan : '',
      IsCoChiBoDang: Boolean(Number(valueForm.IsCoChiBoDang)),
      IsTruongQuocTe: Boolean(Number(valueForm.IsTruongQuocTe)),
      IsHocSinhKhuyetTat: Boolean(Number(valueForm.IsHocSinhKhuyetTat)),
      IsHocSinhBanTru: Boolean(Number(valueForm.IsHocSinhBanTru)),
      IsKhiHauThienTai: Boolean(Number(valueForm.IsKhiHauThienTai)),
      IsKyNangSongGDXG: Boolean(Number(valueForm.IsKyNangSongGDXG)),
      IsHocSinhNoiTru: Boolean(Number(valueForm.IsHocSinhNoiTru)),
      IsVungDacBietKhoKhan: Boolean(Number(valueForm.IsVungDacBietKhoKhan)),
      IsDatChatLuongToiThieu: Boolean(Number(valueForm.IsDatChatLuongToiThieu)),
      // Is2BuoiNgay: Boolean(Number(valueForm.IsCoChiBoDang)),
      IsSuDungMayTinhDayHoc: Boolean(Number(valueForm.IsSuDungMayTinhDayHoc)),
      IsKhaiThacInternetDayHoc: Boolean(Number(valueForm.IsKhaiThacInternetDayHoc)),
      IsDienLuoi: Boolean(Number(valueForm.IsDienLuoi)),
      IsNguonNuocSach: Boolean(Number(valueForm.IsNguonNuocSach)),
      IsCongTrinhVeSinh: Boolean(Number(valueForm.IsCongTrinhVeSinh)),
      IsCtGdvsDoiTay: Boolean(Number(valueForm.IsCtGdvsDoiTay)),
      IsChuongTrinhGiaoDucCoBan: Boolean(Number(valueForm.IsChuongTrinhGiaoDucCoBan)),
      IsCoHaTangTlhtPhuHopHskt: Boolean(Number(valueForm.IsCoHaTangTlhtPhuHopHskt)),
      IsCongTacTuVanHocDuong: Boolean(Number(valueForm.IsCongTacTuVanHocDuong)),
      IsTruongPtDtBanTru: Boolean(Number(valueForm.IsTruongPtDtBanTru)),
      IsChuyenBietKhuyetTat: Boolean(Number(valueForm.IsChuyenBietKhuyetTat)),
      IsCoNuocUong: Boolean(Number(valueForm.IsCoNuocUong)),
      IsHocChuongTrinhSongNgu: Boolean(Number(valueForm.IsHocChuongTrinhSongNgu)),
      IsActive: Boolean(Number(valueForm.IsActive))

    });
    this.isLoading = false;
  }

  getAnotherInfoToMapSchool() {
    this.isLoading = true;
    this.schoolService.getAnotherInfoToMapSchool().subscribe(
      (res: any) => {
          this.moetCategories = res.data.MoetCategories;
          this.arrCampus = res.data.Campuses;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }


  cancel() {
    this.patchValueFormGroup(this.infoBasicSchool)
  }

  submit(valueForm: any) {
    if (this.formSchool.valid) {
    let dataInput:School = {
      CampusId: valueForm.Campus,
      MoetUnitCode: this.infoBasicSchool.MoetUnitCode,
      Name: valueForm.Name.trim(),
      EducationalStages: valueForm.TrainingLevel,
      IndexOrder: valueForm.IndexOrder,
      Email: valueForm.Email,
      Hotline: valueForm.Hotline,
      Fax: valueForm.Fax.trim(),
      Logo: this.logo.trim(),
      Phone: valueForm.Phone,
      SendFromEmail: valueForm.SendFromEmail,
      ChinhSachVung: valueForm.ChinhSachVung,
      MaLoaiHinhTruong: valueForm.LoaiHinhTruong,
      KhuVuc: valueForm.KhuVuc,
      MucChuanQuocGia: valueForm.MucChuanQuocGia,
      MaLoaiTruong: valueForm.LoaiTruong,
      MaVungKhoKhan: valueForm.MaVungKhoKhan,
      MaDuAn: valueForm.MaDuAn,
      TenHieuTruong: valueForm.TenHieuTruong.trim(),
      EmailHieuTruong: valueForm.EmailHieuTruong,
      DienThoaiHieuTruong: valueForm.DienThoaiHieuTruong,
      IsCoChiBoDang: Number(valueForm.IsCoChiBoDang).toString(),
      IsTruongQuocTe: Number(valueForm.IsTruongQuocTe).toString(),
      IsHocSinhKhuyetTat: Number(valueForm.IsHocSinhKhuyetTat).toString(),
      IsHocSinhBanTru: Number(valueForm.IsHocSinhKhuyetTat).toString(),
      IsKhiHauThienTai: Number(valueForm.IsKhiHauThienTai).toString(),
      IsKyNangSongGDXG: Number(valueForm.IsKyNangSongGDXG).toString(),
      IsHocSinhNoiTru: Number(valueForm.IsHocSinhNoiTru).toString(),
      IsVungDacBietKhoKhan: Number(valueForm.IsVungDacBietKhoKhan).toString(),
      IsDatChatLuongToiThieu: Number(valueForm.IsDatChatLuongToiThieu).toString(),
      // Is2BuoiNgay: Number(valueForm.Is2BuoiNgay).toString(),
      DienTich: valueForm.DienTich.trim(),
      NamThanhLap: String(valueForm.NamThanhLap).trim(),
      IsSuDungMayTinhDayHoc: Number(valueForm.IsSuDungMayTinhDayHoc).toString(),
      IsKhaiThacInternetDayHoc: Number(valueForm.IsKhaiThacInternetDayHoc).toString(),
      IsDienLuoi: Number(valueForm.IsDienLuoi).toString(),
      IsNguonNuocSach: Number(valueForm.IsNguonNuocSach).toString(),
      IsCongTrinhVeSinh: Number(valueForm.IsCongTrinhVeSinh).toString(),
      IsCtGdvsDoiTay: Number(valueForm.IsCtGdvsDoiTay).toString(),
      IsChuongTrinhGiaoDucCoBan: Number(valueForm.IsChuongTrinhGiaoDucCoBan).toString(),
      IsCoHaTangTlhtPhuHopHskt: Number(valueForm.IsCoHaTangTlhtPhuHopHskt).toString(),
      IsCongTacTuVanHocDuong: Number(valueForm.IsCongTacTuVanHocDuong).toString(),
      IsTruongPtDtBanTru: Number(valueForm.IsTruongPtDtBanTru).toString(),
      IsChuyenBietKhuyetTat: Number(valueForm.IsChuyenBietKhuyetTat).toString(),
      IsCoNuocUong: Number(valueForm.IsCoNuocUong).toString(),
      IsHocChuongTrinhSongNgu: Number(valueForm.IsHocChuongTrinhSongNgu).toString(),
      IsActive: Number(valueForm.IsActive).toString()
    };
    this.isLoading = true;
    this.listenFireBase('update', 'school');
    this.schoolService.update(this.schoolId, dataInput).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.validateAllFormFieldsErrorServer(err.errors);
      }
    );
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formSchool);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
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
      } else {
        this.isLoading = false;
      }
    });
  }

}
