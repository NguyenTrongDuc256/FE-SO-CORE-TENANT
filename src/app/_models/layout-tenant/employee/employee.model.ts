interface School {
  id: string,
  name: string,
  code: string
}

export interface SchoolList {
  id: string,
  name: string,
  code: string
}

export interface RoleList {
  id: string,
  name: string,
  code: string,
  layout: string,
}

export interface EmployeeList {
  id: string,
  avatar: string,
  userId: string,
  username: string,
  code: string,
  fullName: string,
  gender: number,
  birthday: number,
  email: string,
  phone: string,
  isActive: number,
  roleNumber: number,
  schools: School[],
}

export interface MoetCategories {
  bac_luong: any[];
  boi_duong_cbql_cot_can: any[];
  boi_duong_nghiep_vu: any[];
  boi_duong_thay_sach: any[];
  boi_duong_thuong_xuyen: any[];
  cap_day: any[];
  chuyen_mon: any[];
  dan_toc: any[];
  danh_gia_vien_chuc: any[];
  giao_vien_gioi: any[];
  gv_chu_nhiem_gioi: any[];
  gv_tong_phu_trach_doi_gioi: any[];
  hinh_thuc_dao_tao: any[];
  hinh_thuc_hop_dong: any[];
  hinh_thuc_ky_luat: any[];
  khen_thuong_giao_vien: any[];
  khung_nang_luc_ngoai_ngu: any[];
  moi_quan_he: any[];
  ngach: any[];
  ngoai_ngu: any[];
  nhiem_vu_kiem_nhiem: any[];
  nhom_chuc_vu: any[];
  nhom_chung_chi_ngoai_ngu: any[];
  quoc_tich: any[];
  tieng_dan_toc: any[];
  ton_giao: any[];
  trang_thai_can_bo: any[];
  trinh_do: any[];
  trinh_do_chuyen_mon_nghiep_vu: any[];
  trinh_do_llct: any[];
  trinh_do_ngoai_ngu: any[];
  trinh_do_qlgd: any[];
  trinh_do_tin_hoc: any[];
  vi_tri_viec_lam: any[];
  nhom_mau: any[];
  loai_chung_chi_ngoai_ngu: any[];
  co_so_dao_tao: any[];
  muc_dat_duoc_danh_gia_nhan_su: any[];
  tieu_chi_danh_gia_nhan_su: any[];
}

export interface DienBienQuaTrinhLuong {
  date?: number
  ngach: string,
  bacLuong: string,
  phanTramVuotKhung?: number
  heSoLuong: number
}

export interface QuaTrinhHocNgoaiNgu {
  ngoaiNgu?: string
  trinhDo?: string,
  diem: number,
  date: number
  note?: string
}

export interface QuaTrinhDaoTaoBD {
  truong?: string
  chuyenNganhDaoTao?: string,
  fromDate: number,
  toDate: number
  hinhThucDaoTao?: string
  trinhDo?: string
}

export interface DanhGiaChuanNgheNghiep {
  tieuChi: string
  tuDanhGia?: string,
  capTrenDanhGia?: string,
}

export interface KhenThuongGiaoVien {
  loai: string
  noiDung?: string,
  capKhenThuong?: string,
  soQuyetDinh?: string,
  date?: number,
}

export interface KyLuatGiaoVien {
  loai: string
  capKyQD?: string,
  soQD?: string,
  date?: number,
}

export interface QuanHeGiaDinh {
  moiQuanHe: string
  fullName: string,
  dateOfBirth?: number,
  content?: string,
}

export interface QuanHeGiaDinhVoChong {
  moiQuanHe: string
  fullName: string,
  dateOfBirth?: number,
  content?: string,
}

export interface QuaTrinhCongTac {
  fromDate: number
  toDate: number,
  content?: string,
}

export interface EmployeeForm {
  avatar: string,
  fullName: string,
  code: string,
  codeMoet: string,
  roleId: string,
  birthday: number,
  gender: number,
  isAccessApp: number,
  isActive: number,
  schoolId: string,
  username: string,
  password: string,
  email: string,
  phone: string,
  ethnic: string,
  religion: string,
  bloodType: string,
  nationality: string,
  address: string,
  permanentResidence: string,
  cityCode: string,
  socialInsuranceNumber: string,
  districtCode: string,
  trangThaiCanBo: string,
  wardCode: string,
  isDoanVien: number,
  idNumber: string,
  isDangVien: number,
  placeOfBirth: string,
  viTriViecLam: string,
  capDay: string,
  nhiemVuKiemNhiem: string,
  nhomChucVu: string,
  soTietThucDayTrenTuan: number,
  ngayBoNhiem: number,
  soTietKiemNhiemTrenTuan: number,
  soLanBoNhiem: number,
  ngach: string,
  hinhThucHopDong: string,
  maSoNgach: string,
  coQuanTuyenDung: string,
  namVaoTruong: string,
  ngheNghiepTuyenDung: string,
  ngayTuyenDung: number,
  danhHieuPhongTangCaoNhat: string,
  isTapHuanDayKNS: number,
  isPhoPhuTrach: number,
  isDayHocHoaNhap: number,
  isDayLopKhuyetTat: number,
  isTongPhuTrachDoi: number,
  isDay1Buoi: number,
  isThamGiaBoiDuongTx: number,
  isDay2Buoi: number,
  isBoiDuongTCCD: number,
  isChuyenTrachDoanDoi: number,
  phuCapThuHutNghe: string,
  bacLuong: string,
  phuCapThamNien: string,
  phanTramVuotKhung: number,
  phuCapUuDaiNghe: string,
  heSoLuong: string,
  phuCapChucVuLanhDao: string,
  ngayHuongLuong: number,
  dienBienQuaTrinhLuong: DienBienQuaTrinhLuong[] | null,
  ketQuaBoiDuongTX: string,
  loaiChungChiNgoaiNgu: string,
  trinhDoCMNV: string,
  khungNangLucNgoaiNgu: string,
  trinhDoLLCT: string,
  trinhDoTinHoc: string,
  trinhDoQLGD: string,
  ChuyenMonChinh: string,
  thamGiaBDNghiepVuQLGD: string,
  trinhDoChinh: string,
  thamGiaBDCBQLCotCan: string,
  coSoDaoTao: string,
  thamGiaBDThaySach: string,
  chuyenMonKhac: string,
  ngoaiNguChinh: string,
  trinhDoKhac: string,
  trinhDoDaoTaoNgoaiNgu: string,
  chungChiDanTocTS: string,
  nhomChungChiNgoaiNgu: string,
  tongPhuTrachDoiGioi: string,
  diemNgoaiNgu: number,
  quaTrinhHocNgoaiNgu: QuaTrinhHocNgoaiNgu[] | null,
  quaTrinhDaoTaoBD: QuaTrinhDaoTaoBD[] | null,
  danhGiaVienChuc: string,
  gvDayGioi: string,
  gvChuNhiemGioi: string,
  danhHieuPhongTang: string,
  danhGiaChuanNgheNghiep: DanhGiaChuanNgheNghiep[] | null,
  qhGiaDinh: QuanHeGiaDinh[] | null,
  khenThuong: KhenThuongGiaoVien[] | null,
  qhGiaDinhVoChong: QuanHeGiaDinhVoChong[] | null,
  kyLuat: KyLuatGiaoVien[] | null,
  quaTrinhCongTac: QuaTrinhCongTac[] | null,
}
