import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassManagerService {

  constructor(private http: HttpClient) { }

  //  Lấy danh sách đơn xin nghỉ trong lớp
  getListAbsent(data: any) {
    return this.http.get(
      `${environment.apiStaff}/api/${data.homeroomclassId}/absent?fromDate=${data.fromDate}&todDate=${data.todDate}&pageSize=${data.pageSize}&pageIndex=${data.pageIndex}`
    );
  }

  //  Lấy danh sách học sinh trong lớp
  getListStudentInClass(homeroomclassId: string) {
    return this.http.get(
      `${environment.apiStaff}/api/${homeroomclassId}/absent/create`
    );
  }

  //Lấy danh sách tiết học
  getListPeriod() {
    return this.http.get(`${environment.apiStaff}/api/timetable-period`);
  }

  // Thêm mới đơn xin nghỉ
  createAbsent(data: any) {
    return this.http.post(`${environment.apiStaff}/api/${data.homeroomclassId}/absent`, data);
  }

  //  Lấy chi tiết đơn xin nghỉ
  getDetailAbsent(data: any) {
    return this.http.get(`${environment.apiStaff}/api/${data.homeroomclassId}/absent/${data.absentId}`);
  }


  // cập nhật đơn xin nghỉ
  updateAbsent(data: any) {
    return this.http.patch(
      `${environment.apiStaff}/api/${data.homeroomclassId}/absent/${data.id}`,
      data
    );
  }

  // Xóa đơn xin nghỉ
  deleteAbsent(data) {
    return this.http.delete(
      `${environment.apiStaff}/api/${data.homeroom_class_id}/absent/${data.id}`
    );
  }

  // lấy ra danh sách lớp
  getClassList(
    dataFilter: {
      keyWord: string,
      type: number | string,
      status: number | string,
      gradeId: string,
      pageIndex: number,
      pageSize: number
    }
  ) {
    return this.http.get(`${environment.apiOperateCourseService}/api/course/teacher?keyWord=${dataFilter.keyWord}&type=${dataFilter.type}&status=${dataFilter.status}&gradeId=${dataFilter.gradeId}&pageSize=${dataFilter.pageSize}&pageIndex=${dataFilter.pageIndex}`);
  }
}
