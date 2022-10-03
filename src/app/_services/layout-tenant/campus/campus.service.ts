import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampusService {
  tenantId: string = localStorage.getItem("Tenant") ? JSON.parse(localStorage.getItem("Tenant")).Id : '';
  constructor(private http: HttpClient) { }

  // 1. get list campus
  getListCampus(keyWord: string, isActive: number = null) {
    if (isActive) {
      return this.http.get(`${environment.apiUrl2}/api/${this.tenantId}/campus?keyWord=${keyWord}&isActive=${isActive}`);
    }
    return this.http.get(`${environment.apiUrl2}/api/${this.tenantId}/campus?keyWord=${keyWord}`);
  }

  // 2. create campus
  storeRole(data = {}) {
    return this.http.post(`${environment.apiUrl2}/api/${this.tenantId}/campus`, data);
  }

  // 3. update campus
  updateCampus(data: any = {}) {
    return this.http.patch(`${environment.apiUrl2}/api/${this.tenantId}/campus/${data.id}`, data);
  }

  // 4. Delete campus
  deleteCampus(data: any) {
    return this.http.delete(`${environment.apiUrl2}/api/${this.tenantId}/campus/${data.id}`);
  }

}
