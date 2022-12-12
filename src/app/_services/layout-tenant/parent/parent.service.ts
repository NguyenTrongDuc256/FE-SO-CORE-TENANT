import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http: HttpClient) { }

  getParentList(pageIndex: number, pageSize: number, SchoolId?: string, GradeId?: string, HomeroomClassId?: string, keyword?: string): Observable<any> {
    return this.http.get(
      `${environment.apiIdentityService}/api/admin-parents?Keyword=${keyword}&SchoolId=${SchoolId}&GradeId=${GradeId}&HomeroomClassId=${HomeroomClassId}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  deleteParent(data: any) {
    return this.http.delete(`${environment.apiIdentityService}/api/admin-parents/${data}`);
  }

  store(data: any) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-parents`, data);
  }

  update(data: any, idItem) {
    return this.http.patch(`${environment.apiIdentityService}/api/admin-parents/${idItem}`, data);
  }

  show(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-parents/${id}`);
  }

  getDataGeneralList() {
    return this.http.get(`${environment.apiIdentityService}/api/admin-parents/get-parent-data-relate`);
  }

  updateStatus(data: any) {
    return this.http.patch(`${environment.apiIdentityService}/api/admin-parents/update-status`, data);
  }

  updateAccessApp(data) {
    return this.http.patch(`${environment.apiIdentityService}/api/admin-user/update-access-app-status`, data);
  }

  // 8. upload file danh sách hồ sơ học sinh
  uploadFileImportParent(file) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-parents/upload-parent`, file);
  }
  // 9. Danh sách dữ liệu result
  getListResultImportFile(keyImport: string, schoolId: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-parents/get-upload-temp?keyImport=${keyImport}&schoolId=${schoolId}`);
  }

  // 10. Lưu dữ liệu import
  saveDataImport(data) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-parents/confirm-upload`, data);
  }


}
