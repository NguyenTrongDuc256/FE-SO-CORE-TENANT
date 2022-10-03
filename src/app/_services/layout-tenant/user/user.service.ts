import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserList(pageIndex: number, pageSize: number, school?: string, isActive?: any, keyword?: string, layout?: string): Observable<any> {
    if(!layout || layout == '' || layout == 'null') {
      return this.http.get(
        `${environment.apiIdentityService}/api/admin-user/index?PageIndex=${pageIndex}&PageSize=${pageSize}&SchoolId=${school}&IsActive=${isActive}&Keyword=${keyword}`
      );
    }
    return this.http.get(
      `${environment.apiIdentityService}/api/admin-user/index?PageIndex=${pageIndex}&PageSize=${pageSize}&SchoolId=${school}&IsActive=${isActive}&Keyword=${keyword}&Layout=${layout}`
    );
  }

  changePasswordUser(data: any){
    return this.http.patch(`${environment.apiIdentityService}/api/admin-user/change-password`, data);
  }

  deleteUser(data: any) {
    let options = {body: data};
    return this.http.delete(`${environment.apiIdentityService}/api/admin-user/delete`, options);
  }

  store(data: any) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-user/store`, data);
  }

  update(data: any) {
    return this.http.patch(`${environment.apiIdentityService}/api/admin-user/update`, data);
  }

  show(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-user/detail/${id}`);
  }

  getRoleList(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-user/${id}/roles`);
  }

  getRolesToAssignList(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-user/${id}/roles-to-assign`);
  }

  getDataRolesToAssign() {
    return this.http.get(`${environment.apiIdentityService}/api/admin-user/roles-to-assign`);
  }

  getSchoolList() {
    return this.http.get(`${environment.apiIdentityService}/api/admin-user/schools`);
  }

  getCampusList() {
    return this.http.get(`${environment.apiIdentityService}/api/admin-user/campuses`);
  }

  assignRoles(data: any) {
    return this.http.post(`${environment.apiIdentityService}/api/admin-user/assign-roles`, data);
  }

  removeRole(data: any) {
    let options = {body: data};
    return this.http.delete(`${environment.apiIdentityService}/api/admin-user/remove-role`, options);
  }

  updateStatus(data: any) {
    return this.http.patch(`${environment.apiIdentityService}/api/admin-user/update-status`, data);
  }

  // danh sách quyền của người dùng
  getListSchoolRoleToAssign(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-user/${id}/school-roles-to-assign`);
  }

}
