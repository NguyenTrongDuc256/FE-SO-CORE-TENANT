import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentRecordsTeacherService {
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

  // 6. danh sách học sinh
  getListStudent(classId: string, keyword: string, pageSize: number, pageIndex: number) {
    return this.http.get(
      `${environment.apiIdentityService}/api/file-user/get-list-student?PageSize=${pageSize}&PageIndex=${pageIndex}&Keyword=${keyword}&HomeroomClassId=${classId}`
    );
  }

  // 7. danh sach lop
  getListClasses(keyword: string, pageSize: number, pageIndex: number) {
    return this.http.get(
      `${environment.apiIdentityService}/api/file-user/get-list-class?PageSize=${pageSize}&PageIndex=${pageIndex}&Keyword=${keyword}`
    );
  }

  // 8. danh sách phê duyệt hồ sơ học sinh
  getListRecordsApprove(
    keyword: string,
    homeroomClassId: string,
    approveStatus: string,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get(
      `${environment.apiIdentityService}/api/file-user/get-list-file-user?PageSize=${pageSize}&PageIndex=${pageIndex}&Keyword=${keyword}&HomeroomClassId=${homeroomClassId}&ApproveStatus=${approveStatus}`
    );
  }
}
