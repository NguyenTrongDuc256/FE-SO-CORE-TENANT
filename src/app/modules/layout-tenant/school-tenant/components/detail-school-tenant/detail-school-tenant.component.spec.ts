import { SchoolTenantModule } from './../../school-tenant.module';
import { SchoolYearListTenantRoutingModule } from './../../../school-year-tenant/school-year-tenant-routing.module';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSchoolTenantComponent } from './detail-school-tenant.component';
import { CoreModule } from 'src/app/_core/core.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.firebase';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxPermissionsConfigurationStore,
  NgxPermissionsStore,
  NgxRolesStore,
} from 'ngx-permissions';

describe('DetailSchoolTenantComponent', () => {
  let component: DetailSchoolTenantComponent;
  let fixture: ComponentFixture<DetailSchoolTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailSchoolTenantComponent],
      imports: [
        CommonModule,
        SchoolYearListTenantRoutingModule,
        CoreModule,
        SchoolTenantModule,
        RouterModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
      ],
      providers: [
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSchoolTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map data advanced of school', () => {
    component.infoBasicSchool = {
      TenantId: 'e98c5a2f-84d0-43fb-beeb-39f5f758b610',
      CampusId: 'f48d4e9c-4904-4b2d-baa9-879a68e40ade',
      MoetUnitCode: 'ThcsThanhCong',
      MoetUnitName: 'Trường THCS Thành Công',
      Name: 'Tiểu học Ba Đình',
      EducationalStages: 3,
      IndexOrder: 2,
      Email: 'badinh@gmail.vn',
      Hotline: '+84 122 333 445',
      Website: 'badinh@edu.com.vn',
      Logo: 'https://picsum.photos/100',
      Phone: '+84 122 333 445',
      SendFromEmail: 'badinh@gmail.com',
      WardCode: '09961',
      DistrictCode: '276',
      CityCode: '01',
      Address: 'Hà Nội',
      ChinhSachVung: '01',
      TenChinhSachVung: 'Trung du',
      MaLoaiHinhTruong: '01',
      TenMaLoaiHinhTruong: 'Công lập',
      KhuVuc: '02',
      TenKhuVuc: 'Đô thị',
      MucChuanQuocGia: '02',
      TenMucChuanQuocGia: 'Đạt chuẩn mức 1',
      MaLoaiTruong: '01',
      TenMaLoaiTruong: 'Dân tộc bán trú',
      MaVungKhoKhan: '01',
      TenMaVungKhoKhan: '135',
      MaDuAn: '01',
      TenMaDuAn: 'SEQAP',
      TenHieuTruong: 'Nguyên',
      EmailHieuTruong: 'nguyennt@omt.vn',
      DienThoaiHieuTruong: '0123465679',
      IsCoChiBoDang: '0',
      IsTruongQuocTe: '0',
      IsHocSinhKhuyetTat: '0',
      IsHocSinhBanTru: '0',
      IsKhiHauThienTai: '0',
      IsKyNangSongGDXG: '0',
      IsHocSinhNoiTru: '0',
      IsVungDacBietKhoKhan: '0',
      IsDatChatLuongToiThieu: '1',
      Is2BuoiNgay: '1',
      DienTich: '102 m2',
      NamThanhLap: '2012',
      IsSuDungMayTinhDayHoc: '1',
      IsKhaiThacInternetDayHoc: '1',
      IsDienLuoi: '1',
      IsNguonNuocSach: '1',
      IsCongTrinhVeSinh: '1',
      IsCtGdvsDoiTay: '1',
      IsChuongTrinhGiaoDucCoBan: '1',
      IsCoHaTangTlhtPhuHopHskt: '1',
      IsCongTacTuVanHocDuong: '1',
      IsTruongPtDtBanTru: '0',
      IsChuyenBietKhuyetTat: '0',
      IsCoNuocUong: '0',
      IsHocChuongTrinhSongNgu: '0',
      IsActive: '0',
      IsDeleted: 0,
      CreatedAt: 1661587313,
      DiemTruong: [],
      id: 'a7e3a37d-c9a8-4534-94b1-ce9b7283aecf',
    };
    component.arrInfoAdvanced = component.mapDataAdvancedSchool(
      component.infoBasicSchool,
      component.arrInfoAdvanced
    );
    expect(component.arrInfoAdvanced).toEqual([
      { key: 'IsCoChiBoDang', label: 'school.IsCoChiBoDang', value: '0' },
      { key: 'IsTruongQuocTe', label: 'school.IsTruongQuocTe', value: '0' },
      {
        key: 'IsVungDacBietKhoKhan',
        label: 'school.IsVungDacBietKhoKhan',
        value: '0',
      },
      { key: 'IsHocSinhNoiTru', label: 'school.IsHocSinhNoiTru', value: '0' },
      {
        key: 'IsSuDungMayTinhDayHoc',
        label: 'school.IsSuDungMayTinhDayHoc',
        value: '1',
      },
      {
        key: 'IsCongTacTuVanHocDuong',
        label: 'school.IsCongTacTuVanHocDuong',
        value: '1',
      },
      {
        key: 'IsKhaiThacInternetDayHoc',
        label: 'school.IsKhaiThacInternetDayHoc',
        value: '1',
      },
      { key: 'IsDienLuoi', label: 'school.IsDienLuoi', value: '1' },
      { key: 'IsKhiHauThienTai', label: 'school.IsKhiHauThienTai', value: '0' },
      { key: 'IsNguonNuocSach', label: 'school.IsNguonNuocSach', value: '1' },
      { key: 'IsCongTrinhVeSinh', label: 'school.IsCongTrinhVeSinh', value: '1' },
      {
        key: 'IsHocSinhKhuyetTat',
        label: 'school.IsHocSinhKhuyetTat',
        value: '0',
      },
      { key: 'IsCtGdvsDoiTay', label: 'school.IsCtGdvsDoiTay', value: '1' },
      {
        key: 'IsChuongTrinhGiaoDucCoBan',
        label: 'school.IsChuongTrinhGiaoDucCoBan',
        value: '1',
      },
      { key: 'IsHocSinhBanTru', label: 'school.IsHocSinhBanTru', value: '0' },
      {
        key: 'IsCoHaTangTlhtPhuHopHskt',
        label: 'school.IsCoHaTangTlhtPhuHopHskt',
        value: '1',
      },
      {
        key: 'IsDatChatLuongToiThieu',
        label: 'school.IsDatChatLuongToiThieu',
        value: '1',
      },
      { key: 'IsKyNangSongGDXG', label: 'school.IsKyNangSongGDXG', value: '0' },
      {
        key: 'IsChuyenBietKhuyetTat',
        label: 'school.IsChuyenBietKhuyetTat',
        value: '0',
      },
      {
        key: 'IsHocChuongTrinhSongNgu',
        label: 'school.IsHocChuongTrinhSongNgu',
        value: '0',
      },
      {
        key: 'IsTruongPtDtBanTru',
        label: 'school.IsTruongPtDtBanTru',
        value: '0',
      },
      { key: 'IsActive', label: 'school.IsActive', value: '0' },
    ]);
  });
});
