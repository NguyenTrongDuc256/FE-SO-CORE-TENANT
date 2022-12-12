import { User } from "../../user.model"

export interface Course {
  avatar?: string
  name: string
  code: string
  gradeId: string
  homeroomClassId: string
  subjectId: string
  startDate?: number | ''
  endDate?: number | ''
  status?: number | ''
  schoolYearId?: string
  schoolId?: string
  tenantId?: string
  isDeleted?: number
  createdBy?: string
  updatedBy?: string
  createdAt?: number
  updatedAt?: number
  homeroomClassName?: string
  numberOfStudentInCourse?: number
  teachers?: TeacherCourse[]
  id?: string,
  gradeName?: string,
  subjectName?: string,
  statusName?: string
}

export interface TeacherCourse extends User {
  id: string
  fullName: string
  avatar: string
}

export interface StudentInCourse extends User {
  mother?: User
  father?: User
}
