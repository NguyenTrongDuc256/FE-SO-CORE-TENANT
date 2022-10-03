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
export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REGEX_CODE = /^[a-zA-Z0-9-_]+$/;
export const REGEX_FULL_NAME = /^([0-9]*)([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s\w|\_|\-|\[|\]|\(|\)])$/;
export const REGEX_PASSWORD = /^[a-zA-Z0-9-_#?!@$%^&*]+$/;
  // /^([^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏôốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s]+)$/;
// export const REGEX_USER_NAME = /^([^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏôốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s]+)$/;
export const REGEX_USER_NAME = /^[a-zA-Z0-9-_]+$/;
export const REGEX_LINK = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
export const MAX_LENGTH_FULL_NAME = 255;
export const MAX_LENGTH_CODE = 50;
export const MAX_LENGTH_USERNAME = 50;
export const MAX_LENGTH_PASSWORD = 50;
export const MIN_LENGTH_PASSWORD = 6;

// 4. google captcha
export const GOOGLE_CAPTCHA_SITE_KEY = "6LdNXPsgAAAAANnEao1wbHB0LNLz8vD-CSsdTL4j";// site key gg captcha

// 5. layout tenant
export const LAYOUTS_TENANT = [
  { code: 'staff', name: 'Cán bộ, nhân viên', desc: 'Layout của cán bộ nhân viên của tenant' },
  { code: 'teacher', name: 'Giáo viên', desc: 'Layout của giáo viên' },
  { code: 'parent', name: 'Phụ huynh', desc: 'Layout của phụ huynh' },
  { code: 'student', name: 'Học sinh', desc: 'Layout của học sinh' },
  { code: 'tenant', name: 'Quản trị Tenant', desc: 'Layout quản trị Tenant' },
  { code: 'campus', name: 'Campus', desc: 'Layout quản lý Campus' },
]

// 6. default page size
export const PAGE_SIZE_DEFAULT = 15;
export const PAGE_INDEX_DEFAULT = 1;
export const PAGE_SIZE_OPTIONS_DEFAULT = [5, 10, 15, 20, 50];

// 7. message when call api error
export const MESSAGE_ERROR_CALL_API = "Có lỗi xảy ra trong quá trình xử lý";

// 8. khu vực
export const LOCATION = [
  { code: 'vi' },
  { code: 'en' },
  { code: 'jp' },
]

// 9. mũi giờ
export const TIMEZONE = [
  { code: 'UTC +07:00' },
]

// 10. ngôn ngữ
export const LANGUAGE = [
  { value: 'vi', label: 'vi', img: 'assets/images/png/vi.png' },
  { value: 'en', label: 'en', img: 'assets/images/png/flat-en.png' }
]

// 11. đơn vị tiền tệ
export const CURRENCY_UNIT = [
  { code: 'VND' },
  { code: 'DOLLAR' },
]

// 12. tất cả gói menu
export const USE_MENU_ALL = 1;

// 13. status user
export const STATUS_USERS = [
  { value: 0, label: 'Bị khóa' },
  { value: 1, label: 'Kích hoạt' }
]

// 14. Avatar default
export const AVATAR_DEFAULT = "https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/07/25/files/uploads/1658721291_1658721299786-Group 1000003688.png";

// 15. Training level
export const TRAINING_LEVEL = [
  { code: 5, label: 'EDUCATIONAL_STAGES_PRIMARY_SCHOOL', name: 'Trường tiểu học' },
  { code: 4, label: 'EDUCATIONAL_STAGES_SECONDARY_SCHOOL', name: 'Trường THCS' },
  { code: 3, label: 'EDUCATIONAL_STAGES_HIGH_SCHOOL', name: 'Trường THPT' },
]

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
  campus_access: 'campus_access',  //minhnc
  campus_manager: 'campus_manager', //minhnc

  // module
  module_view: 'module_view', // minhnc
  module_modify: 'module_modify', // minhnc

  //grade
  grade_manager: 'grade_manager',  //thienlv
  grade_access: 'grade_access',  //thienlv

  // school
  school_access: 'school_access',
  school_manager: 'school_manager',

  // cán bộ nhân viên
  employee_view: 'employee_view',
  employee_modify: 'employee_modify',

  // phụ huynh
  parent_view: 'parent_view',//huytb
  parent_modify: 'parent_modify',//huytb
  //học sinh
  user_code_username_modify: 'user_code_username_modify',//thienlv

  // quản lý hồ sơ học sinh
  student_file_user_view: 'student_file_user_view',
  student_file_user_modify: 'student_file_user_modify',
  student_file_user_approve: 'student_file_user_approve'
}


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
  '12': 'Thôi học trong hè'  // Thôi học trong hè
}

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
]

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
]

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
  { code: '12', label: 'studentStatus.12' } // Thôi học trong hè
]

// 21. method get code forgot password
export const METHOD_PHONE = 1;
export const METHOD_EMAIL = 2;

// 22. trạng thái
export const STATUS_ACTIVE = [
  { value: 0, label: 'Chưa kích hoạt' },
  { value: 1, label: 'Kích hoạt' }
]

// 23. loại môn học
export const TYPE_OF_SUBJECT = [
  {value: 1, code: 'SUBJECT_MOET', label: 'Môn moet'},
  {value: 2, code: 'SUBJECT_PRIVATE', label: 'Môn riêng'},
  {value: 3, code: 'SUBJECT_BILINGUAL', label: 'Môn song ngữ'},
]

// 24. layout
export const LAYOUTS = [
  { code: 'staff', name: 'Cán bộ, nhân viên', desc: 'Layout của cán bộ nhân viên của tenant' },
  { code: 'teacher', name: 'Giáo viên', desc: 'Layout của giáo viên' },
  { code: 'parent', name: 'Phụ huynh', desc: 'Layout của phụ huynh' },
  { code: 'student', name: 'Học sinh', desc: 'Layout của học sinh' },
  { code: 'tenant', name: 'Quản trị Tenant', desc: 'Layout quản trị Tenant' },
  { code: 'campus', name: 'Campus', desc: 'Layout quản lý Campus' },
  { code: 'department', name: 'Sở', desc: 'Layout sở' },
  { code: 'division', name: 'Phòng', desc: 'Layout phòng' },
  { code: 'school', name: 'Trường', desc: 'Layout trường không sử dụng SO' },
]

// 25. trạng thái hồ sơ học sinh
export const ARR_STATUS_STUDENT_RECORDS = [
  {value: 0, label: 'notApproved'},
  {value: 1, label: 'approved'},
  {value: 2, label: 'refuse'},
]

export const STATUS_STUDENT_RECORDS = {
  NOT_APPROVED: 0,
  APPROVED: 1,
  REFUSE: 2,
}

// 26. loại danh mục
export const TYPE_CATE_STUDENT_RECORDS = {
  'STUDENT': 1,
  'STAFF': 2
}

// 27. type file upload hồ sơ học sinh
export const FILE_ATTACHS_TYPE = {
  'LINK': 1, 'IMAGE': 2, 'FILE': 3
}


