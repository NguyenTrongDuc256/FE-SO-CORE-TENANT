import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  tenantId = localStorage.getItem('Tenant') ? JSON.parse(localStorage.getItem('Tenant')).Id : null;
  constructor(private http: HttpClient) {}

  // 1. get list schools
  getList(keyword: string, pageIndex: number, pageSize: number) {
    return this.http.get(
      `${environment.apiUrl2}/api/${this.tenantId}/school?keyWord=${keyword}&pageSize=${pageSize}&pageIndex=${pageIndex}`
    );
  }

  // 2. get detail school
  getDetail(id: string) {
    return this.http.get(
      `${environment.apiUrl2}/api/${this.tenantId}/school/${id}/detail`
    );
  }

  // 3. lấy thông tin thêm để map với thông tin trường
  getAnotherInfoToMapSchool() {
    return this.http.get(
      `${environment.apiUrl2}/api/${this.tenantId}/school/create`
    );
  }

  // 4. update school
  update(school_id: string, dataUpdate: any) {
    return this.http.patch(
      `${environment.apiUrl2}/api/${this.tenantId}/school/${school_id}`,
      dataUpdate
    );
  }

  // 5. danh sách điểm trường
  danhSachDiemTruong(schoolId: string, keyword: string) {
    return this.http.get(
      `${environment.apiUrl2}/api/${this.tenantId}/school/${schoolId}/location?keyWord=${keyword}`
    );
  }

  // 6. thêm mới điểm trường
  themDiemTruong(schoolId: string, data: any) {
    return this.http.post(`${environment.apiUrl2}/api/${this.tenantId}/school/${schoolId}/location`, data);
  }
  // 7. cập nhật điểm trường
  suaDiemTruong(schoolId: string, maDiemTruong: string, data: any) {
    return this.http.patch(`${environment.apiUrl2}/api/${this.tenantId}/school/${schoolId}/location/${maDiemTruong}`, data);
  }
  // 8. xóa điểm trường
  xoaDiemTruong(schoolId: string, maDiemTruong: string) {
    return this.http.delete(`${environment.apiUrl2}/api/${this.tenantId}/school/${schoolId}/location/${maDiemTruong}`);
  }

  // 9. danh sách môn
  getListSubject(id: string, keyWord: string, subjectType: number |'null', pageSize: number, pageIndex: number) {
    if(subjectType && subjectType != 'null') {
      return this.http.get(
        `${environment.apiUrl2}/api/${this.tenantId}/school/${id}/subject?pageSize=${pageSize}&pageIndex=${pageIndex}&keyWord=${keyWord}&subjectType=${subjectType}`
      );
    }
    return this.http.get(
      `${environment.apiUrl2}/api/${this.tenantId}/school/${id}/subject?keyWord=${keyWord}&pageSize=${pageSize}&pageIndex=${pageIndex}`
    );

  }
  // 10. gán môn
  assignSubject(schoolId: string, data: any) {
    return this.http.post(`${environment.apiUrl2}/api/${this.tenantId}/school/${schoolId}/subject`, data);
  }
  // 11. xóa môn
  deleteSubject(data: {schoolId: string, subjectId: string}) {
    return this.http.delete(`${environment.apiUrl2}/api/${this.tenantId}/school/${data.schoolId}/subject/${data.subjectId}`);
  }
  // 12. danh sách môn để gán
  getListSubjectToAssign(id: string, keyword: string, subjectType: number | null | 'null') {
    if(!subjectType || subjectType == 'null') {
      return this.http.get(
        `${environment.apiUrl2}/api/${this.tenantId}/school/${id}/subject/create?keyWord=${keyword}`
      );
    }
    return this.http.get(
      `${environment.apiUrl2}/api/${this.tenantId}/school/${id}/subject/create?keyWord=${keyword}&subjectType=${subjectType}`
    );
  }

  // 13. danh sách khối
  getListGrade(id: string, keyword: string) {
    return this.http.get(
      `${environment.apiUrl2}/api/${this.tenantId}/school/${id}/grade?keyWord=${keyword}`
    );
  }
}
