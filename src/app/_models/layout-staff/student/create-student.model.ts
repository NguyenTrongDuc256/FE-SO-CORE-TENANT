export interface CreateStudentModel {
    schoolId?: string, // id trường
    gradeId?: string, // id khối
    homeroomClassId?: string, // lớp
    homeroomClassIndexOrder?: number,
    username?: string, // tên đăng nhập
    avatar?: string, // //
    moetCode?: string, // //
    password?: string, // mật khẩu
    fullName?: string, // họ và tên
    code?: string, // mã học sinh
    ethnic?: string, // dân tộc
    religion?: string, // tôn giáo
    idNumber?: string, // Số CMND
    idNumberIssueDate?: string, // ngày cấp
    disablilityCode?: string, // Loại khuyết tật
    idNumberIssueBy?: string, // Nơi cấp
    birthday?: number, // ngày sinh
    phone?: string, // số điện thoại
    email?: string, // email
    gender?: number, // giới tính
    nationality?: string, // quốc tịch
    address?: string, // địa chỉ
    permanentResidence?: string, // HKTT
    cityCode?: string, // Tỉnh thành phố
    districtCode?: string, // quận huyện
    wardCode?: string, // phường xã
    placeOfBirth?: string, // Nơi sinh
    bloodType?: string, // nhóm máu
    isAccessApp?: number, // được phép truy cập app
    isActive?: number, // kích hoạt
    joinDate?: number, // 
    unionMember?: number, // đoàn viên
    pionnerJoinDate?: number, // 
    pionnerPlace?: string, // 
    partyMember?: number, // Đội viên
    partyMemberJoinDate?: number, // 
    partyMemberPlace?: string, // 
    selectedType?: number | string, // hình thức trúng tuyển //
    policyObject?: string, // đối tượng chính sách 
    isRepetition?: number, // 
    classOfAcademicYearLast?: number, // để null
    isBilingual?: number, // 
    discipline?: string, // 
    reward?: string, // 
    talent?: string, // 
    isCreateFatherAccount?: number, // checkbox Bố ruột
    fatherAvatar?: string, // //
    fatherFullName?: string, // Họ và tên
    fatherCode?: string, // //
    fatherIsAccessApp?: number | string, // Được phép truy cập App //
    fatherIsActive?: number | string, // kích hoạt //
    fatherUserName?: string, // 
    fatherPassword?: string, // 
    fatherPhone?: string, // 
    fatherEmail?: string, // 
    fatherBirthday?: number, // 
    fatherJob?: string, // nghề nghiệp
    isCreateMotherAccount?: number, // 
    motherAvatar?: string, // 
    motherFullName?: string, // 
    motherCode?: string, // 
    motherIsAccessApp?: number | string, // checkbox Mẹ đẻ //
    motherIsActive?: number | string, // 
    motherUserName?: string, // 
    motherPassword?: string, // 
    motherPhone?: string, // 
    motherEmail?: string, // 
    motherBirthday?: number, // 
    motherJob?: string, // 
    isCreateTutorAccount?: number, // người đỡ đầu 
    tutorAvatar?: string, // 
    tutorFullName?: string, // 
    tutorCode?: string, // 
    tutorIsAccessApp?: number | string, // 
    tutorIsActive?: number | string, // 
    tutorGender?: number | string, // 
    tutorUserName?: string, // 
    tutorPassword?: string, // 
    tutorPhone?: string, // 
    tutorEmail?: string, // 
    tutorBirthday?: number, // 
    tutorJob?: string, // 
    priorityLevel?: number, // đối tượng ưu tiên
    specialNote?: string, // 
    isRegisterMeal?: number, // 
    status?: string, // trạng thái
    maKhuVuc?: string, // mã khu vực
    huongNghiepDayNghe?: number, // hướng nghiệp dạy nghề
    maSoBuoiHocTrenTuan?: string, // số buổi học / tuần 
    danTocTheoGiayKhai?: string, // DT trên giấy KS
    thonXom?: string, // thôn xóm
    thuTu?: number, // thứ tự sắp xếp
    isLuuBanNamTruoc?: number, // Lưu ban năm trước
    isHocSinhBanTruDanNuoi?: number, // Học sinh B.Trú D.Nuôi
    isHocSinhNoiTruDanNuoi?: number, // Học sinh N.Trú D.Nuôi
    isHocSinhPtDtBanTru?: number, // Học sinh PTDT bán trú
    isChaDt?: number, // Có cha dân tộc
    isMeDt?: number, // Có mẹ dân tộc
    isKhuyetTatKhongDanhGia?: number, // Khuyết tật không ĐG
    isHocSinhBietBoi?: number, // 
    isHocSinhTiengDanToc?: number, // Học tiếng D.Tộc 
    isHocSongNgu?: number, // hệ song ngữ
    isHocCTGDCuaBo?: number, // Học CTGD của Bộ
    maLyDoThoiHoc?: number, // lý do thôi học
    isHoc2Buoi?: number, // Học 2 buổi / ngày
    kiNangSong?: number, // Kĩ năng sống
    isHoNgheo?: number, // Hộ nghèo
    isVungKhoKhan?: number, // Vùng khó khăn
    isMienHocPhi?: number, // Miễn học phí
    isGiamHocPhi?: number, // Giảm học phí
    isHoTroChiPhiHocTap?: number, // isHoTroChiPhiHocTap
    isHoTroNhaO?: number, // Hỗ trợ nhà ở
    isCapTienHangThang?: number, // Cấp tiền hàng tháng
    isCapGao?: number, // Cấp gạo
    isHocLopMG5Tuoi?: number, // Đã học mẫu giáo 5 tuổi
    isHsdtHtnn?: number, // HSDT có nhu cầu HT NN
    isHsdtTctv?: number, // HSDT có TL T.Cường TV
    isHsdtTroGiang?: number, // Học sinh DT trợ giảng
    isHocLopBanTru?: number, // Học sinh lớp bán trú
    isMoiTuyenDauCap?: number, // Mới tuyển đầu cấp
    isKhuyetTatHocHoaNhap?: number, // Khuyết tật học hòa nhập
    isKhuyetTatHocChuyenBiet?: number, // Khuyết tật học chuyên biệt
    isHocTinHoc?: number, // Học tin học
    isHsDttsRatItNguoiDuocHtht?: number, // HS DTTS rất ít người được HTHT
    isHoanThanhCTrinhTieuHoc?: number, // ht ct tiểu học
    isDuDieuKienXetTotNghiep?: number, // HS có đủ ĐK xét tốt nghiệp
    isHsTotNghiepThcs?: number, // Học sinh tốt nghiệp THCS
    isPhCoSmartphone?: number, // P.Huynh có Smartphone
    benhVeMat?: string, // bệnh về mắt
    isPhCoMayTinhInternet?: number, // P.Huynh có M.tính Internet
    ngayNhapHoc?: number, // 
    ngayChuyenDen?: number, // 
    chuyenDenTuTinh?: string, // 
    chuyenDenTuHuyen?: string, // 
    ngayXinHocLai?: number, // 
    ngayChuyenDi?: number, // 
    ngayThoiHoc?: number, // 
    lyDoThoiHoc?: string, // 
    chuyenDi?: string, // 
    isBietBoiKy1?: number, // Học sinh biết bơi kỳ I
    isBietBoiKy2?: number, // 
    thanhPhoNoiSinh?: string, // Tỉnh/TP theo HK
    quanHuyenNoiSinh?: string, // Quận/Huyện theo HK
    currentAccommodation?: string, // chỗ ở hiện nay
    aceCode?: string // mã anh chị em , mã ace
}