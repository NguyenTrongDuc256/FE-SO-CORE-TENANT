// 1. define value attendance
export const ATTENDANCE_STATUS_NOT_YET = 0; // Chưa thiết lập
export const ATTENDANCE_STATUS_ON_TIME = 1; // Đúng giờ
export const ATTENDANCE_STATUS_LATE = 2; // Đi muộn
export const ATTENDANCE_STATUS_EXCUSED_ABSENT = 3; // Vắng có phép
export const ATTENDANCE_STATUS_UNEXCUSED_ABSENT = 4; //Vắng không phép
export const ATTENDANCE_STATUS_EXCUSED_ABSENT_SCHEDULED = 5; // Vắng có phép (có kế hoạch)
export const ATTENDANCE_STATUS_EXCUSED_ABSENT_UNSCHEDULED = 6; // Vắng có phép (đột xuất)
export const ATTENDANCE_STATUS_NOT_SCHOOL_YET = 7; //Chưa đến trường

// 2. TIME_OUT_LISTEN_FIREBASE
export const TIME_OUT_LISTEN_FIREBASE = 10000;

// 3. regex
// export const REGEX_PHONE = /^(((0|0084|\+84)(3[2|3|4|5|6|7|8|9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|7|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})|((1900|1800)([0-9]{4}))|((1900|1800)([0-9]{6}))|((02)([0-9]{9}))))$/;
export const REGEX_PHONE = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
export const REGEX_EMAIL = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
export const REGEX_CODE = /^[a-zA-Z0-9-_]+$/;
export const REGEX_FULL_NAME =
  /^([0-9]*)([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s\w|\_|\-|\[|\]|\(|\)])$/;
