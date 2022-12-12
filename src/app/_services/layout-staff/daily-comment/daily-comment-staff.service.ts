import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DailyCommentStaffService {

  constructor(private http: HttpClient) { }

  // nhan xet lop chu nhiem
  getInitializationData(homeroomClassId: string = '', date?: string, keyWord: string = '') {
    const headers = new HttpHeaders({ 'HomeroomClassId': homeroomClassId });
    return this.http.get(`${environment.apiStaff}/api/homeroom-class-comment/${homeroomClassId}?homeroomClassId=${homeroomClassId}&date=${date}&keyWord=${keyWord}`, { headers });
  }

  saveDailyCommentData(homeroomClassId: string = '', data) {
    const headers = new HttpHeaders({ 'HomeroomClassId': homeroomClassId });
    return this.http.post(`${environment.apiStaff}/api/homeroom-class-comment/${homeroomClassId}`, data, { headers });
  }

  // nhan xet lop mon hoc
  getInitializationDataCourse(courseId: string = '', date?: string, keyWord: string = '') {
    const headers = new HttpHeaders({ 'courseId': courseId });
    return this.http.get(`${environment.apiOperateCourseService}/api/course-comment/${courseId}?date=${date}&keyWord=${keyWord}`, { headers });
  }

  saveDailyCommentDataCourse(courseId: string = '', data) {
    const headers = new HttpHeaders({ 'courseId': courseId });
    return this.http.post(`${environment.apiOperateCourseService}/api/course-comment/${courseId}`, data, { headers });
  }

}
