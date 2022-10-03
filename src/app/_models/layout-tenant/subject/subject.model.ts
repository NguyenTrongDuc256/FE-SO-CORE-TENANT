export interface SubjectList {
    id: string,
    code: string,
    educationalStages: Array<number>;
    gradeType: string,
    isActive: number,
    name: string,
    subjectType: number,
    tenantId: string,
    moetCode: string,
    indexOrder: number
}

export interface Subject {
  id?: string,
  name: string,
  code: string,
  subjectType: number,
  subjectTypeName?: string,
}
