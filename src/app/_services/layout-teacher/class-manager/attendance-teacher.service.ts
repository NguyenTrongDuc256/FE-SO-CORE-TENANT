import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceTeacherService {

  constructor(private http: HttpClient) { }

  // ===================== điểm danh lớp chủ nhiệm ====================
  // 1. Lấy thông tin cấu hình điểm danh
  getConfigAttendance() {
    return this.http.get(
      `${environment.apiStaff}/api/tenant-config/attendance`
    );
  }

  // 2. danh sách học sinh cùng dữ liệu điểm danh
  getStudentAndDataAttendanceList(homeroomClassID: string, date: number | string, keyWord: string = '') {
    return this.http.get(
      `${environment.apiStaff}/api/homeroom-class/attendance/teacher?homeroomClassId=${homeroomClassID}&date=${date}&keyWord=${keyWord}`
    );
  }

  // 3. Lưu thông tin điểm danh
  saveDataAttendance(data: any) {
    return this.http.post(
      `${environment.apiStaff}/api/homeroom-class/attendance/teacher`, data
    );
  }
}
