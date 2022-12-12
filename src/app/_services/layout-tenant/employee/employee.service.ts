import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // 1. Danh sách trường của nhân viên
  getSchoolList() {
    return this.http.get(`${environment.apiIdentityService}/api/admin-employee/schools`);
  }

  // 2. Danh sach nhân viên
  getEmployeeList(pageIndex: number, pageSize: number, school?: string, RoleId?: string, keyword?: string) {
    return this.http.get(
      `${environment.apiIdentityService}/api/admin-employee/index?PageIndex=${pageIndex}&PageSize=${pageSize}&SchoolId=${school}&RoleId=${RoleId}&Keyword=${keyword}`
    );
  }

  // 3. Lấy dữ liệu moet và role
  getInitializationData() {
    return this.http.get(`${environment.apiIdentityService}/api/admin-employee/initialization-data`);
  }

  // 3. Xóa nhân viên
  delete(data: any) {
    let options = {body: data};
    return this.http.delete(`${environment.apiIdentityService}/api/admin-employee/delete`, options);
  }

  // 3. Thêm mới nhân viên
  store(data: any) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-employee/store`, data);
  }

  // 4. Chi tiết nhân viên
  detail(userId: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-employee/detail/${userId}`);
  }

  // 5. Cập nhật nhân viên
  update(data: any) {
    return this.http.patch(`${environment.apiIdentityService}/api/admin-employee/update`, data);
  }

  getRoleListByEmployeeId(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-employee/roles-to-assign`);
  }

  // 8. upload file danh sách hồ sơ học sinh
  uploadFileImportEmployee(file) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-employee/upload-excel`, file);
  }

  // 9. Danh sách dữ liệu result
  getListResultImportFile(keyImport: string, schoolId: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-employee/get-upload-temp?keyImport=${keyImport}&schoolId=${schoolId}`);
  }

  // 10. Lưu dữ liệu import
  saveDataImport(data) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-employee/confirm-upload`, data);
  }

}
