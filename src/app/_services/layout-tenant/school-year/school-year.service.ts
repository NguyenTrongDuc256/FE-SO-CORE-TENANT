import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

  constructor(private http: HttpClient) { }

  getSchoolYearList(tenantId: string, status?: string, keyword: string = '') {
    return this.http.get(
      `${environment.apiUrl2}/api/admin-tenant/${tenantId}/school-year?keyWord=${keyword}&status=${status}`,
    );
  }

  store(tenantId: string, body: any) {
    return this.http.post(
      `${environment.apiUrl2}/api/admin-tenant/${tenantId}/school-year`, body
    );
  }

  update(tenantId: string, id: string, body: any) {
    return this.http.patch(
      `${environment.apiUrl2}/api/admin-tenant/${tenantId}/school-year/${id}`, body
    );
  }

  getDataRelationship(tenantId: string) {
    return this.http.get(
      `${environment.apiUrl2}/api/admin-tenant/${tenantId}/school-year/create`,
    );
  }

  updateGradebookInput(tenantId: string, schoolYearId: string, body) {
    return this.http.patch(
      `${environment.apiUrl2}/api/admin-tenant/${tenantId}/school-year/${schoolYearId}/lock-gradebook-input`, body
    );
  }

  delete(tenantId: string, schoolYearId: string) {
    return this.http.delete(
      `${environment.apiUrl2}/api/admin-tenant/${tenantId}/school-year/${schoolYearId}`
    );
  }

  getDataEdit(tenantId: string, schoolYearId:string) {
    return this.http.get(
      `${environment.apiUrl2}/api/admin-tenant/${tenantId}/school-year/${schoolYearId}`,
    );
  }
}

