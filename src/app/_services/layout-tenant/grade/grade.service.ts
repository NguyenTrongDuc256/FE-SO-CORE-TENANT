import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  tenantId = JSON.parse(localStorage.getItem('Tenant')).Id;
  constructor(
    private http: HttpClient,
  ) { }

  getListGrade(dataFilter: { keyWord: string, isActive: number | string, educationalStages: number | string, pageSize: number, pageIndex: number }) {
    return this.http.get(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/grade?keyWord=${dataFilter.keyWord}&isActive=${dataFilter.isActive}&educationalStages=${dataFilter.educationalStages}&pageIndex=${dataFilter.pageIndex}&pageSize=${dataFilter.pageSize}`);
  }

  createGrade(data) {
    return this.http.post(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/grade`, data);
  }

  updateGrade(data) {
    return this.http.patch(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/grade/${data.id}`, data);
  }
  deleteGrade(data){
    return this.http.delete(`${environment.apiUrl2}/api/admin-tenant/${this.tenantId}/grade/${data.id}`);

  }
}
