import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

tenantId = JSON.parse(localStorage.getItem('Tenant')).Id;
  constructor(
    private http: HttpClient,
  ) { }

  getListSubject(dataFilter: { keyWord: string, subjectType: number | string, educationalStages: number | string, gradeType: number | string, pageIndex: number, pageSize: number }) {
    return this.http.get(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/subject?keyWord=${dataFilter.keyWord}&subjectType=${dataFilter.subjectType}&educationalStages=${dataFilter.educationalStages}&gradeType=${dataFilter.gradeType}&pageSize=${dataFilter.pageSize}&pageIndex=${dataFilter.pageIndex}`);
  }

  createSubject(data) { 
    return this.http.post(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/subject`, data);
  }
//00000000-0000-0000-0000-000000000000
  updateSubject(data) {
    return this.http.patch(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/subject/${data.id}`, data);
  }

  deleteSubject(data) {
    return this.http.delete(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/subject/${data.id}`);

  }

}
