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
      `${environment.apiIdentityService}/api/parents?Keyword=${keyword}&SchoolId=${SchoolId}&GradeId=${GradeId}&HomeroomClassId=${HomeroomClassId}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }

  deleteParent(data: any) {
    return this.http.delete(`${environment.apiIdentityService}/api/parents/delete/${data}`);
  }

  store(data: any) {
    return this.http.post(`${environment.apiIdentityService}/api/parents`, data);
  }

  update(data: any, idItem) {
    return this.http.patch(`${environment.apiIdentityService}/api/parents/${idItem}`, data);
  }

  show(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/parents/${id}`);
  }

  getDataGeneralList() {
    return this.http.get(`${environment.apiIdentityService}/api/parents/get-parent-data-relate`);
  }

  updateStatus(data: any) {
    return this.http.patch(`${environment.apiIdentityService}/api/parents/update-status`, data);
  }

  updateAccessApp(data) {
    return this.http.patch(`${environment.apiIdentityService}/api/user/update-access-app-status`, data);
  }

}
