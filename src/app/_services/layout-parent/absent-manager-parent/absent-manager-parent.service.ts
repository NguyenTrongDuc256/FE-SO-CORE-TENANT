import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsentManagerParentService {

  constructor(private http: HttpClient) { }
  // Lấy danh sách đơn xin nghỉ trong lớp
  getListAbsent(data: any) {
    return this.http.get(
      `${environment.apiStaff}/api/absent-parent?fromDate=${data.fromDate}&todDate=${data.todDate}&pageSize=${data.pageSize}&pageIndex=${data.pageIndex}`
    );
  }

  //Thêm mới đơn xin nghỉ
  createAbsent(data: any) {
    return this.http.post(
      `${environment.apiStaff}/api/absent-parent`,
      data
    );
  }

  // Lấy danh sách học sinh trong lớp
  getListStudentInClass() {
    return this.http.get(
      `${environment.apiStaff}/api/absent-parent/create`
    );
  }

  // Lấy danh sách tiết học
  getListPeriod() {
    return this.http.get(`${environment.apiStaff}/api/timetable-period`);
  }

  // Cập nhật đơn xin nghỉ
  updateAbsent(data: any) {
    return this.http.patch(
      `${environment.apiStaff}/api/absent_parent/${data.id}`,
      data
    );
  }

  // Chi tiết đơn xin nghỉ
  getDetailAbsent(data: any) {
    return this.http.get(`${environment.apiStaff}/api/absent_parent/${data.id}`);
  }

  // xóa đơn xin nghỉ
  deleteAbsent(data) {
    return this.http.delete(`${environment.apiStaff}/api/absent-parent/${data.id}`);
  }


}
