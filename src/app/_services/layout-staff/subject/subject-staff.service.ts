import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectStaffService {
  staffId: string = localStorage.getItem('Tenant') ? JSON.parse(localStorage.getItem("Tenant")).Id : '';
  constructor(private http: HttpClient) { }


  // 1. get list campus
  getListStaff(keyWord: string, isActive: number = null) {
    // console.log(this.staffId);
    // if (isActive) {
    //   return this.http.get(`${environment.apiUrl2}/api/${this.staffId}/school?keyWord=${keyWord}&isActive=${isActive}`);
    // }
    return this.http.get(`${environment.apiUrl2}/api/${this.staffId}/school/a7e3a37d-c9a8-4534-94b1-ce9b7283aecf/subject`);
  }
}
