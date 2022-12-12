import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, Subscriber } from 'rxjs';
import { School } from 'src/app/_models/layout-tenant/school/school.model';
import { GeneralService } from 'src/app/_services/general.service';
import { SchoolService } from 'src/app/_services/layout-tenant/school/school.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ValidatorNotEmptyString, ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import {
  DATA_PERMISSION,
  INFO_ADVANCED_SCHOOL,
  REGEX_NUMBER_POSITIVE,
  REGEX_PHONE,
  TIME_OUT_LISTEN_FIREBASE,
  TRAINING_LEVEL
} from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-update-school-tenant',
  templateUrl: './update-school-tenant.component.html',
  styleUrls: ['./update-school-tenant.component.scss', '../../helper.scss'],
})
export class UpdateSchoolTenantComponent implements OnInit {
  arrInfoAdvanced = INFO_ADVANCED_SCHOOL;
  isLoading = false;
  permission = DATA_PERMISSION;
  infoBasicSchool: School;
  schoolId: string;
  formSchool: FormGroup;
  moetCategories: any;
  arrCampus = [];
  arrTrainingLevel = TRAINING_LEVEL;
  arrCity = [];
  arrDistrict = [];
  arrWard = [];
  cityCode: string;
  districtCode: string;
  logo: string = '';
  fileName: string = '';
  validationMessages = {
    name: [
      {type: "required", message: 'school.requiredName'},
      {type: "maxlength", message: 'school.validateMaxLengthName'},
      {type: "notEmpty", message: 'school.requiredName'},
    ],
    campus: [
      {type: "required", message: 'school.requiredCampus'}
    ],
    trainingLevel: [
      {type: "required", message: 'school.requiredCampus'}
    ],
    Email: [
      {type: "email", message: 'school.patternEmail'}
    ],
    sendFromEmail: [
      {type: "email", message: 'school.patternEmail'}
    ],
    phone: [
      {type: "pattern", message: 'school.patternPhone'}
    ],
    hotline: [
      {type: "pattern", message: 'school.patternHotline'}
    ],
    fax: [
      {type: "pattern", message: 'school.patternFax'}
    ],
    tenHieuTruong: [
      {type: "maxlength", message: 'school.validateMaxLengthName'}
    ],
    emailHieuTruong: [
      {type: "email", message: 'school.patternEmail'}
    ],
    dienThoaiHieuTruong: [
      {type: "pattern", message: 'school.patternPhone'}
    ],
    indexOrder: [
      {type: "pattern", message: 'patternNumberInteger'}
    ],
    namThanhLap: [
      {type: "maxlength", message: 'school.validateMaxLength'}
    ],
    dienTich: [
      {type: "pattern", message: 'school.validateDienTich'}
    ],
    address: [
      {type: "maxlength", message: 'school.validateMaxLength'}
    ],


  };
  validationMessagesServer = {
    name: {},
    campus: {},
    trainingLevel: {},
    Email: {},
    sendFromEmail: {},
    phone: {},
    hotline: {},
    fax: {},
    tenHieuTruong: {},
    emailHieuTruong: {},
    dienThoaiHieuTruong: {},
    indexOrder: {},
    namThanhLap: {},
    dienTich: {},
    address: {},
  }

