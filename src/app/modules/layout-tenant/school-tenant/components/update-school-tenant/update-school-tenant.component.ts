import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from 'src/app/_services/layout-tenant/school/school.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotEmptyString, ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import {
  DATA_PERMISSION,
  REGEX_PHONE,
  TIME_OUT_LISTEN_FIREBASE,
  TRAINING_LEVEL,
} from 'src/app/_shared/utils/constant';
import { ADVANCED } from '../../constant';
import { forkJoin, Observable, Subscriber } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { ResizeImageService } from 'src/app/_services/resize-image.service';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { School } from 'src/app/_models/layout-tenant/school/school.model';
@Component({
  selector: 'app-update-school-tenant',
  templateUrl: './update-school-tenant.component.html',
  styleUrls: ['./update-school-tenant.component.scss', '../../helper.scss'],
})
export class UpdateSchoolTenantComponent implements OnInit {
  arrInfoAdvanced = ADVANCED;
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

  constructor(
    private schoolService: SchoolService,
    private showMessage: ShowMessageService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private resizeImageService: ResizeImageService,
    private listenFirebaseService: ListenFirebaseService,
    private location: Location
  ) {}

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
      trainingLevel: this.infoBasicSchool?.EducationalStages
        ? this.infoBasicSchool?.EducationalStages
        : null,
      loaiHinhTruong: '',
      loaiTruong: '',
      chinhSachVung: '',
      cityCode: '',
      khuVuc: '',
      districtCode: '',
      wardCode: '',
      email: ['', Validators.email],
      sendFromEmail: ['', Validators.email],
      phone: ['', Validators.pattern(REGEX_PHONE)],
      hotline: ['', Validators.pattern(REGEX_PHONE)],
      fax: ['', Validators.pattern(REGEX_PHONE)],
      tenHieuTruong: ['', [Validators.maxLength(255)]],
      emailHieuTruong: ['', Validators.email],
      dienThoaiHieuTruong: ['', Validators.pattern(REGEX_PHONE)],
      indexOrder: '',
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
        this.getListDistrictFirst(this.cityCode);
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
      email: valueForm?.Email ? valueForm?.Email : '',
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
        if (res.status == 1) {
          this.moetCategories = res.data.MoetCategories;
          this.arrCampus = res.data.Campuses;
        }
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  getListCity() {
    this.isLoading = true;
    this.generalService.getListCity().subscribe(
      (res: any) => {
        if (res.status == 1) {
          this.arrCity = res.data;
        }
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  getListDistrictFirst(cityCode: string) {
    this.generalService.getListDistrict(cityCode).subscribe(
      (res: any) => {
        this.arrDistrict = res;
        this.getListWardFirst(this.districtCode);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
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
      }
    );
  }

  getListDistrict(cityCode: string) {
    this.generalService.getListDistrict(cityCode).subscribe(
      (res: any) => {
        this.arrDistrict = res;
      },
      (err) => {
      }
    );
  }

  getListWard(districtCode: string) {
    this.generalService.getListWard(districtCode).subscribe(
      (res: any) => {
        this.arrWard = res;
      },
      (err) => {
      }
    );
  }

  cancel() {
    this.location.back();
  }

  submit(valueForm: any) {
    let dataInput:School = {
      CampusId: valueForm.campus,
      MoetUnitCode: this.infoBasicSchool.MoetUnitCode,
      Name: valueForm.name.trim(),
      EducationalStages: valueForm.trainingLevel,
      IndexOrder: valueForm.indexOrder,
      Email: valueForm.email,
      Hotline: valueForm.hotline,
      // Website: 'hongdang@edu.com.vn',
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
      // Is2BuoiNgay: Number(valueForm.Is2BuoiNgay).toString(),
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

    this.isLoading = true;
    this.listenFireBase('update', 'school');
    this.schoolService.update(this.schoolId, dataInput).subscribe(
      (res: any) => {
        if (res.status == 0) {
          this.showMessage.error(res.msg);
        }

        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  changeVerticalUnit(unitName: string) {
    let code = '';
    switch(unitName) {
      case 'city':
        this.arrDistrict = [];
        this.arrWard = [];
        this.formSchool.controls['districtCode'].setValue('');
        this.formSchool.controls['wardCode'].setValue('');
        code = this.formSchool.controls['cityCode'].value;
        if(code != '') {
          this.getListDistrict(code);
        }
        break;
      case 'district':
        this.arrWard = [];
        this.formSchool.controls['wardCode'].setValue('');
        code = this.formSchool.controls['districtCode'].value;
        if(code != '') {
          this.getListWard(code);
        }
      break;
      case 'ward':
      break;
    }
  }

  onChangeFileInputLogo(event): void {
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.resizeImageService.readFile(file, subscriber);
      });
      dataReadFile.subscribe((data) => {
        let dataInput = {
          base64Input: data,
          fileName: `${moment().format('x')}-${file.name}`,
        };
        this.fileName = `${moment().format('x')}-${file.name}`;
        this.generalService
          .uploadFileBase64(dataInput)
          .subscribe((res: any) => {
            this.logo = res.data;
          });
      });
    }
  }

  removeLogo() {
    this.fileName = '';
    this.logo = '';
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
