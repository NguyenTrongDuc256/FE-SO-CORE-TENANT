// 1. Học sinh
export interface Student {
  id: string,
  fullName: string,
  code: string,
  username: string,
  gender: number,
  avatar: string,
  totalPoint: number,
  isWarningPoint: number
}

// 2. interface của API lấy thông tin học sinh
export interface StudentInfoAPI {
  id: string,
  fullName: string,
  code: string,
  username: string,
  gender: number,
  totalPoint: number,
  resetTimeNumberType: number
}

// 3. Khối
export interface Grade {
  id: string,
  name: string,
  code: string
}

// 4. Lớp chủ nhiệm
export interface HomeroomClass {
  id: string,
  name: string,
  code: string
}

// 5. Lớp môn học
export interface Course {
  id: string,
  name: string,
  code: string
}

// 6. danh sách danh mục
export interface BehaviorCategories {
  id: string,
  name: string,
}

// 7. danh sách tiêu chí
export interface Behavior {
  id: string,
  name: string,
  code: string,
  avatar: string,
}

//8. cham diem 1 học sinh lop chu nhiem
export interface FormInputScoreStudentHomeroomClass {
  homeroomClassId: string,
  userId: string,
  date: number,
  type: 1 | 2,
  behaviors: { behaviorId: string, number: number, comment: string }[]
}

//9. cham diem nhieu hs lop CN
export interface FormInputScoreManyStudentHomeroomClass {
  homeroomClassId: string,
  behaviorId: string,
  date: number,
  studentBehaviors: { userId: string, comment: string }[]
}

//10. cham diem 1 học sinh lop chu nhiem
export interface FormInputScoreStudentCourse {
  courseId: string,
  userId: string,
  date: number,
  type: 1 | 2,
  behaviors: { behaviorId: string, number: number, comment: string }[]
}

//11. cham diem nhieu hs lop CN
export interface FormInputScoreManyStudentCourse {
  courseId: string,
  behaviorId: string,
  date: number,
  studentBehaviors: { userId: string, comment: string }[]
}

//4. Lịch sử chấm 1 học sinh trong lớp chủ nhiệm
export interface HistoryOneStudent {
  pointDetail: {
    totalPoint: number,
    initialPoint: number,
    plusPoint: number,
    minusPoint: number
  },
  histories: Histories[]
}

// 5. Lịch sử chấm tất cả học sinh lớp chủ nhiệm
export interface HistoryAllStudent {
  student: {
    id: string,
    fullName: string,
    code: string,
    avatar: string
  },
  behaviorLog: Histories
}

// 6. chi tiết lịch sử chấm 1 học sinh
export interface Histories {
  id: string,
  behaviorCategoryId: string,
  behaviorCategoryName: string,
  behaviorCategoryAvatar: string,
  behaviorId: string,
  behaviorName: string,
  behaviorType: number,
  point: number,
  comment: string,
  time: number,
  isApplyTimeNumber: number,
  timeNumber: number,
  isCancelled: number,
  canCancel: number,
  createdBy: {
    id?: string,
    fullName: string,
    code: string
  }
}
