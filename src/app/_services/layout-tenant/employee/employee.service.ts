import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeList(pageIndex: number, pageSize: number, school?: string, RoleId?: string, keyword?: string) {
    return this.http.get(
      `${environment.apiIdentityService}/api/admin-employee/index?PageIndex=${pageIndex}&PageSize=${pageSize}&SchoolId=${school}&RoleId=${RoleId}&Keyword=${keyword}`
    );
  }

  getSchoolList() {
    return this.http.get(`${environment.apiIdentityService}/api/admin-user/schools`);
  }

  getInitializationData() {
    return this.http.get(`${environment.apiIdentityService}/api/admin-employee/initialization-data`);
  }

  delete(data: any) {
    let options = {body: data};
    return this.http.delete(`${environment.apiIdentityService}/api/admin-employee/delete`, options);
  }

  store(data: any) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-employee/store`, data);
  }

  detail(userId: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-employee/detail/${userId}`);
  }


  //
  // update(data: any) {
  //   return this.http.patch(`${environment.apiIdentityService}/api/admin-employee/update`, data);
  // }
  //

  //
  // getRoleList(id: string) {
  //   return this.http.get(`${environment.apiIdentityService}/api/admin-employee/${id}/roles`);
  // }
  //
  //
  //

  //
  // assignRoles(data: any) {
  //   return this.http.post(`${environment.apiIdentityService}/api/admin-user/assign-roles`, data);
  // }
  //
  // removeRole(data: any) {
  //   let options = {body: data};
  //   return this.http.delete(`${environment.apiIdentityService}/api/admin-user/remove-role`, options);
  // }
  //
  // updateStatus(data: any) {
  //   return this.http.patch(`${environment.apiIdentityService}/api/admin-user/update-status`, data);
  // }

}