export const REGEX_PASSWORD = /^[a-zA-Z0-9-_#?!@$%^&*]+$/;
// export const REGEX_PASSWORD = /^([^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏôốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s]+)$/;
// export const REGEX_USER_NAME = /^([^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏôốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s]+)$/;
export const REGEX_USER_NAME = /^[a-zA-Z0-9-_]+$/;
// export const REGEX_LINK = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
export const REGEX_LINK =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const MAX_LENGTH_FULL_NAME = 255;
export const MAX_LENGTH_CODE = 50;
export const MAX_LENGTH_USERNAME = 50;
export const MAX_LENGTH_PASSWORD = 50;
export const MIN_LENGTH_PASSWORD = 6;
export const REGEX_NUMBER = /^\d+$/;
export const REGEX_NUMBER_POSITIVE = /^[1-9]\d*$/;
export const REGEX_STRING = /^[a-zA-Z0-9]+$/;

// 4. google captcha
export const GOOGLE_CAPTCHA_SITE_KEY =
  '6LdNXPsgAAAAANnEao1wbHB0LNLz8vD-CSsdTL4j'; // site key gg captcha

// 5. layout tenant
export const LAYOUTS_TENANT = [
  {
    code: 'staff',
    name: 'Cán bộ, nhân viên',
    desc: 'Layout của cán bộ nhân viên của tenant',
  },
  { code: 'teacher', name: 'Giáo viên', desc: 'Layout của giáo viên' },
  { code: 'parent', name: 'Phụ huynh', desc: 'Layout của phụ huynh' },
  { code: 'student', name: 'Học sinh', desc: 'Layout của học sinh' },
  { code: 'tenant', name: 'Quản trị Tenant', desc: 'Layout quản trị Tenant' },
  { code: 'campus', name: 'Campus', desc: 'Layout quản lý Campus' },
];

// 6. default page size
export const PAGE_SIZE_DEFAULT = 15;
export const PAGE_INDEX_DEFAULT = 1;
export const PAGE_SIZE_OPTIONS_DEFAULT = [5, 10, 15, 20, 50];

// 7. message when call api error
export const MESSAGE_ERROR_CALL_API = 'Có lỗi xảy ra trong quá trình xử lý';

// 8. khu vực
export const LOCATION = [
  { code: 'vn' },
  { code: 'en' },
  { code: 'jp' }
];

// 9. mũi giờ
export const TIMEZONE = [
  { code: 'UTC +07:00' }
];

// 10. ngôn ngữ
export const LANGUAGE = [
  { value: 'vi', label: 'vi', img: 'assets/images/png/vi.png' },
  { value: 'en', label: 'en', img: 'assets/images/png/flat-en.png' },
  { value: 'jp', label: 'jp', img: 'assets/images/png/ja.png' },
];

// 11. đơn vị tiền tệ
export const CURRENCY_UNIT = [
  { code: 'VND' },
  { code: 'DOLLAR' }
];

// 12. tất cả gói menu
export const USE_MENU_ALL = 1;

// 13. status user
export const STATUS_USERS = [
  { value: 0, label: 'locked' },
  { value: 1, label: 'activated' },
];

// 14. Avatar default
export const AVATAR_DEFAULT =
  'https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/07/25/files/uploads/1658721291_1658721299786-Group 1000003688.png';
export const LOGO_DEFAULT = "assets/images/svg/img-default/logo-default.svg";
export const FAVICON_DEFAULT = "assets/images/svg/img-default/favicon-default.svg";
export const BACKGROUND_LOGIN_DEFAULT = "assets/images/svg/img-default/background-login-default.svg";
// 15. Training level
export const TRAINING_LEVEL = [
  {
    code: 5,
    label: 'EDUCATIONAL_STAGES_PRIMARY_SCHOOL',
    name: 'primarySchool',
  },
  {
    code: 4,
    label: 'EDUCATIONAL_STAGES_SECONDARY_SCHOOL',
    name: 'secondarySchool',
  },
  { code: 3, label: 'EDUCATIONAL_STAGES_HIGH_SCHOOL', name: 'highSchool' },
];

// 16. Permission
export const DATA_PERMISSION = {
  // role
  role_view: 'role_view',
  role_modify: 'role_modify',

  // Người dùng
  user_modify: 'user_modify', // minhnc
  user_view: 'user_view', //minhnc

  omt_access: 'omt_access', //duynq
  omt_manager: 'omt_manager', //duynq

  // Thông tư
  circulars_access: 'circulars_access', // minhnc
  circulars_manager: 'circulars_manager', // minhnc

  // Năm học
  school_year_access: 'school_year_access', // minhnc
  school_year_manager: 'school_year_manager', // minhnc

  moet_access: 'moet_access', //duynq
  moet_manager: 'moet_manager', //duynq
  tenant_manager: 'tenant_manager', //duynq
  tenant_access: 'tenant_access', //duynq

  //Môn học
  subject_access: 'subject_access', //thienlv    //Xem thông tin quản lý môn học
  subject_manager: 'subject_manager', //thienlv  //Thêm, sửa, xóa môn học

  student_view: 'student_view', //duynq
  student_modify: 'student_modify', //duynq

  // campus
  campus_access: 'campus_access', //minhnc
  campus_manager: 'campus_manager', //minhnc

  // module
  module_view: 'module_view', // minhnc
  module_modify: 'module_modify', // minhnc

  //grade
  grade_manager: 'grade_manager', //thienlv
  grade_access: 'grade_access', //thienlv

  // school
  school_access: 'school_access',
  school_manager: 'school_manager',

  // cán bộ nhân viên
  employee_view: 'employee_view',
  employee_modify: 'employee_modify',
  employee_import: 'employee_import',

  // phụ huynh
  parent_view: 'parent_view', //huytb
  parent_modify: 'parent_modify', //huytb
  //học sinh
  user_code_username_modify: 'user_code_username_modify', //thienlv

  // quản lý hồ sơ học sinh
  student_file_user_view: 'student_file_user_view',
  student_file_user_modify: 'student_file_user_modify',
  student_file_user_approve: 'student_file_user_approve',

  // Quản lý toà nhà
  classroom_building_access: 'classroom_building_access', //ducnt xem danh sách
  classroom_building_manager: 'classroom_building_manager',

  // Quản lý phòng học
  classroom_access: 'classroom_access', //ducnt
  classroom_manager: 'classroom_manager',

  // lớp chủ nhiệm
  homeroom_class_access: 'homeroom_class_access',
  homeroom_class_manager: 'homeroom_class_manager',

  // Danh sách danh mục
  file_category_view: 'file_category_view',
  file_category_modify: 'file_category_modify',

  // cấu hình chung
  tenant_show: 'tenant_show',
  tenant_update: 'tenant_update',

  // cấu hình chung
  announcement_view: 'announcement_view',
  announcement_modify: 'announcement_modify',
  announcement_school_manager: 'announcement_school_manager',
  announcement_sending_scope_config: 'announcement_sending_scope_config',
  tenant_login_config: 'tenant_login_config',

  // Quản lý tiết học
  timetable_period_access: 'timetable_period_access',
  timetable_period_manager: 'timetable_period_manager',

  //đơn xin nghỉ
  absent_manager: 'absent_manager',
  absent_access: 'absent_access',
  absent_parent_access: 'absent_parent_access',
  absent_parent_manager: 'absent_parent_manager',

  // môn học khối
  subject_grade_access: 'subject_grade_access',
  subject_grade_manager: 'subject_grade_manager',

  //danh sách lớp
  course_access: 'course_access',
  course_manager: 'course_manager',

  // cấu hình tenant
  tenant_config: 'tenant_config',

  // menu package
  menu_package_access: 'menu_package_access',
  menu_package_manager: 'menu_package_manager',

  // cấu hình điểm hành vi
  behavior_manager: 'behavior_manager',
  behavior_grading: 'behavior_grading',

  // phân công giáo viên
  school_data_declaration_assignment: 'school_data_declaration_assignment'

};

// 17. Trạng thái học sinh
export const STUDENT_STATUS = {
  '01': 'Đang học', // đang học
  '02': 'Chuyển đến kỳ 1', // Chuyển đến kỳ 1
  '03': 'Nghỉ học xin học lại kỳ 1', // Nghỉ học xin học lại kỳ 1
  '04': 'Chuyển đi kỳ 1', // Chuyển đi kỳ 1
  '05': 'Thôi học kỳ 1', // Thôi học kỳ 1
  '06': 'Chuyển đến kỳ 2', // Chuyển đến kỳ 2
  '07': 'Nghỉ học xin học lại kỳ 2', // Nghỉ học xin học lại kỳ 2
  '08': 'Chuyển đi kỳ 2', // Chuyển đi kỳ 2
  '09': 'Thôi học kỳ 209', // Thôi học kỳ 2
  '10': 'Chuyển đến trong hè', // Chuyển đến trong hè
  '11': 'Chuyển đi trong hè', // Chuyển đi trong hè
  '12': 'Thôi học trong hè', // Thôi học trong hè
};

// 18. Trạng thái năm học
export const SCHOOL_YEAR_SATUS = [
  {
    id: 0,
    name: 'Đã kết thúc',
  },
  {
    id: 1,
    name: 'Hiện tại',
  },
  {
    id: 2,
    name: 'Sắp diễn ra',
  },
];

// 19. Giới tính
export const GENDER = [
  {
    id: 1,
    name: 'genderName.male',
  },
  {
    id: 2,
    name: 'genderName.female',
  },
  {
    id: 3,
    name: 'genderName.other',
  },
];

// 20. Trạng thái học sinh array
export const STUDENT_STATUS_SELECT = [
  { code: '01', label: 'studentStatus.01' }, // Đang học
  { code: '02', label: 'studentStatus.02' }, // Chuyển đến kỳ 1
  { code: '03', label: 'studentStatus.03' }, // Nghỉ học xin học lại kỳ 1
  { code: '04', label: 'studentStatus.04' }, // Chuyển đi kỳ 1
  { code: '05', label: 'studentStatus.05' }, // Thôi học kỳ 1
  { code: '06', label: 'studentStatus.06' }, // Chuyển đến kỳ 2
  { code: '07', label: 'studentStatus.07' }, // Nghỉ học xin học lại kỳ 2
  { code: '08', label: 'studentStatus.08' }, // Chuyển đi kỳ 2
  { code: '09', label: 'studentStatus.09' }, // Thôi học kỳ 209
  { code: '10', label: 'studentStatus.10' }, // Chuyển đến trong hè
  { code: '11', label: 'studentStatus.11' }, // Chuyển đi trong hè
  { code: '12', label: 'studentStatus.12' }, // Thôi học trong hè
];

// 21. method get code forgot password
export const METHOD_PHONE = 1;
export const METHOD_EMAIL = 2;

// 22. trạng thái
export const STATUS_ACTIVE = [
  { value: 0, label: 'notActivated' },
  { value: 1, label: 'activated' },
];

export const STATUS_ACTIVE_LOCKED = [
  { value: 0, label: 'locked' },
  { value: 1, label: 'activated' },
];

// 23. loại môn học
export const ARR_TYPE_OF_SUBJECT = [
  { value: 1, code: 'SUBJECT_MOET', label: 'subjectMoet' },
  { value: 2, code: 'SUBJECT_PRIVATE', label: 'subjectPrivate' },
  { value: 3, code: 'SUBJECT_BILINGUAL', label: 'subjectBilingual' },
];

export enum OBJ_TYPE_OF_SUBJECT { SUBJECT_MOET = 1, SUBJECT_PRIVATE = 2, SUBJECT_BILINGUAL = 3 }

// 24. layout
export const LAYOUTS = [
  {
    code: 'staff',
    name: 'Cán bộ, nhân viên',
    desc: 'Layout của cán bộ nhân viên của tenant',
  },
  { code: 'teacher', name: 'Giáo viên', desc: 'Layout của giáo viên' },
  { code: 'parent', name: 'Phụ huynh', desc: 'Layout của phụ huynh' },
  { code: 'student', name: 'Học sinh', desc: 'Layout của học sinh' },
  { code: 'tenant', name: 'Quản trị Tenant', desc: 'Layout quản trị Tenant' },
  { code: 'campus', name: 'Campus', desc: 'Layout quản lý Campus' },
  { code: 'department', name: 'Sở', desc: 'Layout sở' },
  { code: 'division', name: 'Phòng', desc: 'Layout phòng' },
  { code: 'school', name: 'Trường', desc: 'Layout trường không sử dụng SO' },
];
export enum LAYOUTS_CODE {
  OMT = 'omt',
  TENANT = 'tenant',
  STAFF = 'staff',
  TEACHER = 'teacher',
  PARENT = 'parent',
  STUDENT = 'student',
  CAMPUS = 'campus',
  DEPARTMENT = 'department',
  DIVISION = 'division',
  SCHOOL = 'school'
}
// 25. trạng thái hồ sơ học sinh
export const ARR_STATUS_STUDENT_RECORDS = [
  { value: 0, label: 'notApproved' },
  { value: 1, label: 'approved' },
  { value: 2, label: 'refuse' },
];

export const STATUS_STUDENT_RECORDS = {
  NOT_APPROVED: 0,
  APPROVED: 1,
  REFUSE: 2,
};

// 26. loại danh mục
export const TYPE_CATE_STUDENT_RECORDS = {
  STUDENT: 1,
  STAFF: 2,
};

// 27. type file upload hồ sơ học sinh
export const FILE_ATTACHS_TYPE = {
  LINK: 1,
  IMAGE: 2,
  FILE: 3,
};

// 28. trạng thái của import file
export const ARR_STATUS_IMPORT_FILE = [
  { value: '', label: 'allRecords' },
  { value: 0, label: 'errorLog' },
  { value: 1, label: 'validRecord' },
];

// 29. thông tin nâng cao của trường học
export const INFO_ADVANCED_SCHOOL = [
  { key: 'IsCoChiBoDang', label: 'IsCoChiBoDang', value: '0' },
  { key: 'IsTruongQuocTe', label: 'IsTruongQuocTe', value: '0' },
  { key: 'IsVungDacBietKhoKhan', label: 'IsVungDacBietKhoKhan', value: '0' },
  { key: 'IsHocSinhNoiTru', label: 'IsHocSinhNoiTru', value: '0' },
  { key: 'IsSuDungMayTinhDayHoc', label: 'IsSuDungMayTinhDayHoc', value: '0' },
  {
    key: 'IsCongTacTuVanHocDuong',
    label: 'IsCongTacTuVanHocDuong',
    value: '0',
  },
  {
    key: 'IsKhaiThacInternetDayHoc',
    label: 'IsKhaiThacInternetDayHoc',
    value: '0',
  },
  { key: 'IsDienLuoi', label: 'IsDienLuoi', value: '0' },
  { key: 'IsKhiHauThienTai', label: 'IsKhiHauThienTai', value: '0' },
  { key: 'IsNguonNuocSach', label: 'IsNguonNuocSach', value: '0' },
  { key: 'IsCongTrinhVeSinh', label: 'IsCongTrinhVeSinh', value: '0' },
  { key: 'IsHocSinhKhuyetTat', label: 'IsHocSinhKhuyetTat', value: '0' },
  { key: 'IsCtGdvsDoiTay', label: 'IsCtGdvsDoiTay', value: '0' },
  {
    key: 'IsChuongTrinhGiaoDucCoBan',
    label: 'IsChuongTrinhGiaoDucCoBan',
    value: '0',
  },
  { key: 'IsHocSinhBanTru', label: 'IsHocSinhBanTru', value: '0' },
  {
    key: 'IsCoHaTangTlhtPhuHopHskt',
    label: 'IsCoHaTangTlhtPhuHopHskt',
    value: '0',
  },
  {
    key: 'IsDatChatLuongToiThieu',
    label: 'IsDatChatLuongToiThieu',
    value: '0',
  },
  { key: 'IsKyNangSongGDXG', label: 'IsKyNangSongGDXG', value: '0' },
  { key: 'IsChuyenBietKhuyetTat', label: 'IsChuyenBietKhuyetTat', value: '0' },
  {
    key: 'IsHocChuongTrinhSongNgu',
    label: 'IsHocChuongTrinhSongNgu',
    value: '0',
  },
  { key: 'IsTruongPtDtBanTru', label: 'IsTruongPtDtBanTru', value: '0' },
  { key: 'IsActive', label: 'IsActive', value: '0' },
];

// 30. thông tin khác của lớp chủ nhiệm
export const INFO_OTHER_HOMEROOM_CLASS = [
  { key: 'IsVNEN', label: 'IsVNEN', value: '0' },
  { key: 'IsGiaiThe', label: 'IsGiaiThe', value: '0' },
  { key: 'IsTBDHTiengViet', label: 'IsTBDHTiengViet', value: '0' },
  { key: 'IsBanTru', label: 'IsBanTru', value: '0' },
  { key: 'IsBilingual', label: 'IsSongNgu', value: '0' },
  { key: 'IsTBDHToan', label: 'IsTBDHToan', value: '0' },
  { key: 'IsBoTucTieuHoc', label: 'IsBoTucTieuHoc', value: '0' },
  // { key: 'IsActive', label: 'IsActive', value: '0' },
  { key: 'IsDaiDienChaMeLop', label: 'IsDaiDienChaMeLop', value: '0' },
  { key: 'IsCapNhatLopGhep', label: 'IsCapNhatLopGhep', value: '0' },
  { key: 'IsHocNghe', label: 'IsHocNghe', value: '0' },
  { key: 'IsDaiDienChaMeTruong', label: 'IsDaiDienChaMeTruong', value: '0' },
  { key: 'Is2BuoiNgay', label: 'Is2BuoiNgay', value: '0' },
  { key: 'IsChuyenBiet', label: 'IsChuyenBiet', value: '0' },
];

// 31. status notification
export const STATUS_NOTIFICATION = [
  { value: 0, label: 'unsent' },
  { value: 1, label: 'sent' },
];
export enum STATUS_NOTIFICATION_ENUM { SENT = 1, UNSENT = 0 }

// 32. SCOPE_NOTIFICATION
export const SCOPE_NOTIFICATION = [
  { value: 1, label: 'allSystem' },
  { value: 2, label: 'Campus' },
  { value: 3, label: 'school' },
  { value: 4, label: 'grade' },
  { value: 5, label: 'homeroomClass' },
  { value: 6, label: 'class' },
  { value: 7, label: 'account' },
];

// 33. NOTIFICATION_RECIPIENT_GROUP
export const NOTIFICATION_RECIPIENT_GROUP = [
  { value: 1, label: 'student' },
  { value: 2, label: 'parent' },
  { value: 3, label: 'homeroomTeacher' },
  { value: 4, label: 'subjectTeacher' },
  { value: 5, label: 'staff' },
  { value: 6, label: 'classLeader' },
  { value: 7, label: 'parentLeader' },
];
// 34. Thông tin tiết học MOET
export const INFO_MOET_PERIOD = [
  { key: 1, label: 'Sáng Tiết 1' },
  { key: 2, label: 'Sáng Tiết 2' },
  { key: 3, label: 'Sáng Tiết 3' },
  { key: 4, label: 'Sáng Tiết 4' },
  { key: 5, label: 'Sáng Tiết 5' },
  { key: 6, label: 'Chiều Tiết 6' },
  { key: 7, label: 'Chiều Tiết 7' },
  { key: 8, label: 'Chiều Tiết 8' },
  { key: 9, label: 'Chiều Tiết 9' },
  { key: 10, label: 'Chiều Tiết 10' },
];

// 35. kiểu lớp chủ nhiệm
export const TYPE_HOMEROOM_CLASS = [
  { value: 0, label: 'typeHomeroomClass0' },
  { value: 1, label: 'typeHomeroomClass1' },
];

// 36. kiểu chấm điểm
export const GRADING_TYPE = [
  { value: 1, label: 'gradeByNumber' },
  { value: 2, label: 'gradeByText' },
];


// 33. Trạng thái điểm danh
export const STATUS_ATTENDANCE: { key: string, value: number, name: string }[] = [
  { key: 'ATTENDANCE_STATUS_NOT_YET', value: 0, name: 'Không xác định' },
  { key: 'ATTENDANCE_STATUS_ON_TIME', value: 1, name: 'Đúng giờ' },
  { key: 'ATTENDANCE_STATUS_LATE', value: 2, name: 'Muộn' },
  { key: 'ATTENDACE_STATUS_EXCUSED_ABSENT', value: 3, name: 'Vắng có phép' },
  { key: 'ATTENDACE_STATUS_UNEXCUSED_ABSENT', value: 4, name: 'Vắng không phép' },
  { key: 'ATTENDACE_STATUS_EXCUSED_ABSENT_SCHEDULED', value: 5, name: 'Vắng có phép (Có kế hoạch)' },
  { key: 'ATTENDACE_STATUS_EXCUSED_ABSENT_UNSCHEDULED', value: 6, name: 'Vắng có phép (Không kế hoạch)' },
  { key: 'ATTENDACE_STATUS_NOT_SCHOOL_YET', value: 7, name: 'Chưa đến trường' }
]

// 37. trạng thái lớp bộ môn
export const STATUS_COURSE = [
  { value: 0, label: 'cancelClass' },
  { value: 1, label: 'underConstruction' },
  { value: 2, label: 'studying' },
  { value: 3, label: 'finishedCourse' },
  { value: 4, label: 'pause' },
]


// 38. trạng thái lớp bộ môn
export const RESET_TIME_NUNBER_TYPE = [
  { value: 0, label: 'Không đặt lại' },
  { value: 1, label: 'Ngày' },
  { value: 2, label: 'Tuần' },
  { value: 3, label: 'Tháng' }
]

// 40. kiểu lớp học
export const CLASS_TYPE = [
  { key: 1, title: 'subjectClass', label: 'classlist.subjectTeacher', urlIcon: 'assets/images/svg/icon_lop_bo_mon.svg' },
  { key: 2, title: 'homeroomClass', label: 'classlist.homeroomTeacher', urlIcon: 'assets/images/svg/icon_lop_chu_nhiem.svg' },
];

// 41. Trạng thái điểm danh
export const ATTENDANCE_RECORDED = [
  { key: 0, label: 'noAttendance' },
  { key: 1, label: 'attended' },
];

// 42. Loại điểm hành vi
export const BEHAVIOR_SCORE_TYPE = [
  { key: 1, value: 'behavior.title.plusMark' },
  { key: 2, value: 'behavior.title.minusMark' },
]

// 43. Loại đối tượng chấm điểm hành vi
export const BEHAVIOR_SCORE_OBJECT_TYPE = [
  { key: 1, label: 'student' },
  { key: 2, label: 'teacher' },
  { key: 3, label: 'homeroomClass' },
];

//44. Loại cấu hình đặt lại số lần chấm điểm

export const BEHAVIOR_RESET_TIME_NUMBER_TYPE= [
  { key: 0, label: 'kỳ'}, // cấu hình không đặt lại số lần chấm điểm
  { key: 1, label: 'ngày'},
  { key: 2, label: 'tuần'},
  { key: 3, label: 'tháng'},
];
