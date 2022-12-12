
export interface StudentAndDataAttendance{
  id: string,
  logo: string,
  name: string,
  teacherName: string,
  dateAttendance: string,
  status: number,
  students: StudentAttendanceList[]
}

export interface StudentAttendanceList {
  id: string,
  avatarHanet: string,
  avatar: string,
  name: string,
  code: string,
  gender: number,
  status: number,
  attendanceBy: string,
  attendanceTime: string,
  note: string,
  mealNote: string,
  attachedFiles: string

}

export interface ConfigHomeroomClassAttendance {
  attendanceConfigurations: AttendanceStatusList[],
  defaultAttendanceStatus: number,
  isUseHanet: number,
  numberOfDatesAllowForReAttendance: number,
  tenantId: string
}

interface AttendanceStatusList {
  code: number,
  name: string
}

export interface SaveHomeroomClassAttendance {
  id: string,
  date : string,
  student : DataStudentAttendance[]
}

export interface DataStudentAttendance {
  id : string,
  status: number,
  note: string,
  mealNote: string
}
