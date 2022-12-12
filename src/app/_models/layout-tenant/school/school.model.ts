
export interface SchoolList {
  id: string,
  name: string,
  code: string,
  unitCode: string,
  unitName: string,
  isActive: number
}

export interface School {
  TenantId?: string,
  id?: string,
  CampusId?: string,
  CampusName?: string,
  MoetUnitCode?: string,
  MoetUnitName?: string,
  Name: string,
  EducationalStages: number | string,
  IndexOrder?: number,
  Email?: string,
  Hotline?: string,
  Fax?: string,
  Website?: string,
  Logo?: string,
  Phone?: string,
  SendFromEmail?: string,
  WardCode?: string,
  WardName?: string,
  DistrictCode?: string,
  DistrictName?: string,
  CityCode?: string,
  CityName?: string
  Address?: string,
  ChinhSachVung?: string,
  TenChinhSachVung?: string,
  MaLoaiHinhTruong?: string,
  TenMaLoaiHinhTruong?: string,
  KhuVuc?: string,
  TenKhuVuc?: string,
  MucChuanQuocGia?: string,
  TenMucChuanQuocGia?: string,
  MaLoaiTruong?: string,
  TenMaLoaiTruong?: string,
  MaVungKhoKhan?: string,
  TenMaVungKhoKhan?: string,
  MaDuAn?: string,
  TenMaDuAn?: string,
  TenHieuTruong?: string,
  EmailHieuTruong?: string,
  DienThoaiHieuTruong?: string,
  IsCoChiBoDang?: string,
  IsTruongQuocTe?: string,
  IsHocSinhKhuyetTat?: string,
  IsHocSinhBanTru?: string,
  IsKhiHauThienTai?: string,
  IsKyNangSongGDXG?: string,
  IsHocSinhNoiTru?: string,
  IsVungDacBietKhoKhan?: string,
  IsDatChatLuongToiThieu?: string,
  Is2BuoiNgay?: string,
  DienTich?: string,
  NamThanhLap?: string,
  IsSuDungMayTinhDayHoc?: string,
  IsKhaiThacInternetDayHoc?: string,
  IsDienLuoi?: string,
  IsNguonNuocSach?: string,
  IsCongTrinhVeSinh?: string,
  IsCtGdvsDoiTay?: string,
  IsChuongTrinhGiaoDucCoBan?: string,
  IsCoHaTangTlhtPhuHopHskt?: string,
  IsCongTacTuVanHocDuong?: string,
  IsTruongPtDtBanTru?: string,
  IsChuyenBietKhuyetTat?: string,
  IsCoNuocUong?: string,
  IsHocChuongTrinhSongNgu?: string,
  IsActive?: string,
  IsDeleted?: string | number,
  CreatedAt?: number,
  DiemTruong?: any
}

export interface DIEMTRUONG {
  TenDiemTruong: string;
  MaDiemTruong: string;
  DienTich?: string;
  KhoangCach?: string;
  Email?: string;
  DienThoai?: string;
  TrangThai?: number;
  QuanHuyen?: string;
  PhuongTien?: string;
  DiaChi?: string;
}

