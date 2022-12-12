import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStaffService {

  constructor(private http: HttpClient) { }

  // 1. lấy danh sách nhân viên
  getEmployeeList(
    pageIndex: number,
    pageSize: number,
    roleId?: string,
    keyword?: string,
    hinhThucHopDong?: string,
    gender?: number | '',
    viTriViecLam?: string,
    isLoggedIn?: number | '',
    danToc?: string
  ) {
    return this.http.get(
      `${environment.apiIdentityService}/api/employee/index?PageIndex=${pageIndex}&PageSize=${pageSize}&RoleId=${roleId}&Keyword=${keyword}&HinhThucHopDong=${hinhThucHopDong}&Gender=${gender}&ViTriViecLam=${viTriViecLam}&IsLoggedIn=${isLoggedIn}&DanToc=${danToc}`
    );
  }

  // 2. lấy dữ liệu moet, role
  getInitializationData() {
    return this.http.get(`${environment.apiIdentityService}/api/employee/initialization-data`);
  }

  // 3. Xóa nhân viên
  delete(data: any) {
    let options = {body: data};
    return this.http.delete(`${environment.apiIdentityService}/api/employee/delete`, options);
  }

  // 4. Tạo mới nhân viên
  store(data: any) {
    return this.http.post(`${environment.apiIdentityService}/api/employee/store`, data);
  }

  // 5.
  detail(userId: string) {
    return this.http.get(`${environment.apiIdentityService}/api/employee/detail/${userId}`);
  }

  // 6. Cập nhật nhân viên
  update(data: any) {
    return this.http.patch(`${environment.apiIdentityService}/api/employee/update`, data);
  }

  // 7. Danh sách quyền của user
  getRoleListByUserId(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/user/${id}/roles`);
  }

  // 8. upload file danh sách hồ sơ học sinh
  uploadFileImportEmployee(file) {
    return this.http.post(`${environment.apiIdentityService}/api/employee/upload-excel`, file);
  }

  // 9. Danh sách dữ liệu result
  getListResultImportFile(keyImport: string) {
    return this.http.get(`${environment.apiIdentityService}/api/employee/get-upload-temp?keyImport=${keyImport}`);
  }

  // 10. Lưu dữ liệu import
  saveDataImport(data) {
    return this.http.post(`${environment.apiIdentityService}/api/employee/confirm-upload`, data);
  }

}