  constructor(
    private schoolService: SchoolService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private listenFirebaseService: ListenFirebaseService,
    private location: Location,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.schoolId = res.id;
      this.callApiFirst();
    });
    this.initForm();
  }

  initForm() {
    this.formSchool = this.fb.group({
      // logo: '',
      name: ['', [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString]],
      campus: [null, [Validators.required, ValidatorNotNull]],
      trainingLevel: [this.infoBasicSchool?.EducationalStages
        ? this.infoBasicSchool?.EducationalStages
        : null, [Validators.required, ValidatorNotNull]],
      loaiHinhTruong: '',
      loaiTruong: '',
      chinhSachVung: '',
      cityCode: '',
      khuVuc: '',
      districtCode: '',
      wardCode: '',
      Email: ['', Validators.email],
      sendFromEmail: ['', Validators.email],
      phone: ['', Validators.pattern(REGEX_PHONE)],
      hotline: ['', Validators.pattern(REGEX_PHONE)],
      fax: ['', Validators.pattern(REGEX_PHONE)],
      tenHieuTruong: ['', [Validators.maxLength(255)]],
      emailHieuTruong: ['', Validators.email],
      dienThoaiHieuTruong: ['', Validators.pattern(REGEX_PHONE)],
      indexOrder: ['', Validators.pattern(REGEX_NUMBER_POSITIVE)],
      namThanhLap: ['', [Validators.maxLength(255)]],
      maDuAn: '',
      dienTich: ['', [Validators.maxLength(255)]],
      mucChuanQuocGia: '',
      maVungKhoKhan: '',
      address: ['', [Validators.maxLength(255)]],

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
        this.arrCity = results[1];
        this.infoBasicSchool = results[2].data;
        this.logo = this.infoBasicSchool?.Logo;
        this.fileName = this.infoBasicSchool?.Logo;
        this.cityCode = this.infoBasicSchool?.CityCode;
        this.districtCode = this.infoBasicSchool?.DistrictCode;
        if (this.cityCode) {
          this.getListDistrictFirst(this.cityCode);
        }
        this.patchValueFormGroup(this.infoBasicSchool);
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      }
    );
  }

  patchValueFormGroup(valueForm: any) {
    this.formSchool.setValue({
      name: valueForm?.Name,
      campus: valueForm?.CampusId ? valueForm?.CampusId : null,
      trainingLevel: valueForm?.EducationalStages
        ? valueForm?.EducationalStages
        : null,
      loaiHinhTruong: valueForm?.MaLoaiHinhTruong
        ? valueForm?.MaLoaiHinhTruong
        : '',
      loaiTruong: valueForm?.MaLoaiTruong ? valueForm?.MaLoaiTruong : '',
      chinhSachVung: valueForm?.ChinhSachVung ? valueForm?.ChinhSachVung : '',
      cityCode: valueForm?.CityCode ? valueForm?.CityCode : '',
      khuVuc: valueForm?.KhuVuc ? valueForm?.KhuVuc : '',
      districtCode: valueForm?.DistrictCode ? valueForm?.DistrictCode : '',
      wardCode: valueForm?.WardCode ? valueForm?.WardCode : '',
      Email: valueForm?.Email ? valueForm?.Email : '',
      sendFromEmail: valueForm?.SendFromEmail ? valueForm?.SendFromEmail : '',
      phone: valueForm?.Phone ? valueForm?.Phone : '',
      hotline: valueForm?.Hotline ? valueForm?.Hotline : '',
      fax: valueForm?.Fax ? valueForm?.Fax : '',
      tenHieuTruong: valueForm?.TenHieuTruong ? valueForm?.TenHieuTruong : '',
      emailHieuTruong: valueForm?.EmailHieuTruong
        ? valueForm?.EmailHieuTruong
        : '',
      dienThoaiHieuTruong: valueForm?.DienThoaiHieuTruong
        ? valueForm?.DienThoaiHieuTruong
        : '',
      indexOrder: valueForm?.IndexOrder ? valueForm?.IndexOrder : '',
      namThanhLap: valueForm?.NamThanhLap ? valueForm?.NamThanhLap : '',
      maDuAn: valueForm?.MaDuAn ? valueForm?.MaDuAn : '',
      dienTich: valueForm?.DienTich ? valueForm?.DienTich : '',
      mucChuanQuocGia: valueForm?.MucChuanQuocGia
        ? valueForm?.MucChuanQuocGia
        : '',
      maVungKhoKhan: valueForm?.MaVungKhoKhan ? valueForm?.MaVungKhoKhan : '',
      address: valueForm?.Address ? valueForm?.Address : '',

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
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getListCity() {
    this.isLoading = true;
    this.generalService.getListCity().subscribe(
      (res: any) => {
        this.arrCity = res.data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getListDistrictFirst(cityCode: string) {
    this.generalService.getListDistrict(cityCode).subscribe(
      (res: any) => {
        this.arrDistrict = res;
        if(this.districtCode)
        this.getListWardFirst(this.districtCode);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getListWardFirst(districtCode: string) {
    this.isLoading = true;
    this.generalService.getListWard(districtCode).subscribe(
      (res: any) => {
        this.arrWard = res;
        this.formSchool.patchValue({
          districtCode: this.infoBasicSchool?.DistrictCode
            ? this.infoBasicSchool?.DistrictCode
            : '',
          wardCode: this.infoBasicSchool?.WardCode
            ? this.infoBasicSchool?.WardCode
            : '',
        });
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getListDistrict(cityCode: string) {
    this.generalService.getListDistrict(cityCode).subscribe(
      (res: any) => {
        this.arrDistrict = res;
      },
      (err) => {
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getListWard(districtCode: string) {
    this.generalService.getListWard(districtCode).subscribe(
      (res: any) => {
        this.arrWard = res;
      },
      (err) => {
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  cancel() {
    this.location.back();
  }

  submit(valueForm: any) {
    this.isLoading = true;
    if (this.formSchool.valid) {
      let dataInput: School = {
        CampusId: valueForm.campus,
        MoetUnitCode: this.infoBasicSchool.MoetUnitCode,
        Name: valueForm.name.trim(),
        EducationalStages: valueForm.trainingLevel,
        IndexOrder: valueForm.indexOrder,
        Email: valueForm.Email,
        Hotline: valueForm.hotline,
        Logo: this.logo.trim(),
        Phone: valueForm.phone,
        SendFromEmail: valueForm.sendFromEmail,
        WardCode: valueForm.wardCode,
        DistrictCode: valueForm.districtCode,
        CityCode: valueForm.cityCode,
        Address: valueForm.address.trim(),
        ChinhSachVung: valueForm.chinhSachVung,
        MaLoaiHinhTruong: valueForm.loaiHinhTruong,
        KhuVuc: valueForm.khuVuc,
        MucChuanQuocGia: valueForm.mucChuanQuocGia,
        MaLoaiTruong: valueForm.loaiTruong,
        MaVungKhoKhan: valueForm.maVungKhoKhan,
        MaDuAn: valueForm.maDuAn,
        Fax: valueForm.fax,
        TenHieuTruong: valueForm.tenHieuTruong.trim(),
        EmailHieuTruong: valueForm.emailHieuTruong,
        DienThoaiHieuTruong: valueForm.dienThoaiHieuTruong,
        IsCoChiBoDang: Number(valueForm.IsCoChiBoDang).toString(),
        IsTruongQuocTe: Number(valueForm.IsTruongQuocTe).toString(),
        IsHocSinhKhuyetTat: Number(valueForm.IsHocSinhKhuyetTat).toString(),
        IsHocSinhBanTru: Number(valueForm.IsHocSinhKhuyetTat).toString(),
        IsKhiHauThienTai: Number(valueForm.IsKhiHauThienTai).toString(),
        IsKyNangSongGDXG: Number(valueForm.IsKyNangSongGDXG).toString(),
        IsHocSinhNoiTru: Number(valueForm.IsHocSinhNoiTru).toString(),
        IsVungDacBietKhoKhan: Number(valueForm.IsVungDacBietKhoKhan).toString(),
        IsDatChatLuongToiThieu: Number(valueForm.IsDatChatLuongToiThieu).toString(),
        DienTich: valueForm.dienTich.trim(),
        NamThanhLap: valueForm.namThanhLap.trim(),
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
      this.listenFireBase('update', 'school');
      this.schoolService.update(this.schoolId, dataInput).subscribe(
        (res: any) => {
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          this.validateAllFormFieldsErrorServer(err.errors);
        }
      )
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

  changeVerticalUnit(unitName: string) {
    let code = '';
    switch (unitName) {
      case 'city':
        this.arrDistrict = [];
        this.arrWard = [];
        this.formSchool.controls['districtCode'].setValue('');
        this.formSchool.controls['wardCode'].setValue('');
        code = this.formSchool.controls['cityCode'].value;
        if (code != '') {
          this.getListDistrict(code);
        }
        break;
      case 'district':
        this.arrWard = [];
        this.formSchool.controls['wardCode'].setValue('');
        code = this.formSchool.controls['districtCode'].value;
        if (code != '') {
          this.getListWard(code);
        }
        break;
      case 'ward':
        break;
    }
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
        this.router.navigate(['/tenant/school/detail/' + this.schoolId])
      } else {
        this.isLoading = false;
      }
    });
  }
}
