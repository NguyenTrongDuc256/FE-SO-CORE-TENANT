import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  // 1. danh sách hồ sơ học sinh của một học sinh
  getListRecordsOfStudent(
    studentId: string,
    keyword: string,
    pageSize: number,
    pageIndex: number
  ) {
    return this.http.get(
      `${environment.apiIdentityService}/api/file-user/parent-student/get-student-file-user?StudentUserId=${studentId}&PageSize=${pageSize}&PageIndex=${pageIndex}&Keyword=${keyword}`
    );
  }
}
