import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { HomeroomClass } from 'src/app/_models/layout-staff/training/homeroom-class.model';
import { GeneralService } from 'src/app/_services/general.service';
import { SchoolService } from 'src/app/_services/layout-staff/school/school.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ResizeImageService } from 'src/app/_services/resize-image.service';
import {
  ValidatorNotEmptyString,
  ValidatorNotNull,
} from 'src/app/_services/validator-custom.service';
import {
  INFO_OTHER_HOMEROOM_CLASS,
  PAGE_INDEX_DEFAULT,
  REGEX_CODE,
  REGEX_NUMBER,
  REGEX_NUMBER_POSITIVE,
  TIME_OUT_LISTEN_FIREBASE,
  TYPE_HOMEROOM_CLASS,
} from 'src/app/_shared/utils/constant';
import { ShowMessageService } from './../../../../../_services/show-message.service';

@Component({
  selector: 'app-form-homeroom-class-layout-staff',
  templateUrl: './form-homeroom-class.component.html',
  styleUrls: ['./form-homeroom-class.component.scss', '../../helper.scss'],
})
export class FormHomeroomClassComponent implements OnInit {
  formSubmit: FormGroup;
  isLoading = false;
  logo: string = '';
  fileName: string = '';
  arrGrades = localStorage.getItem('dataConfigSystem')
    ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades
    : [];
  arrDiemTruong = [];
  arrTeachers = [];
  arrLopGhep = [];
  arrStudents = [];
  arrParents = [];
  arrInfoAdvanced = INFO_OTHER_HOMEROOM_CLASS;
  homeroomClassId = '';
  nameForm: string;
  dataDetail: HomeroomClass;
  dataMoet;
  arrTypeHomeroomClass = TYPE_HOMEROOM_CLASS;
  currentUnit = localStorage.getItem('currentUnit')
    ? JSON.parse(localStorage.getItem('currentUnit'))
    : {};
  isLoadingUpImg = false;
  isEnableClassAvatar: number;
  educationalStage = localStorage.getItem('currentUnit')
    ? JSON.parse(localStorage.getItem('currentUnit')).educationalStages
    : null;
  validationMessagesServer = {
    Name: {},
    Code: {},
    GradeId: {},
    SoBuoiHocTrenTuan: {},
    IndexOrder: {},
    GhepVaoLop: {}
  };

