export interface SubjectListStaff {
  id: string,
  code: string,
  educationalStages: Array<number>;
  isActive: number,
  name: string,
  subjectType: number,
  tenantId: string,
  indexOrder: number
}

export interface Subject {
  id?: string,
  name: string,
  code: string,
  subjectType: number,
  subjectTypeName?: string,
}
