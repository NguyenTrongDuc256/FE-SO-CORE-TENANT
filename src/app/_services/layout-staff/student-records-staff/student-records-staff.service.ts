import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentRecordsStaffService {
  constructor(private http: HttpClient) {}

  // 1. danh sách hồ sơ học sinh của một học sinh
  getListRecordsOfStudent(
    studentId: string,
    keyword: string,
    fileCategoryId: string,
    approveStatus: string,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get(
      `${environment.apiIdentityService}/api/file-user/get-student-file-user?StudentUserId=${studentId}&PageSize=${pageSize}&PageIndex=${pageIndex}&Keyword=${keyword}&FileCategoryId=${fileCategoryId}&ApproveStatus=${approveStatus}`
    );
  }
  // 2. thêm hồ sơ học sinh
  create(data: any) {
    return this.http.post(
      `${environment.apiIdentityService}/api/file-user`,
      data
    );
  }
  // 3. sửa hồ sơ học sinh
  update(id: string, data: any) {
    return this.http.patch(
      `${environment.apiIdentityService}/api/file-user/${id}`,
      data
    );
  }
  // 4. thay đổi trạng thái hồ sơ học sinh
  changeStatusRecords(id: string, data: any) {
    return this.http.patch(
      `${environment.apiIdentityService}/api/file-user/${id}/change-approve-status`,
      data
    );
  }
  changeStatusImportRecords(id: string, data: any) {
    return this.http.patch(
      `${environment.apiIdentityService}/api/file-user/${id}/change-status-important`,
      data
    );
  }
  // 5. xóa hồ sơ học sinh
  deleteRecords(id: string) {
    return this.http.delete(
      `${environment.apiIdentityService}/api/file-user/${id}`
    );
  }

  // 6. danh sách hồ sơ học sinh
  getListStudentOfRecords(
    homeroomClassId: string,
    keyword: string,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get(
      `${environment.apiIdentityService}/api/file-user/get-list-student?homeroomClassId=${homeroomClassId}&keyword=${keyword}&PageSize=${pageSize}&PageIndex=${pageIndex}`
    );
  }

  // 7. upload file danh sách hồ sơ học sinh
  uploadFileProfileStudent(file) {
    return this.http.post(`${environment.apiIdentityService}/api/file-user/upload-file-user`, file);
  }


  // 8. Danh sách lớp chủ nhiệm
  getListClass() {
    return this.http.get(`${environment.apiStaff}/api/homeroom-class`);
  }

  // 9. Danh sách phê duyệt học của trường
  getListStudentOfRecordsApprove(
    homeroomClassId: string,
    keyword: string,
    approveStatus: string,
    pageSize: number,
    pageIndex: number) {
    return this.http.get(`${environment.apiIdentityService}/api/file-user/get-list-file-user?approveStatus=${approveStatus}&homeroomClassId=${homeroomClassId}&keyword=${keyword}&PageSize=${pageSize}&PageIndex=${pageIndex}`);
  }


  // 10. Danh sách dữ liệu result
  getListResultImportFile(
    sessionId: string,
    keyword: string,
    status: number|'',
    pageSize: number,
    pageIndex: number) {
    return this.http.get(`${environment.apiIdentityService}/api/file-user/get-upload-temp?sessionId=${sessionId}&status=${status}&keyword=${keyword}&PageSize=${pageSize}&PageIndex=${pageIndex}`);
  }

  // 10. Danh sách dữ liệu result
  saveListResultImportFile(data) {
    return this.http.post(`${environment.apiIdentityService}/api/file-user/confirm-upload`, data);
  }


}