  constructor(
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService,
    private resizeImageService: ResizeImageService,
    private activatedRouter: ActivatedRoute,
    private trainingService: TrainingService,
    private showMessageService: ShowMessageService,
    private router: Router,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('tenantProfile')) {
      this.isEnableClassAvatar = JSON.parse(
        localStorage.getItem('tenantProfile')
      )['isEnableClassAvatar'];
    }
    this.arrGrades = this.arrGrades.filter(
      (item) =>
        item.isActive == 1 && item.educationalStages == this.educationalStage
    );
    this.getListTeachers();
    this.getAnotherInfoToMapSchool();
    this.getDanhSachDiemTruong();
    this.activatedRouter.params.subscribe((par) => {
      this.homeroomClassId = par.id;
      this.homeroomClassId
        ? (this.nameForm = 'update')
        : (this.nameForm = 'create');
      this.initForm();
      this.getListCompoundClass(this.nameForm);
      if (this.nameForm == 'update') {
        this.getDetailHomeroomClass();
      }
    });
  }

  initForm() {
    this.formSubmit = this.fb.group({
      Name: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          ValidatorNotEmptyString,
        ],
      ],
      Code: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(REGEX_CODE),
        ],
      ],
      GradeId: ['', [Validators.required, ValidatorNotNull]],
      SoBuoiHocTrenTuan: ['', [Validators.required, ValidatorNotNull]],
      DiemTruong: '',
      HomeroomTeacherId: '',
      IndexOrder: [
        null,
        [Validators.required, Validators.pattern(REGEX_NUMBER_POSITIVE)],
      ],
      GhepVaoLop: '',
      SachGiaoKhoa: '',
      SoTietHocTrenTuan: '',
      SoTietNN1: '',
      SoTietNN2: '',
      ChuongTrinhNN1: '',
      ChuongTrinhNN2: '',
      MaDanhMucNgoaiNgu1: '',
      MaDanhMucNgoaiNgu2: '',
      IsFreeDom: 0,
      HocBanTru: '',
      ClassLeaderId: '',
      ParentLeaderId: '',
      IsXoaMuChu: false,

      IsVNEN: false,
      IsTBDHTiengViet: false,
      IsTBDHToan: false,
      IsDaiDienChaMeLop: false,
      IsDaiDienChaMeTruong: false,
      IsGiaiThe: false,
      IsBanTru: false,
      IsBoTucTieuHoc: false,
      IsCapNhatLopGhep: false,
      Is2BuoiNgay: false,
      IsLopGhep: false,
      IsBilingual: false,
      IsHocNghe: false,
      IsChuyenBiet: false,
      IsActive: true,
    });
  }

  patchValueForm(valueForm: HomeroomClass) {
    this.logo = valueForm?.Avatar || '';
    this.formSubmit.setValue({
      Name: valueForm?.Name,
      Code: valueForm?.Code,
      GradeId: valueForm?.GradeId,
      SoBuoiHocTrenTuan: valueForm.SoBuoiHocTrenTuan,
      DiemTruong: valueForm.DiemTruong,
      HomeroomTeacherId: valueForm.HomeroomTeacherId,
      IndexOrder: valueForm.IndexOrder,
      GhepVaoLop: valueForm.GhepVaoLop,
      SachGiaoKhoa: valueForm.SachGiaoKhoa,
      SoTietHocTrenTuan: valueForm.SoTietHocTrenTuan,
      SoTietNN1: valueForm.SoTietNN1,
      SoTietNN2: valueForm.SoTietNN2,
      ChuongTrinhNN1: valueForm.ChuongTrinhNN1,
      ChuongTrinhNN2: valueForm.ChuongTrinhNN2,
      MaDanhMucNgoaiNgu1: valueForm.MaDanhMucNgoaiNgu1,
      MaDanhMucNgoaiNgu2: valueForm.MaDanhMucNgoaiNgu2,
      IsFreeDom: valueForm.IsFreeDom,
      HocBanTru: valueForm.HocBanTru,
      ClassLeaderId: valueForm.ClassLeaderId,
      ParentLeaderId: valueForm.ParentLeaderId,
      IsXoaMuChu: Boolean(+valueForm.IsXoaMuChu),

      IsVNEN: Boolean(+valueForm.IsVNEN),
      IsTBDHTiengViet: Boolean(+valueForm.IsTBDHTiengViet),
      IsTBDHToan: Boolean(+valueForm.IsTBDHToan),
      IsDaiDienChaMeLop: Boolean(+valueForm.IsDaiDienChaMeLop),
      IsDaiDienChaMeTruong: Boolean(+valueForm.IsDaiDienChaMeTruong),
      IsGiaiThe: Boolean(+valueForm.IsGiaiThe),
      IsBanTru: Boolean(+valueForm.IsBanTru),
      IsBoTucTieuHoc: Boolean(+valueForm.IsBoTucTieuHoc),
      IsCapNhatLopGhep: Boolean(+valueForm.IsCapNhatLopGhep),
      Is2BuoiNgay: Boolean(+valueForm.Is2BuoiNgay),
      IsLopGhep: Boolean(+valueForm.IsLopGhep),
      IsBilingual: Boolean(+valueForm.IsBilingual),
      IsHocNghe: Boolean(+valueForm.IsHocNghe),
      IsChuyenBiet: Boolean(+valueForm.IsChuyenBiet),
      IsActive: Boolean(+valueForm.IsActive),
    });
  }

  submit(valueForm: HomeroomClass) {
    if (this.formSubmit.valid) {
      let dataInput: HomeroomClass = {
        Avatar: this.logo,
        GradeId: valueForm.GradeId,
        Code: valueForm.Code,
        Name: valueForm.Name,
        HomeroomTeacherId: valueForm.HomeroomTeacherId,
        ClassLeaderId: valueForm.ClassLeaderId,
        ParentLeaderId: valueForm.ParentLeaderId,
        IndexOrder: valueForm.IndexOrder,
        IsActive: Number(valueForm.IsActive),
        // SignatureTeacher: '',
        IsBilingual: valueForm.IsBilingual ? '1' : '0',
        IsBanTru: valueForm.IsBanTru ? '1' : '0',
        SoBuoiHocTrenTuan: valueForm.SoBuoiHocTrenTuan,
        DiemTruong: valueForm.DiemTruong,
        SoTietHocTrenTuan: valueForm.SoTietHocTrenTuan,
        SachGiaoKhoa: valueForm.SachGiaoKhoa,
        MaDanhMucNgoaiNgu1: valueForm.MaDanhMucNgoaiNgu1,
        ChuongTrinhNN1: valueForm.ChuongTrinhNN1,
        SoTietNN1: valueForm.SoTietNN1,
        MaDanhMucNgoaiNgu2: valueForm.MaDanhMucNgoaiNgu2,
        ChuongTrinhNN2: valueForm.ChuongTrinhNN2,
        SoTietNN2: valueForm.SoTietNN2,
        HocBanTru: valueForm.HocBanTru,
        GhepVaoLop: valueForm.GhepVaoLop,
        IsLopGhep: valueForm.IsLopGhep ? '1' : '0',
        IsBoTucTieuHoc: valueForm.IsBoTucTieuHoc ? '1' : '0',
        IsXoaMuChu: valueForm.IsXoaMuChu ? '1' : '0',
        IsChuyenBiet: valueForm.IsChuyenBiet ? '1' : '0',
        IsVNEN: valueForm.IsVNEN ? '1' : '0',
        IsTBDHTiengViet: valueForm.IsTBDHTiengViet ? '1' : '0',
        IsTBDHToan: valueForm.IsTBDHToan ? '1' : '0',
        IsDaiDienChaMeLop: valueForm.IsDaiDienChaMeLop ? '1' : '0',
        IsDaiDienChaMeTruong: valueForm.IsDaiDienChaMeTruong ? '1' : '0',
        IsGiaiThe: valueForm.IsGiaiThe ? '1' : '0',
        IsCapNhatLopGhep: valueForm.IsCapNhatLopGhep ? '1' : '0',
        Is2BuoiNgay: valueForm.Is2BuoiNgay ? '1' : '0',
        IsHocNghe: valueForm.IsHocNghe ? '1' : '0',
        IsFreeDom: valueForm.IsFreeDom ? '1' : '0',
      };
      this.isLoading = true;
      if (this.nameForm == 'create') {
        this.listenFireBase('create', 'homeroom_class');
        this.trainingService.createHomeroomClass(dataInput).subscribe(
          (res: any) => {},
          (err) => {
            this.isLoading = false;
            this.validateAllFormFieldsErrorServer(err.errors);
          }
        );
      } else {
        this.listenFireBase('update', 'homeroom_class');
        this.trainingService
          .updateHomeroomClass(this.homeroomClassId, dataInput)
          .subscribe(
            (res: any) => {},
            (err) => {
              this.isLoading = false;
              this.validateAllFormFieldsErrorServer(err.errors);
            }
          );
      }
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formSubmit);
    }
  }

  getAnotherInfoToMapSchool() {
    this.isLoading = true;
    this.trainingService.getAnotherInfoToMapHomeroomClass().subscribe(
      (res: any) => {
        this.dataMoet = res;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getListStudent() {
    this.isLoading = true;
    this.trainingService
      .getListStudentHomeroomClass(this.homeroomClassId, '')
      .subscribe(
        (res: any) => {
          this.arrStudents = res.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  getListTeachers() {
    this.isLoading = true;
    this.trainingService.getListTeacher().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.arrTeachers = res.data;
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getListParents() {
    this.isLoading = true;
    this.trainingService.getListParent(this.homeroomClassId).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.arrParents = res.data;
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getDanhSachDiemTruong() {
    this.schoolService.danhSachDiemTruong(this.currentUnit.id, '').subscribe(
      (res: any) => {
        this.arrDiemTruong = res.data;
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getDetailHomeroomClass() {
    this.isLoading = true;
    this.trainingService.getDetailHomeroomClass(this.homeroomClassId).subscribe(
      (res: any) => {
        this.dataDetail = res.data;
        this.logo = this.dataDetail.Avatar;
        this.patchValueForm(this.dataDetail);
        this.getListStudent();
        this.getListParents();
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getListCompoundClass(nameFrom: string) {
    this.trainingService
      .getListCompoundClass(nameFrom, this.homeroomClassId)
      .subscribe(
        (res: any) => {
          this.arrLopGhep = res.data;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  changeCompoundClass(value: boolean) {
    if (!value) {
      this.formSubmit.get('GhepVaoLop').clearValidators();
      this.formSubmit.get('GhepVaoLop').setValue('');
    } else {
      this.formSubmit
        .get('GhepVaoLop')
        .setValidators([Validators.required, ValidatorNotNull]);
    }
  }

  cancel() {
    this.router.navigate(['staff/homeroom-class']);
  }

  getExtension(image) {
    if (image.endsWith('jpg')) {
      return 'jpg';
    }
    if (image.endsWith('jpeg')) {
      return 'jpeg';
    }
    if (image.endsWith('png')) {
      return 'png';
    }
  }

  onChangeFileInputLogo(event): void {
    this.isLoadingUpImg = true;
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      let allowExtensionImage = ['png', 'jpg', 'jpeg'];
      if (!allowExtensionImage.includes(this.getExtension(file?.type))) {
        this.showMessageService.warning(translate('msgCheckImg'));
        this.isLoadingUpImg = false;
        return;
      }
      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.resizeImageService.readFile(file, subscriber);
      });
      dataReadFile.subscribe((data) => {
        let dataInput = {
          base64Input: data,
          fileName: `${file.name}`,
        };
        this.fileName = `${file.name}`;
        this.generalService
          .uploadFileBase64(dataInput)
          .subscribe((res: any) => {
            this.logo = res.data;
            this.isLoadingUpImg = false;
          });
      });
    } else this.isLoadingUpImg = false;
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
        this.router.navigate(['staff/homeroom-class']);
      } else {
        this.isLoading = false;
      }
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((item: FormGroup) => {
          this.validateAllFormFields(item);
        });
      }
    });
  }

  validateAllFormFieldsErrorServer(error: any) {
    Object.keys(error).forEach((key) => {
      let arrKey = String(key).split('.');
      let indexKey = '';
      if (arrKey.length == 1) {
        this.validationMessagesServer[arrKey[0]] = {
          message: error[key],
        };
      } else {
        arrKey.forEach((itemKey: any) => {
          if (!isNaN(itemKey)) {
            indexKey += `${itemKey}`;
          }
          Object.keys(this.validationMessagesServer).forEach((itemMessage) => {
            if (itemMessage == arrKey[arrKey.length - 1]) {
              if (indexKey) {
                this.validationMessagesServer[itemMessage][indexKey] = {
                  message: error[key],
                };
              }
            }
          });
        });
      }
    });
  }

  getMessageServer(key, i) {
    let indexKey = `${i}`;
    return this.validationMessagesServer[key][indexKey];
  }

  validationMessages = {
    Name: [
      {
        type: 'required',
        message: 'requiredName',
      },
      {
        type: 'maxlength',
        message: 'maxLengthName',
      },
      {
        type: 'notEmpty',
        message: 'requiredName',
      },
    ],
    Code: [
      {
        type: 'required',
        message: 'requiredCode',
      },
      {
        type: 'maxlength',
        message: 'maxLengthCode',
      },
      {
        type: 'pattern',
        message: 'patternCode',
      },
    ],
    GradeId: [
      {
        type: 'notNull',
        message: 'training.requiredGrade',
      },
    ],
    SoBuoiHocTrenTuan: [
      {
        type: 'notNull',
        message: 'training.requiredSoBuoiHocTrenTuan',
      },
    ],
    IndexOrder: [
      {
        type: 'required',
        message: 'requiredIndexOrder',
      },
      {
        type: 'pattern',
        message: 'patternNumberInteger',
      },
    ],
    GhepVaoLop: [
      {
        type: 'notNull',
        message: 'training.requiredCompoundClass',
      },
    ],
  };
}
