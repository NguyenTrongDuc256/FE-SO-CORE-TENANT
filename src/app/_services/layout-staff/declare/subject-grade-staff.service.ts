import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjectGradeStaffService {
  tenantId = JSON.parse(localStorage.getItem('Tenant')).Id;

  constructor(private http: HttpClient) {}

  // 1. danh sách môn học khối
  getList(
    subjectType: number | string,
    keyword: string,
    isActive: number | string,
    gradeId: string,
    pageIndex: number,
    pageSize: number,
    reportTypeId: string,
    isSyncMoet: number| string
  ) {
    let headers = new HttpHeaders().set('gradeId', gradeId);
    return this.http.get(
      `${environment.apiStaff}/api/subject-grade?pageSize=${pageSize}&pageIndex=${pageIndex}&keyWord=${keyword}&isActive=${isActive}&subjectType=${subjectType}&reportTypeId=${reportTypeId}&isSyncMoet=${isSyncMoet}`,
      {headers: headers}
    );
  }
  // 2. thêm môn học khối
  create(data: any, gradeId: string) {
    let headers = new HttpHeaders().set('gradeId', gradeId);
    return this.http.post(
      `${environment.apiStaff}/api/subject-grade`,
      data, {headers: headers}
    );
  }
  // 3. sửa môn học khối
  update(id: string, data: any, gradeId: string) {
    let headers = new HttpHeaders().set('gradeId', gradeId);
    return this.http.patch(
      `${environment.apiStaff}/api/subject-grade/${id}`,
      data, {headers: headers}
    );
  }
  // 4. xóa môn học khối
  delete(data: { id: string, gradeId: string }) {
    let headers = new HttpHeaders().set('gradeId', data.gradeId);
    return this.http.delete(`${environment.apiStaff}/api/subject-grade/${data.id}`, {headers: headers});
  }
  // 5. danh sách sổ điểm
  getListReportType() {
    return this.http.get(
      `${environment.apiStaff}/api/subject-grade/report-types`,
    );
  }
  // 6. danh sách môn để thêm
  getListSubjectToCreate(pageSize: number, pageIndex: number, gradeId: string, subjectType: number | '') {
    let headers = new HttpHeaders().set('gradeId', gradeId);
    return this.http.get(
      `${environment.apiStaff}/api/subject-grade/create?pageSize=${pageSize}&pageIndex=${pageIndex}&subjectType=${subjectType}`, {headers: headers},
    );
  }
  // 7. danh sách môn để cập nhật
  getListSubjectUpdate(gradeId: string) {
    let headers = new HttpHeaders().set('gradeId', gradeId);
    return this.http.get(
      `${environment.apiStaff}/api/subject-grade/get-moet-subject`,{headers: headers}
    );
  }
}
