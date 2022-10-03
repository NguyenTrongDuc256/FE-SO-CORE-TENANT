import {StudentList} from "./student.model";

export interface ParentList {
  avatar?: string,
  id: string,
  childrens: Children[],
  fullName: string,
  code: string,
  username: string,
  gender: number,
  email: string,
  phone: string,
  genderName: string,
  isAccessApp: number,
}

export interface Children {
  avatar?: string,
  code: string,
  email: string,
  fullname: string,
  phone: string,
  studentId: string,
  childrens: StudentList[],
  studentUserId: string,
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


