import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentList(pageSize: number, pageIndex: number, schoolId?: string, gradeId?: string, HomeroomClassId?: string, Status?: string, Keyword: string = '') {
    return this.http.get(
      `${environment.apiIdentityService}/api/admin-students?PageSize=${pageSize}&PageIndex=${pageIndex}&SchoolId=${schoolId}&GradeId=${gradeId}&HomeroomClassId=${HomeroomClassId}&Status=${Status}&Keyword=${Keyword}`
    );
  }

  getStudentDataRelate() {
    return this.http.get(`${environment.apiIdentityService}/api/admin-students/get-student-data-relate`);
  }

  getStudentPesonInfo(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-students/${id}`);
  }

  createStudent(data) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-students`, data);
  }


  updateStudent(data) {
    return this.http.patch(`${environment.apiIdentityService}/api/admin-students/${data.studentId}`, data);
  }

  deleteStudent(data) {
    return this.http.delete(`${environment.apiIdentityService}/api/admin-students/${data.id}`);
  }

  updateAccessAppStatus(data) {
    return this.http.patch(`${environment.apiIdentityService}/api/admin-user/update-access-app-status`, data);
  }

  // upload file import học sinh
  uploadFileImportStudent(data) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-students/upload-students`, data);
  }

  // Danh sách dữ liệu import
  getListResultImportFile(
    keyImport: string,
  ) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-students/get-upload-temp?keyImport=${keyImport}`);
  }

  // lưu data import
  saveListResultImportFile(data) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-students/confirm-upload`, data);
  }

}
