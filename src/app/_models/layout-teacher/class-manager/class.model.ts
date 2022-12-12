export interface ClassList {
  name: string;
  code: string;
  type: number;
  gradeId: string;
  homeroomClassId: string;
  subjectId: string;
  startDate: number;
  endDate: number;
  status: number;
  avatar: string;
  schoolYearId: string;
  schoolId: string;
  tenantId: string;
  isDeleted: number;
  attendanceRecorded: number;
  homeroomClassName: string;
  teachers: teacher[];
  numberStudent: number;
  id: string;
}


export interface teacher {
  id: string;
  fullName: string;
  avatar: string;
}
