import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  tenantId = localStorage.getItem('Tenant') ? JSON.parse(localStorage.getItem('Tenant')).Id : null;
  constructor(private http: HttpClient) {}

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
}
