
export interface Student {
  studentId?: string,
  studentUserId: string,
  avatar?: string,
  fullName: string,
  code: string,
  className: string,
  classId: number,
  gradeName: string,
  gradeId: number,
  birthday: number,
  gender: number,
  genderName: string,
  countFileUser: number,
  countFileUserImperative: number,
}



export interface ParentStore {
  studentsUserId: [],
  relation: number,
  code: string,
  fullName: string,
  username: string,
  password: string,
  email: string,
  phone: string,
  birthday: number,
  note: '',
  avatar: string,
  gender: number,
  isActive: number,
  isAccessApp: number
}

export interface ParentEdit {
  studentsUserId: string[],
  fullName: string,
  email: string,
  phone: string,
  birthday: number,
  note: '',
  avatar: string,
  gender: number,
  isActive: number,
  isAccessApp: number
  relation: number
}

export interface ParentInfo {
  id: string,
  avatar: string,
  name: string,
  code: string,
  username: string,
  gender: number,
  email: string,
  phone: string,
  birthday: number,
  isAccessApp: number,
  isActive: number
}


