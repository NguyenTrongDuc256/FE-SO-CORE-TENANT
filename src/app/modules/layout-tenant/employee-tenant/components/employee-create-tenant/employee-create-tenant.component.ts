import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {translate} from '@ngneat/transloco';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResizeImageService} from "src/app/_services/resize-image.service";
import * as moment from 'moment';
import {GeneralService} from "src/app/_services/general.service";
import {forkJoin, Observable, Subscriber} from "rxjs";
import {
  AVATAR_DEFAULT,
  GENDER,
  MAX_LENGTH_CODE,
  MAX_LENGTH_FULL_NAME,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_USERNAME,
  MESSAGE_ERROR_CALL_API,
  MIN_LENGTH_PASSWORD,
  REGEX_CODE, REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_PHONE,
  REGEX_STRING,
  REGEX_USER_NAME,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {RoleService} from "src/app/_services/layout-tenant/role/role.service";
import {ShowMessageService} from "src/app/_services/show-message.service";
import {ListenFirebaseService} from "src/app/_services/listen-firebase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "src/app/_services/layout-tenant/employee/employee.service";
import {Validate} from "src/app/_models/layout-tenant/employee/validate.model";
import {
  DanhGiaChuanNgheNghiep,
  DienBienQuaTrinhLuong,
  EmployeeForm,
  KhenThuongGiaoVien,
  KyLuatGiaoVien,
  MoetCategories,
  QuanHeGiaDinh,
  QuanHeGiaDinhVoChong,
  QuaTrinhCongTac,
  QuaTrinhDaoTaoBD,
  QuaTrinhHocNgoaiNgu,
  RoleList,
  SchoolList
} from "src/app/_models/layout-tenant/employee/employee.model";
import {LocationService} from "src/app/_services/location.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDienBienLuongComponent} from "../../modals/modal-dien-bien-luong/modal-dien-bien-luong.component";
import {ModalDiemNgoaiNguComponent} from "../../modals/modal-diem-ngoai-ngu/modal-diem-ngoai-ngu.component";
import {
  ModalDanhGiaChuanNgheNghiepComponent
} from "../../modals/modal-danh-gia-chuan-nghe-nghiep/modal-danh-gia-chuan-nghe-nghiep.component";
import {ModalQuanHeGiaDinhComponent} from "../../modals/modal-quan-he-gia-dinh/modal-quan-he-gia-dinh.component";
import {
  ModalQuanHeGiaDinhVoChongComponent
} from "../../modals/modal-quan-he-gia-dinh-vo-chong/modal-quan-he-gia-dinh-vo-chong.component";
import {ModalKyLuatComponent} from "../../modals/modal-ky-luat/modal-ky-luat.component";
import {
  ModalQuaTrinhDaoTaoBoiDuongComponent
} from "../../modals/modal-qua-trinh-dao-tao-boi-duong/modal-qua-trinh-dao-tao-boi-duong.component";
import {ModalKhenThuongComponent} from "../../modals/modal-khen-thuong/modal-khen-thuong.component";
import {ModalQuaTrinhCongTacComponent} from "../../modals/modal-qua-trinh-cong-tac/modal-qua-trinh-cong-tac.component";

@Component({
  selector: 'app-employee-create-tenant',
  templateUrl: './employee-create-tenant.component.html',
  styleUrls: ['./employee-create-tenant.component.scss']
})
export class EmployeeCreateTenantComponent implements OnInit {
  isLoading: boolean = false;
  isUpdate: boolean = false;
  tab: number = 1;
  formGroup: FormGroup;
  avatarUser: string = AVATAR_DEFAULT;
  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;
  timePicker: boolean = false;
  gender: any = GENDER;
  moetCategories: MoetCategories;
  roleList: RoleList[] = [];
  schoolList: SchoolList[] = [];
  cityList: any[] = [];
  districtList: any[] = [];
  wardList: any[] = [];
  selectedValue: null = null;
  txtSelect: string = 'employee.select';
  nzNotFoundContent: string = 'employee.notFoundContent';
  duLieuDienBienLuong: any[] = [];
  duLieuDiemNgoaiNgu: any[] = [];
  duLieuQuaTrinhDaoTaoBD: any[] = [];
  duLieuDanhGiaChuanNgheNghiep: any[] = [];
  duLieuKhenThuongGV: any[] = [];
  duLieuKyLuatGV: any[] = [];
  duLieuQuanHeGiaDinh: any[] = [];
  duLieuQuanHeGiaDinhVoChong: any[] = [];
  duLieuQuaTrinhCongTac: any[] = [];

  trinhDoNgoaiNguList: any[] = [];
  tieuChiDanhGiaNhanSu: any[] = [];
  nhomChucVu: object = {};
  employeeId: string = '';
  employeeInfo: EmployeeForm;
  selectRoleUpdate: string = '';
  isShowPassword: boolean = false;
  dateCurrent: string = moment().format('X');


  validationMessages: Validate = {
    fullName: [
      {
        type: "required",
        message: 'employee.validators.fullName.required',
      },
      {
        type: "maxlength",
        message: 'employee.validators.fullName.maxlength',
      }
    ],
    code: [
      {
        type: "required",
        message: 'employee.validators.code.required',
      },
      {
        type: "pattern",
        message: 'employee.validators.code.pattern',
      },
      {
        type: "maxlength",
        message: 'employee.validators.code.maxlength',
      }
    ],
    moetCode: [
      {
        type: "pattern",
        message: 'employee.validators.moetCode.pattern',
      },
      {
        type: "maxlength",
        message: 'employee.validators.moetCode.maxlength',
      }
    ],
    roleId: [
      {
        type: "required",
        message: 'employee.validators.roleId.required',
      }
    ],
    schoolId: [
      {
        type: "required",
        message: 'employee.validators.schoolId.required',
      }
    ],
    username: [
      {
        type: "required",
        message: 'employee.validators.username.required',
      },
      {
        type: "pattern",
        message: 'employee.validators.username.pattern',
      },
      {
        type: "maxlength",
        message: 'employee.validators.username.maxlength',
      }
    ],
    password: [
      {
        type: "required",
        message: 'employee.validators.password.required',
      },
      {
        type: "pattern",
        message: 'employee.validators.password.pattern',
      },
      {
        type: "maxlength",
        message: 'employee.validators.password.maxlength',
      },
      {
        type: "minlength",
        message: 'employee.validators.password.minlength',
      }
    ],
    email: [
      {
        type: "pattern",
        message: 'employee.validators.email.pattern',
      }
    ],
    phone: [
      {
        type: "pattern",
        message: 'employee.validators.phone.pattern',
      }
    ],
    socialInsuranceNumber: [
      {
        type: "pattern",
        message: 'employee.validators.socialInsuranceNumber.pattern',
      }
    ],
    idNumber: [
      {
        type: "pattern",
        message: 'employee.validators.idNumber.pattern',
      }
    ],
  };

  validationMessagesServer = {
    fullName: {},
    code: {},
    moetCode: {},
    roleId: {},
    schoolId: {},
    username: {},
    password: {},
    email: {},
    phone: {},
    socialInsuranceNumber: {},
    idNumber: {}
  }

  constructor(
    private resizeImageService: ResizeImageService,
    private roleService: RoleService,
    private generalService: GeneralService,
    private showMessageService: ShowMessageService,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(el => {
      if (el.id && el.id != 0) this.employeeId = el.id;
    });

    if (this.employeeId) {
      this.initForm();
      this.isUpdate = true;
      const APIInitializationData = this.employeeService.getInitializationData();
      const APIEmployeeInfo = this.employeeService.detail(this.employeeId);
      forkJoin([APIInitializationData, APIEmployeeInfo]).subscribe(
        (res: any) => {
          /* APIInitializationData */
          this.moetCategories = res[0].data.moetCategories || {};
          this.roleList = res[0].data.roles || [];
          this.schoolList = res[0].data.schools || [];

          /* APIEmployeeInfo */
          this.employeeInfo = res[1].data;
          this.getCityList();
          this.getDistrictList(this.employeeInfo.cityCode);
          this.getWardList(this.employeeInfo.districtCode);

          if (this.employeeInfo.roles.length > 1) { // lấy dữ liệu hiển thị ở ô gán phân quyền
            this.selectRoleUpdate = `${this.employeeInfo.roles[0].name} ${translate('employee.and')} ${this.employeeInfo.roles.length - 1} ${translate('employee.vaQuyenKhac')}`
          } else {
            this.selectRoleUpdate = `${this.employeeInfo.roles[0].name}`
          }

          if (this.employeeInfo.ngoaiNguChinh) { // lay danh sach trinh độ ngoại ngữ theo parentCode ngoaiNguChinh
            this.trinhDoNgoaiNguList = this.moetCategories.trinh_do_ngoai_ngu.filter(
              el => el.parentCode == this.employeeInfo.ngoaiNguChinh
            );
          } else {
            this.trinhDoNgoaiNguList = [];
          }
          // gán lại gia trị vào các modal
          this.duLieuDienBienLuong = this.employeeInfo.dienBienQuaTrinhLuong || [];
          this.duLieuDiemNgoaiNgu = this.employeeInfo.quaTrinhHocNgoaiNgu || [];
          this.duLieuQuaTrinhDaoTaoBD = this.employeeInfo.quaTrinhDaoTaoBD || [];
          this.duLieuDanhGiaChuanNgheNghiep = this.employeeInfo.danhGiaChuanNgheNghiep || [];
          this.duLieuKhenThuongGV = this.employeeInfo.khenThuong || [];
          this.duLieuKyLuatGV = this.employeeInfo.kyLuat || [];
          this.duLieuQuanHeGiaDinh = this.employeeInfo.qhGiaDinh || [];
          this.duLieuQuanHeGiaDinhVoChong = this.employeeInfo.qhGiaDinhVoChong || [];
          this.duLieuQuaTrinhCongTac = this.employeeInfo.quaTrinhCongTac || [];

          // xử lý data vào modal đánh giá nhân sự
          this.tieuChiDanhGiaNhanSu = this.moetCategories.tieu_chi_danh_gia_nhan_su.filter(
            el => el.parentCode == this.employeeInfo.nhomChucVu
          );
          this.nhomChucVu = this.moetCategories.nhom_chuc_vu.find(el => el.code == this.employeeInfo.nhomChucVu);
          this.initForm();
          this.isLoading = false;

        }, (err) => {
          this.generalService.showToastMessageError400(err);
          this.isLoading = false;
        }
      );
    } else {
      this.getInitializationData();
      this.getCityList();
      this.initForm();
    }
  }

  onChangeTab(value: number): void {
    this.tab = value;
  }

  dataTimeOutputBirthday(event: any): void {
    this.formGroup.get('birthday').patchValue(event);
  }

  dataTimeOutputNgayBoNhiem(event: any): void {
    this.formGroup.get('ngayBoNhiem').patchValue(event);
  }

  dataTimeOutputNgayTuyenDung(event: any): void {
    this.formGroup.get('ngayTuyenDung').patchValue(event);
  }

  dataTimeOutputNgayHuongLuong(event: any): void {
    this.formGroup.get('ngayHuongLuong').patchValue(event);
  }

  onChangeFileInputAvatar(event: any): void {
    if (event.target.files.length > 0) {
      this.isLoading = true;
      const file = (event.target as HTMLInputElement).files[0];

      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        this.showMessageService.error(translate('msgCheckImg'));
        this.fileInputAvatar.nativeElement.value = '';
        this.isLoading = false;
        return;
      }

      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.resizeImageService.readFile(file, subscriber);
      })
      dataReadFile.subscribe((data) => {
        this.avatarUser = data as string;
        let dataInput = {
          base64Input: data,
          fileName: `${moment().format('x')}-${file.name}`
        }
        this.generalService.uploadFileBase64(dataInput).subscribe((res: any) => {
          this.formGroup.controls["avatar"].setValue(res.data);
          this.isLoading = false;
        })
      })
    }
  }

  onDeleteFileInputAvatar(): void {
    this.fileInputAvatar.nativeElement.value = '';
    this.avatarUser = AVATAR_DEFAULT;
    this.formGroup.controls["avatar"].setValue(this.avatarUser);
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      // BEGIN: Thong tin chung
      avatar: [this.employeeInfo ? this.employeeInfo.avatar : this.avatarUser],
      fullName: [this.employeeInfo ? this.employeeInfo.fullName : '', [
        Validators.required,
        Validators.maxLength(MAX_LENGTH_FULL_NAME)]
      ],
      code: this.employeeInfo ? [this.employeeInfo.code] : // 1 nếu update thì bỏ validate, không gửi field này khi submit
        ['', [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(MAX_LENGTH_CODE)]],
      moetCode: [this.employeeInfo ? this.employeeInfo.moetCode : '', [Validators.pattern(REGEX_CODE), Validators.maxLength(MAX_LENGTH_CODE)]],
      roleId: this.employeeInfo ? [''] : ['', [Validators.required]], // 2 nếu update thì bỏ validate, không gửi field này khi submit
      birthday: [this.employeeInfo ? this.employeeInfo.birthday : null],
      gender: [this.employeeInfo ? this.employeeInfo.gender : 1],
      isAccessApp: [this.employeeInfo ? !!this.employeeInfo.isAccessApp : true],
      isActive: [this.employeeInfo ? !!this.employeeInfo.isActive : true],
      schoolId: this.employeeInfo ? [this.employeeInfo.schoolId] : // 3 nếu update thì bỏ validate, không gửi field này khi submit
        [this.employeeInfo ? this.employeeInfo.schoolId : '', [Validators.required]],
      username: this.employeeInfo ? [this.employeeInfo.username] : // 4 nếu update thì bỏ validate, không gửi field này khi submit
        ['', [Validators.required, Validators.pattern(REGEX_USER_NAME), Validators.maxLength(MAX_LENGTH_USERNAME)]],
      password: this.employeeInfo ? ['3fFCSG2312'] : // 5 nếu update thì bỏ validate, không gửi field này khi submit
        ['', [Validators.required, Validators.pattern(REGEX_PASSWORD), Validators.minLength(MIN_LENGTH_PASSWORD), Validators.maxLength(MAX_LENGTH_PASSWORD)]],
      email: [this.employeeInfo ? this.employeeInfo.email : '', [Validators.pattern(REGEX_EMAIL)]],
      phone: [this.employeeInfo ? this.employeeInfo.phone : '', [Validators.pattern(REGEX_PHONE)]],
      ethnic: [this.employeeInfo && this.employeeInfo.ethnic != null ? this.employeeInfo.ethnic : ''], // dân tộc
      religion: [this.employeeInfo && this.employeeInfo.religion != null ? this.employeeInfo.religion : ''], // tôn giáo
      bloodType: [this.employeeInfo && this.employeeInfo.bloodType != null ? this.employeeInfo.bloodType : ''], // nhóm máu
      nationality: [this.employeeInfo && this.employeeInfo.nationality != null ? this.employeeInfo.nationality : ''], // quốc tịch
      address: [this.employeeInfo ? this.employeeInfo.address : ''], // địa chỉ
      permanentResidence: [this.employeeInfo ? this.employeeInfo.permanentResidence : ''], // hộ khẩu thường trú
      cityCode: [this.employeeInfo && this.employeeInfo.cityCode != null ? this.employeeInfo.cityCode : ''], // tỉnh/thành phố
      socialInsuranceNumber: [this.employeeInfo ? this.employeeInfo.socialInsuranceNumber : '', [Validators.pattern(REGEX_STRING)]], // số BHXH
      districtCode: [this.employeeInfo && this.employeeInfo.districtCode != null ? this.employeeInfo.districtCode : ''], // quận/huyện
      trangThaiCanBo: [this.employeeInfo && this.employeeInfo.trangThaiCanBo != null ? this.employeeInfo.trangThaiCanBo : ''], // trạng thái CB (cán bộ)
      wardCode: [this.employeeInfo && this.employeeInfo.wardCode != null ? this.employeeInfo.wardCode : ''], // xã/phường
      isDoanVien: [this.employeeInfo ? !!this.employeeInfo.isDoanVien : false], // là đoàn viên
      idNumber: [this.employeeInfo ? this.employeeInfo.idNumber : '', [Validators.pattern(REGEX_STRING)]], // CMND/CC
      isDangVien: [this.employeeInfo ? !!this.employeeInfo.isDangVien : false], // là đảng viên
      placeOfBirth: [this.employeeInfo ? this.employeeInfo.placeOfBirth : ''], // nơi sinh
      //END: Thong tin chung

      //BEGIN: Vị trí việc làm
      viTriViecLam: [this.employeeInfo && this.employeeInfo.viTriViecLam != null ? this.employeeInfo.viTriViecLam : ''],
      capDay: [this.employeeInfo && this.employeeInfo.capDay != null ? this.employeeInfo.capDay : ''],
      nhiemVuKiemNhiem: [this.employeeInfo && this.employeeInfo.nhiemVuKiemNhiem != null ? this.employeeInfo.nhiemVuKiemNhiem : ''],
      nhomChucVu: [this.employeeInfo && this.employeeInfo.nhomChucVu != null ? this.employeeInfo.nhomChucVu : ''],
      soTietThucDayTrenTuan: [this.employeeInfo ? this.employeeInfo.soTietThucDayTrenTuan : ''],
      ngayBoNhiem: [this.employeeInfo ? this.employeeInfo.ngayBoNhiem : ''],
      soTietKiemNhiemTrenTuan: [this.employeeInfo ? this.employeeInfo.soTietKiemNhiemTrenTuan : ''],
      soLanBoNhiem: [this.employeeInfo ? this.employeeInfo.soLanBoNhiem : ''],
      ngach: [this.employeeInfo && this.employeeInfo.ngach != null ? this.employeeInfo.ngach : ''],
      hinhThucHopDong: [this.employeeInfo && this.employeeInfo.hinhThucHopDong != null ? this.employeeInfo.hinhThucHopDong : ''],
      maSoNgach: [this.employeeInfo ? this.employeeInfo.maSoNgach : ''],
      coQuanTuyenDung: [this.employeeInfo ? this.employeeInfo.coQuanTuyenDung : ''],
      namVaoTruong: [this.employeeInfo ? this.employeeInfo.namVaoTruong : ''],
      ngheNghiepTuyenDung: [this.employeeInfo ? this.employeeInfo.ngheNghiepTuyenDung : ''],
      ngayTuyenDung: [this.employeeInfo ? this.employeeInfo.ngayTuyenDung : ''],
      danhHieuPhongTangCaoNhat: [this.employeeInfo ? this.employeeInfo.danhHieuPhongTangCaoNhat : ''],
      isTapHuanDayKNS: [this.employeeInfo ? !!this.employeeInfo.isTapHuanDayKNS : false],
      isPhoPhuTrach: [this.employeeInfo ? !!this.employeeInfo.isPhoPhuTrach : false],
      isDayHocHoaNhap: [this.employeeInfo ? !!this.employeeInfo.isDayHocHoaNhap : false],
      isDayLopKhuyetTat: [this.employeeInfo ? !!this.employeeInfo.isDayLopKhuyetTat : false],
      isTongPhuTrachDoi: [this.employeeInfo ? !!this.employeeInfo.isTongPhuTrachDoi : false],
      isDay1Buoi: [this.employeeInfo ? !!this.employeeInfo.isDay1Buoi : false],
      isThamGiaBoiDuongTx: [this.employeeInfo ? !!this.employeeInfo.isThamGiaBoiDuongTx : false],
      isDay2Buoi: [this.employeeInfo ? !!this.employeeInfo.isDay2Buoi : false],
      isBoiDuongTCCD: [this.employeeInfo ? !!this.employeeInfo.isBoiDuongTCCD : false],
      isChuyenTrachDoanDoi: [this.employeeInfo ? !!this.employeeInfo.isChuyenTrachDoanDoi : false],
      //END: Vị trí việc làm

      //BEGIN: Phụ cấp
      phuCapThuHutNghe: [this.employeeInfo ? this.employeeInfo.phuCapThuHutNghe : ''],
      bacLuong: [this.employeeInfo && this.employeeInfo.bacLuong != null ? this.employeeInfo.bacLuong : ''],
      phuCapThamNien: [this.employeeInfo ? this.employeeInfo.phuCapThamNien : ''],
      phanTramVuotKhung: [this.employeeInfo ? this.employeeInfo.phanTramVuotKhung : ''],
      phuCapUuDaiNghe: [this.employeeInfo ? this.employeeInfo.phuCapUuDaiNghe : ''],
      heSoLuong: [this.employeeInfo ? this.employeeInfo.heSoLuong : ''],
      phuCapChucVuLanhDao: [this.employeeInfo ? this.employeeInfo.phuCapChucVuLanhDao : ''],
      ngayHuongLuong: [this.employeeInfo ? this.employeeInfo.ngayHuongLuong : ''],
      dienBienQuaTrinhLuong: this.fb.array([]),
      //END: Phụ cấp

      //BEGIN: Đào tạo bồi dưỡng
      ketQuaBoiDuongTX: [this.employeeInfo && this.employeeInfo.ketQuaBoiDuongTX != null ? this.employeeInfo.ketQuaBoiDuongTX : ''], // K.Q Bồi dưỡng thường xuyên
      loaiChungChiNgoaiNgu: [this.employeeInfo && this.employeeInfo.loaiChungChiNgoaiNgu != null ? this.employeeInfo.loaiChungChiNgoaiNgu : ''], // Loại C.Chỉ N.Ngữ
      trinhDoCMNV: [this.employeeInfo && this.employeeInfo.trinhDoCMNV != null ? this.employeeInfo.trinhDoCMNV : ''], // T.độ c.môn n.vụ
      khungNangLucNgoaiNgu: [this.employeeInfo && this.employeeInfo.khungNangLucNgoaiNgu != null ? this.employeeInfo.khungNangLucNgoaiNgu : ''], // Khung N.Lực N.Ngữ
      trinhDoLLCT: [this.employeeInfo && this.employeeInfo.trinhDoLLCT != null ? this.employeeInfo.trinhDoLLCT : ''], // trinh do LLCT
      trinhDoTinHoc: [this.employeeInfo && this.employeeInfo.trinhDoTinHoc != null ? this.employeeInfo.trinhDoTinHoc : ''], // Trình độ tin học
      trinhDoQLGD: [this.employeeInfo && this.employeeInfo.trinhDoQLGD != null ? this.employeeInfo.trinhDoQLGD : ''], // T.độ quản lý giáo dục
      chuyenMonChinh: [this.employeeInfo && this.employeeInfo.chuyenMonChinh != null ? this.employeeInfo.chuyenMonChinh : ''], // Chuyên môn chính
      thamGiaBDNghiepVuQLGD: [this.employeeInfo && this.employeeInfo.thamGiaBDNghiepVuQLGD != null ? this.employeeInfo.thamGiaBDNghiepVuQLGD : ''], // Tham gia BD nghiệp vụ QLGD
      trinhDoChinh: [this.employeeInfo && this.employeeInfo.trinhDoChinh != null ? this.employeeInfo.trinhDoChinh : ''], // Trình độ chính
      thamGiaBDCBQLCotCan: [this.employeeInfo && this.employeeInfo.thamGiaBDCBQLCotCan != null ? this.employeeInfo.thamGiaBDCBQLCotCan : ''], // Tham gia BD CBQL/GV cốt cán
      coSoDaoTao: [this.employeeInfo && this.employeeInfo.coSoDaoTao != null ? this.employeeInfo.coSoDaoTao : ''], // Cơ sở đào tạo
      thamGiaBDThaySach: [this.employeeInfo && this.employeeInfo.thamGiaBDThaySach != null ? this.employeeInfo.thamGiaBDThaySach : ''], // Tham gia BD thay sách
      chuyenMonKhac: [this.employeeInfo && this.employeeInfo.chuyenMonKhac != null ? this.employeeInfo.chuyenMonKhac : ''], // Chuyên ngành khác/ chuyên môn khác
      ngoaiNguChinh: [this.employeeInfo && this.employeeInfo.ngoaiNguChinh != null ? this.employeeInfo.ngoaiNguChinh : ''], // Ngoại ngữ chính
      trinhDoKhac: [this.employeeInfo && this.employeeInfo.trinhDoKhac != null ? this.employeeInfo.trinhDoKhac : ''], // Trình độ khác
      trinhDoDaoTaoNgoaiNgu: [this.employeeInfo && this.employeeInfo.trinhDoDaoTaoNgoaiNgu != null ? this.employeeInfo.trinhDoDaoTaoNgoaiNgu : ''], // T.độ Đ.tạo N.Ngữ
      chungChiDanTocTS: [this.employeeInfo && this.employeeInfo.chungChiDanTocTS != null ? this.employeeInfo.chungChiDanTocTS : ''], // G.V có c.chỉ d.tộc t.số
      nhomChungChiNgoaiNgu: [this.employeeInfo && this.employeeInfo.nhomChungChiNgoaiNgu != null ? this.employeeInfo.nhomChungChiNgoaiNgu : ''], // Nhóm C.Chỉ N.Ngữ
      tongPhuTrachDoiGioi: [this.employeeInfo && this.employeeInfo.tongPhuTrachDoiGioi != null ? this.employeeInfo.tongPhuTrachDoiGioi : ''], // Tổng phụ trách đội giỏi
      diemNgoaiNgu: [this.employeeInfo ? this.employeeInfo.diemNgoaiNgu : ''], // Điểm ngoại ngữ
      quaTrinhHocNgoaiNgu: this.fb.array([]), // quá trình học ngoại ngữ
      quaTrinhDaoTaoBD: this.fb.array([]), // Q.trình ĐT B.dưỡng
      //END: Đào tạo bồi dưỡng

      //BEGIN: Đánh giá phân loại
      danhGiaVienChuc: [this.employeeInfo && this.employeeInfo.danhGiaVienChuc != null ? this.employeeInfo.danhGiaVienChuc : ''], // Đánh giá viên chức
      gvDayGioi: [this.employeeInfo && this.employeeInfo.gvDayGioi != null ? this.employeeInfo.gvDayGioi : ''], // Giáo viên dạy giỏi
      gvChuNhiemGioi: [this.employeeInfo && this.employeeInfo.gvChuNhiemGioi != null ? this.employeeInfo.gvChuNhiemGioi : ''], // giao viên chủ nhiệm giỏi
      danhHieuPhongTang: [this.employeeInfo ? this.employeeInfo.danhHieuPhongTang : ''], // Danh hiệu phong tặng
      danhGiaChuanNgheNghiep: this.fb.array([]), // Đ.giá chuẩn NN CBQL/GV
      qhGiaDinh: this.fb.array([]), // Quan hệ gia đình
      khenThuong: this.fb.array([]), // Khen thưởng
      qhGiaDinhVoChong: this.fb.array([]), // Quan hệ gia đình (Vợ/chồng)
      kyLuat: this.fb.array([]), // Kỉ luật
      quaTrinhCongTac: this.fb.array([]), // Qúa trình công tác
      //END: Đánh giá phân loại
    })
  }

  onSubmit(formValue): void {
    this.isLoading = true;
    if (this.formGroup.valid) {
      this.storeOrUpdate(formValue);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
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

  storeOrUpdate(formValue) {
    let inputDienBienLuong: DienBienQuaTrinhLuong[] = [];
    let inputQuaTrinhHocNgoaiNgu: QuaTrinhHocNgoaiNgu[] = [];
    let inputQuaTrinhDaoTaoBD: QuaTrinhDaoTaoBD[] = [];
    let inputDanhGiaChuanNgheNghiep: DanhGiaChuanNgheNghiep[] = [];
    let inputQhGiaDinh: QuanHeGiaDinh[] = [];
    let inputQhGiaDinhVoChong: QuanHeGiaDinhVoChong[] = [];
    let inputKhenThuong: KhenThuongGiaoVien[] = [];
    let inputKyLuat: KyLuatGiaoVien[] = [];
    let inputQuaTrinhCongTac: QuaTrinhCongTac[] = [];

    if (this.duLieuDienBienLuong.length > 0) {
      this.duLieuDienBienLuong.forEach(el => {
        inputDienBienLuong.push({
          date: el.date ? Number(el.date) : null,
          ngach: el.ngach,
          bacLuong: el.bacLuong,
          phanTramVuotKhung: el.phanTramVuotKhung ? Number(el.phanTramVuotKhung) : null,
          heSoLuong: Number(el.heSoLuong),
        });
      });
    }

    if (this.duLieuDiemNgoaiNgu.length > 0) {
      this.duLieuDiemNgoaiNgu.forEach(el => {
        inputQuaTrinhHocNgoaiNgu.push({
          ngoaiNgu: el.ngoaiNgu,
          trinhDo: el.trinhDo,
          diem: el.diem ? Number(el.diem) : null,
          date: el.date ? Number(el.date) : null,
          note: el.note
        });
      });
    }

    if (this.duLieuQuaTrinhDaoTaoBD.length > 0) {
      this.duLieuQuaTrinhDaoTaoBD.forEach(el => {
        inputQuaTrinhDaoTaoBD.push({
          truong: el.truong,
          chuyenNganhDaoTao: el.chuyenNganhDaoTao,
          fromDate: el.fromDate ? Number(el.fromDate) : null,
          toDate: el.toDate ? Number(el.toDate) : null,
          hinhThucDaoTao: el.hinhThucDaoTao,
          trinhDo: el.trinhDo,
        });
      });
    }

    if (this.duLieuDanhGiaChuanNgheNghiep.length > 0) {
      this.duLieuDanhGiaChuanNgheNghiep.forEach(el => {
        inputDanhGiaChuanNgheNghiep.push({
          tieuChi: el.tieuChi ? el.tieuChi : null,
          tuDanhGia: el.tuDanhGia ? el.tuDanhGia : null,
          capTrenDanhGia: el.capTrenDanhGia ? el.capTrenDanhGia : null
        });
      });
    }

    if (this.duLieuQuanHeGiaDinh.length > 0) {
      this.duLieuQuanHeGiaDinh.forEach(el => {
        inputQhGiaDinh.push({
          moiQuanHe: el.moiQuanHe,
          fullName: el.fullName,
          dateOfBirth: el.dateOfBirth ? Number(el.dateOfBirth) : null,
          content: el.content ? el.content : null
        });
      });
    }

    if (this.duLieuQuanHeGiaDinhVoChong.length > 0) {
      this.duLieuQuanHeGiaDinhVoChong.forEach(el => {
        inputQhGiaDinhVoChong.push({
          moiQuanHe: el.moiQuanHe,
          fullName: el.fullName,
          dateOfBirth: el.dateOfBirth ? Number(el.dateOfBirth) : null,
          content: el.content ? el.content : null
        });
      });
    }

    if (this.duLieuKyLuatGV.length > 0) {
      this.duLieuKyLuatGV.forEach(el => {
        inputKyLuat.push({
          loai: el.loai,
          capKyQD: el.capKyQD ? el.capKyQD : null,
          soQD: el.soQD ? el.soQD : null,
          date: el.date ? Number(el.date) : null
        });
      });
    }

    if (this.duLieuKhenThuongGV.length > 0) {
      this.duLieuKhenThuongGV.forEach(el => {
        inputKhenThuong.push({
          loai: el.loai,
          noiDung: el.noiDung ? el.noiDung : null,
          capKhenThuong: el.capKhenThuong ? el.capKhenThuong : null,
          soQuyetDinh: el.soQuyetDinh ? el.soQuyetDinh : null,
          date: el.date ? Number(el.date) : null
        });
      });
    }

    if (this.duLieuQuaTrinhCongTac.length > 0) {
      this.duLieuQuaTrinhCongTac.forEach(el => {
        inputQuaTrinhCongTac.push({
          fromDate: el.fromDate ? Number(el.fromDate) : null,
          toDate: el.fromDate ? Number(el.fromDate) : null,
          content: el.content
        });
      });
    }

    let dataInput: EmployeeForm = {
      avatar: formValue.avatar,
      fullName: formValue.fullName || null,
      code: formValue.code || null,
      moetCode: formValue.moetCode || null,
      roleId: formValue.roleId || null,
      birthday: formValue.birthday ? Number(formValue.birthday) : null,
      gender: Number(formValue.gender),
      isAccessApp: formValue.isAccessApp ? 1 : 0,
      isActive: formValue.isActive ? 1 : 0,
      schoolId: formValue.schoolId || null,
      username: formValue.username || null,
      password: formValue.password || null,
      email: formValue.email || null,
      phone: formValue.phone || null,
      ethnic: formValue.ethnic || null,
      religion: formValue.religion || null,
      bloodType: formValue.bloodType || null,
      nationality: formValue.nationality || null,
      address: formValue.address || null,
      permanentResidence: formValue.permanentResidence || null,
      cityCode: formValue.cityCode || null,
      socialInsuranceNumber: formValue.socialInsuranceNumber || null,
      districtCode: formValue.districtCode || null,
      trangThaiCanBo: formValue.trangThaiCanBo || null,
      wardCode: formValue.wardCode || null,
      isDoanVien: formValue.isDoanVien ? 1 : 0,
      idNumber: formValue.idNumber || null,
      isDangVien: formValue.isDangVien ? 1 : 0,
      placeOfBirth: formValue.placeOfBirth || null,
      viTriViecLam: formValue.viTriViecLam || null,
      capDay: formValue.capDay || null,
      nhiemVuKiemNhiem: formValue.nhiemVuKiemNhiem || null,
      nhomChucVu: formValue.nhomChucVu || null,
      soTietThucDayTrenTuan: formValue.soTietThucDayTrenTuan ? Number(formValue.soTietThucDayTrenTuan) : null,
      ngayBoNhiem: formValue.ngayBoNhiem ? Number(formValue.ngayBoNhiem) : null,
      soTietKiemNhiemTrenTuan: formValue.soTietKiemNhiemTrenTuan ? Number(formValue.soTietKiemNhiemTrenTuan) : null,
      soLanBoNhiem: formValue.soLanBoNhiem ? Number(formValue.soLanBoNhiem) : null,
      ngach: formValue.ngach || null,
      hinhThucHopDong: formValue.hinhThucHopDong || null,
      maSoNgach: formValue.maSoNgach || null,
      coQuanTuyenDung: formValue.coQuanTuyenDung || null,
      namVaoTruong: formValue.namVaoTruong || null,
      ngheNghiepTuyenDung: formValue.ngheNghiepTuyenDung || null,
      ngayTuyenDung: formValue.ngayTuyenDung ? Number(formValue.ngayTuyenDung) : null,
      danhHieuPhongTangCaoNhat: formValue.danhHieuPhongTangCaoNhat || null,
      isTapHuanDayKNS: formValue.isTapHuanDayKNS ? 1 : 0,
      isPhoPhuTrach: formValue.isPhoPhuTrach ? 1 : 0,
      isDayHocHoaNhap: formValue.isDayHocHoaNhap ? 1 : 0,
      isDayLopKhuyetTat: formValue.isDayLopKhuyetTat ? 1 : 0,
      isTongPhuTrachDoi: formValue.isTongPhuTrachDoi ? 1 : 0,
      isDay1Buoi: formValue.isDay1Buoi ? 1 : 0,
      isThamGiaBoiDuongTx: formValue.isThamGiaBoiDuongTx ? 1 : 0,
      isDay2Buoi: formValue.isDay2Buoi ? 1 : 0,
      isBoiDuongTCCD: formValue.isBoiDuongTCCD ? 1 : 0,
      isChuyenTrachDoanDoi: formValue.isChuyenTrachDoanDoi ? 1 : 0,
      phuCapThuHutNghe: formValue.phuCapThuHutNghe || null,
      bacLuong: formValue.bacLuong || null,
      phuCapThamNien: formValue.phuCapThamNien || null,
      phanTramVuotKhung: formValue.phanTramVuotKhung ? Number(formValue.phanTramVuotKhung) : null,
      phuCapUuDaiNghe: formValue.phuCapUuDaiNghe || null,
      heSoLuong: formValue.heSoLuong || null,
      phuCapChucVuLanhDao: formValue.phuCapChucVuLanhDao || null,
      ngayHuongLuong: formValue.ngayHuongLuong ? Number(formValue.ngayHuongLuong) : null,
      dienBienQuaTrinhLuong: inputDienBienLuong.length > 0 ? inputDienBienLuong : null,
      ketQuaBoiDuongTX: formValue.ketQuaBoiDuongTX || null,
      loaiChungChiNgoaiNgu: formValue.loaiChungChiNgoaiNgu || null,
      trinhDoCMNV: formValue.trinhDoCMNV || null,
      khungNangLucNgoaiNgu: formValue.khungNangLucNgoaiNgu || null,
      trinhDoLLCT: formValue.trinhDoLLCT || null,
      trinhDoTinHoc: formValue.trinhDoTinHoc || null,
      trinhDoQLGD: formValue.trinhDoQLGD || null,
      chuyenMonChinh: formValue.chuyenMonChinh || null,
      thamGiaBDNghiepVuQLGD: formValue.thamGiaBDNghiepVuQLGD || null,
      trinhDoChinh: formValue.trinhDoChinh || null,
      thamGiaBDCBQLCotCan: formValue.thamGiaBDCBQLCotCan || null,
      coSoDaoTao: formValue.coSoDaoTao || null,
      thamGiaBDThaySach: formValue.thamGiaBDThaySach || null,
      chuyenMonKhac: formValue.chuyenMonKhac || null,
      ngoaiNguChinh: formValue.ngoaiNguChinh || null,
      trinhDoKhac: formValue.trinhDoKhac || null,
      trinhDoDaoTaoNgoaiNgu: formValue.trinhDoDaoTaoNgoaiNgu || null,
      chungChiDanTocTS: formValue.chungChiDanTocTS || null,
      nhomChungChiNgoaiNgu: formValue.nhomChungChiNgoaiNgu || null,
      tongPhuTrachDoiGioi: formValue.tongPhuTrachDoiGioi || null,
      diemNgoaiNgu: formValue.diemNgoaiNgu ? formValue.diemNgoaiNgu : null,
      quaTrinhHocNgoaiNgu: inputQuaTrinhHocNgoaiNgu.length > 0 ? inputQuaTrinhHocNgoaiNgu : null,
      quaTrinhDaoTaoBD: inputQuaTrinhDaoTaoBD.length > 0 ? inputQuaTrinhDaoTaoBD : null,
      danhGiaVienChuc: formValue.danhGiaVienChuc || null,
      gvDayGioi: formValue.gvDayGioi || null,
      gvChuNhiemGioi: formValue.gvChuNhiemGioi || null,
      danhHieuPhongTang: formValue.danhHieuPhongTang || null,
      danhGiaChuanNgheNghiep: inputDanhGiaChuanNgheNghiep.length > 0 ? inputDanhGiaChuanNgheNghiep : null,
      qhGiaDinh: inputQhGiaDinh.length > 0 ? inputQhGiaDinh : null,
      khenThuong: inputKhenThuong.length > 0 ? inputKhenThuong : null,
      qhGiaDinhVoChong: inputQhGiaDinhVoChong.length > 0 ? inputQhGiaDinhVoChong : null,
      kyLuat: inputKyLuat.length > 0 ? inputKyLuat : null,
      quaTrinhCongTac: inputQuaTrinhCongTac.length > 0 ? inputQuaTrinhCongTac : null,
    }

    if (this.isUpdate) {
      dataInput.id = this.employeeId;
      dataInput.userId = this.employeeInfo.userId;
      delete dataInput.code;
      delete dataInput.roleId;
      delete dataInput.schoolId;
      delete dataInput.username;
      delete dataInput.password;

      this.listenFireBase("update", "employee");
      this.employeeService.update(dataInput).subscribe(
        (res: any) => {

        }, (_err: any) => {
          this.validateAllFormFieldsErrorServer(_err.errors);
          this.isLoading = false;
        })

    } else {
      this.listenFireBase("create", "employee");
      this.employeeService.store(dataInput).subscribe(
        (res: any) => {

        }, (_err: any) => {
          this.validateAllFormFieldsErrorServer(_err.errors);
          this.isLoading = false;
        })
    }
  }

  listenFireBase(action: string, module: string): void {
    setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.isLoading = false;
        this.router.navigate(['/tenant/employee']);
      } else {
        this.isLoading = false;
      }
    });
  }

  getInitializationData(): void {
    this.isLoading = true;
    this.employeeService.getInitializationData().subscribe(
      (res: any): void => {
        this.moetCategories = res.data.moetCategories || {};
        this.roleList = res.data.roles || [];
        this.schoolList = res.data.schools || [];
        this.isLoading = false;
      }, (err: any) => {
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  getCityList(): void {
    this.isLoading = true;
    this.locationService.getCityList().subscribe(
      (res: any): void => {
        this.cityList = res.data;
        this.isLoading = false;
      }, (err: any) => {
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  getDistrictList(cityCode: string): void {
    this.isLoading = true;
    this.locationService.getDistrictList(cityCode).subscribe((res: any): void => {
        this.districtList = res.data;
        this.isLoading = false;
      }, (err: any) => {
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  getWardList(districtCode: string): void {
    this.isLoading = true;
    this.locationService.getWardList(districtCode).subscribe(
      (res: any): void => {
        this.wardList = res.data;
        this.isLoading = false;
      }, (err: any) => {
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  onChangeCity(event): void {
    event ? this.getDistrictList(event) : this.districtList = [];
    this.formGroup.get('districtCode').patchValue('');
  }

  onChangeDistrict(event): void {
    event ? this.getWardList(event) : this.wardList = [];
    this.formGroup.get('wardCode').patchValue('');
  }

  onChangeNgach(event: string): void {
    event ? this.formGroup.get('maSoNgach').patchValue(event) : this.formGroup.get('maSoNgach').patchValue('');
  }

  onChangeNgoaiNguChinh(event: string): void {
    if (event) {
      this.trinhDoNgoaiNguList = this.moetCategories.trinh_do_ngoai_ngu.filter(
        el => el.parentCode == event
      );
    } else {
      this.trinhDoNgoaiNguList = [];
    }
    this.formGroup.get('trinhDoDaoTaoNgoaiNgu').patchValue('');
  }

  openModalDienBienLuong(): void {
    const modalRef = this.modalService.open(ModalDienBienLuongComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        backdrop: 'static',
        keyboard: false,
        centered: false,
        size: 'xl',
      });

    let data = {
      titleModal: translate('employee.dienBienQuaTrinhLuong'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: this.moetCategories,
      duLieuDienBienLuong: this.duLieuDienBienLuong,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      this.duLieuDienBienLuong = result;
    }, (reason) => {
    });
  }

  openModalNgoaiNgu(): void {
    const modalRef = this.modalService.open(ModalDiemNgoaiNguComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        backdrop: 'static',
        keyboard: false,
        centered: false,
        size: 'xl',
      });

    let data = {
      titleModal: translate('employee.ngoaiNgu'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: this.moetCategories,
      duLieuDiemNgoaiNgu: this.duLieuDiemNgoaiNgu,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      this.duLieuDiemNgoaiNgu = result;
    }, (reason) => {
    });
  }

  openModalQuaTrinhDaoTaoBD(): void {
    const modalRef = this.modalService.open(ModalQuaTrinhDaoTaoBoiDuongComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        backdrop: 'static',
        keyboard: false,
        centered: false,
        size: 'xl',
        // modalDialogClass: 'modal-xxl'
      });

    let data = {
      titleModal: translate('employee.quaTrinhDaoTaoBD'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: this.moetCategories,
      duLieuQuaTrinhDaoTaoBD: this.duLieuQuaTrinhDaoTaoBD,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      this.duLieuQuaTrinhDaoTaoBD = result;
    }, (reason) => {
    });
  }

  onChangeNhomChucVu(nhomChucVuCode: string): void {
    if (nhomChucVuCode) {
      this.duLieuDanhGiaChuanNgheNghiep = [];
      this.tieuChiDanhGiaNhanSu = this.moetCategories.tieu_chi_danh_gia_nhan_su.filter(
        el => el.parentCode == nhomChucVuCode
      );
      this.nhomChucVu = this.moetCategories.nhom_chuc_vu.find(el => el.code == nhomChucVuCode);
    } else {
      this.duLieuDanhGiaChuanNgheNghiep = [];
      this.tieuChiDanhGiaNhanSu = [];
      this.nhomChucVu = {};
    }
  }

  openModalDanhGiaChuanNgheNghiep(): void {
    const modalRef = this.modalService.open(ModalDanhGiaChuanNgheNghiepComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        backdrop: 'static',
        keyboard: false,
        centered: false,
        size: 'xl',
        // modalDialogClass: 'modal-xxl'
      });

    let data = {
      titleModal: translate('employee.titleDanhGiaChuanNgheNghiep'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: this.moetCategories,
      duLieuDanhGiaChuanNgheNghiep: this.duLieuDanhGiaChuanNgheNghiep,
      tieuChiDanhGiaNhanSu: this.tieuChiDanhGiaNhanSu,
      nhomChucVu: this.nhomChucVu,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result) {
        this.duLieuDanhGiaChuanNgheNghiep = result;
      }
    }, (reason) => {
    });
  }

  openModalKhenThuongGV(): void {
    const modalRef = this.modalService.open(ModalKhenThuongComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        backdrop: 'static',
        keyboard: false,
        centered: false,
        size: 'xl',
        // modalDialogClass: 'modal-xxl'
      });

    let data = {
      titleModal: translate('employee.khenThuongGV'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: this.moetCategories,
      duLieuKhenThuongGV: this.duLieuKhenThuongGV,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      this.duLieuKhenThuongGV = result;
    }, (reason) => {
    });
  }

  openModalKyLuatGV(): void {
    const modalRef = this.modalService.open(ModalKyLuatComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        backdrop: 'static',
        keyboard: false,
        centered: false,
        size: 'xl',
        // modalDialogClass: 'modal-xxl'
      });

    let data = {
      titleModal: translate('employee.kyLuatGV'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: this.moetCategories,
      duLieuKyLuatGV: this.duLieuKyLuatGV,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      this.duLieuKyLuatGV = result;
    }, (reason) => {
    });
  }

  openModalQuanHeGiaDinh(): void {
    const modalRef = this.modalService.open(ModalQuanHeGiaDinhComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        backdrop: 'static',
        keyboard: false,
        centered: false,
        size: 'xl',
        // modalDialogClass: 'modal-xxl'
      });

    let data = {
      titleModal: translate('employee.quanHeGiaDinh'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: this.moetCategories,
      duLieuQuanHeGiaDinh: this.duLieuQuanHeGiaDinh,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      this.duLieuQuanHeGiaDinh = result;
    }, (reason) => {
    });
  }

  openModalQuanHeGiaDinhVoChong(): void {
    const modalRef = this.modalService.open(ModalQuanHeGiaDinhVoChongComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        backdrop: 'static',
        keyboard: false,
        centered: false,
        size: 'xl',
        // modalDialogClass: 'modal-xxl'
      });

    let data = {
      titleModal: translate('employee.quanHeGiaDinhVoChong'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: this.moetCategories,
      duLieuQuanHeGiaDinhVoChong: this.duLieuQuanHeGiaDinhVoChong,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      this.duLieuQuanHeGiaDinhVoChong = result;
    }, (reason) => {
    });
  }

  openModalQuaTrinhCongTac(): void {
    const modalRef = this.modalService.open(ModalQuaTrinhCongTacComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        backdrop: 'static',
        keyboard: false,
        centered: false,
        size: 'xl',
        // modalDialogClass: 'modal-xxl'
      });

    let data = {
      titleModal: translate('employee.quaTrinhCongTac'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: this.moetCategories,
      duLieuQuaTrinhCongTac: this.duLieuQuaTrinhCongTac,
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      this.duLieuQuaTrinhCongTac = result;
    }, (reason) => {
    });
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}
