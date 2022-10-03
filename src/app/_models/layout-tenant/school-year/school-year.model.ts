export interface gradeCirculars {
  gradeId: string,
  circularsId: string,
}

export interface Terms {
  index: number,
  name: string,
  startDate: number,
  endDate: number,
  isPublishReport: number,
  isCurrent: number,
}

export interface TermCreate {
  index: number,
  name: string,
  startDate: number,
  endDate: number,
  isPublishReport: number,
  isCurrent: number
}

// BEGIN: interface list
export interface SchoolYearList {
  id: string,
  tenantId: string,
  name: string,
  code: string,
  startDate: number,
  endDate: number,
  isLockGradebookInput: 0 | 1,
  status: 0 | 1 | 2
  terms: Terms[],
  gradeCirculars: gradeCirculars[]
}

// END: interface list

// BEGIN: interface create
export interface SchoolYearCreate {
  name: string,
  code: string,
  startDate: number,
  endDate: number,
  isLockGradebookInput: number,
  status: number
  gradeCirculars: gradeCirculars[],
  terms: TermCreate[],
}
// END: interface create
export interface SchoolYearUpdate {
  name: string,
  startDate: number,
  endDate: number,
  isLockGradebookInput: number,
  status: number
  gradeCirculars: gradeCirculars[],
  terms: TermCreate[],
}

