import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryStudentRecordsStaffService {
  constructor(private http: HttpClient) {}

  // 1. danh sách danh mục hồ sơ học sinh
  getList(
    keyword: string,
    pageSize: number,
    pageIndex: number,
    type: number,
    isImperative: number | null,
  ) {
    if(!isImperative) {
      return this.http.get(
        `${environment.apiIdentityService}/api/file-category?PageSize=${pageSize}&PageIndex=${pageIndex}&Keyword=${keyword}&Type=${type}`
      );
    }
    return this.http.get(
      `${environment.apiIdentityService}/api/file-category?PageSize=${pageSize}&PageIndex=${pageIndex}&Keyword=${keyword}&Type=${type}&IsImperative=${isImperative}`
    );
  }
}
