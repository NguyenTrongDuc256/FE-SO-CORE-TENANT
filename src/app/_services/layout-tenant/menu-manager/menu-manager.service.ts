import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuManagerService {
  tenantId: string = JSON.parse(localStorage.getItem("Tenant")).Id;
  constructor(
    private http: HttpClient,
  ) { }

  // Lấy danh sách gói menu
  getListMenuPackage(keyWord: string) {
    return this.http.get(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/menu-package?keyWord=${keyWord}`);
  }

  // Lấy danh sách chi tiết gói menu
  getDetailMenuPackage(menuPackageId: string) {
    return this.http.get(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/menu-package/${menuPackageId}`);
  }

  // Thêm mới gói menu
  storeMenuPackage(data: any) {
    return this.http.post(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/menu-package`, data);
  }

  // Sửa gói menu
  updateMenuPackage(menuPackageId: string, data: any) {
    return this.http.patch(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/menu-package/${menuPackageId}`, data);
  }

  // Xóa gói menu
  deleteMenuPackage(menuPackageId: string) {
    return this.http.delete(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/menu-package/${menuPackageId}`);
  }

  // Danh sách menu item
  getListMenuItem(keyWord: string = '', status: any, menuType: any, pageSize: number = 15, pageIndex: number = 1) {
    let strFilter: string = `pageSize=${pageSize}&pageIndex=${pageIndex}&keyWord=${keyWord}`;
    if (status && menuType) {
      strFilter = `pageSize=${pageSize}&pageIndex=${pageIndex}&status=${status}&menuType=${menuType}&keyWord=${keyWord}`;
    } else {
      status ? strFilter = `pageSize=${pageSize}&pageIndex=${pageIndex}&status=${status}&keyWord=${keyWord}` : strFilter = `pageSize=${pageSize}&pageIndex=${pageIndex}&menuType=${menuType}&keyWord=${keyWord}`;
    }
    return this.http.get(`${environment.apiUrl2}/api/menu-item?${strFilter}`);
  }

  // lay danh sach truong hoc chua duoc gan goi menu
  getDataSchoolNotAssignMenuPackage(menuPackageId: string, keyWord: string, pageSize: number, pageIndex: number) {
    return this.http.get(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/menu-package/${menuPackageId}/assign-school?keyWord=${keyWord}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }

  // gan goi menu cho truong hoc
  assignMenuPackageToSchool(menuPackageId: string, data: any) {
    return this.http.patch(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/menu-package/${menuPackageId}/assign-school`, data);
  }

  // lay danh sach goi menu cua 1 truong
  getDataMenuPackageOfSchool(schoolId: string) {
    return this.http.get(`${environment.apiUrl2}/api/${this.tenantId}/school/${schoolId}/menu-package`);
  }

  // go goi menu trong 1 truong
  removeMenuPackageOfSchool(menuPackageId: string, schoolId: string) {
    return this.http.delete(`${environment.apiUrl2}/api/${this.tenantId}/school/${schoolId}/menu-package/${menuPackageId}`);
  }
}
