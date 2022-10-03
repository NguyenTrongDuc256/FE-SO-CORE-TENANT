import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentStaffService {
  constructor(private http: HttpClient) { }

  getStudentList(
    pageSize: number,
    pageIndex: number,
    schoolId?: string,
    gradeId?: string,
    HomeroomClassId?: string,
    Status?: string,
    Keyword: string = ''
  ) {
    return this.http.get(
      `${environment.apiIdentityService}/api/students?PageSize=${pageSize}&PageIndex=${pageIndex}&SchoolId=${schoolId}&GradeId=${gradeId}&HomeroomClassId=${HomeroomClassId}&Status=${Status}&Keyword=${Keyword}`
    );
  }

  getStudentDataRelate() {
    return this.http.get(
      `${environment.apiIdentityService}/api/students/get-student-data-relate`
    );
  }

  getStudentPesonInfo(id: string) {
    return this.http.get(
      `${environment.apiIdentityService}/api/students/${id}`
    );
  }

  createStudent(data) {
    return this.http.post(
      `${environment.apiIdentityService}/api/students`,
      data
    );
  }

  deleteStudent(data) {
    return this.http.delete(
      `${environment.apiIdentityService}/api/students/${data.id}`
    );
  }

  updateAccessAppStatus(data) {
    return this.http.patch(
      `${environment.apiIdentityService}/api/admin-user/update-access-app-status`,
      data
    );
  }
}
