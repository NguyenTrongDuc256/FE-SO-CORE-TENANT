import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BehaviorTeacherService {

  constructor(private http: HttpClient) { }


  /* API DÙNG CHUNG */
  // 1. Thông tin học 1 HS
  getStudentInfo(userId: string) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/student-info/${userId}`);
  }
  // 2.API Danh sách khối
  getGradesList() {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/grades`);
  }

  // 5. Hủy kết quả chấm điểm
  cancelScoreResult(data: any) {
    console.log(11111, data);
    
    return this.http.patch(`${environment.apiBehaviorService}api/grading-behavior/cancel-point`, data);
  }


  /* END API DÙNG CHUNG */


  /* API LỚP CHỦ NHIỆM */

  // 6. Danh sách lớp chủ nhiệm
  getHomeroomClassList(gradeId: string) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-classes?gradeId=${gradeId}`);
  }

  // 7. Thông tin chi tiết lớp chủ nhiệm
  getHomeroomClassInfo(id: string) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-class-info/${id}`);
  }

  // 8. Danh sách học sinh lớp chủ nhiệm
  getStudentByHomeroomClass(homeroomClassId: string, keyWord: string = '') {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-class/student-behaviors?homeroomClassId=${homeroomClassId}&keyWord=${keyWord}`);
  }

  // 9. API Lịch sử chấm điểm 1 HS trong LCN
  getBehaviorHistoryStudentHomeroomClass(homeroomClassId: string, userId: string, fromDate: number | string, toDate: number | string) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-class/student-behavior-history?homeroomClassId=${homeroomClassId}&userId=${userId}&fromDate=${fromDate}&toDate=${toDate}`);
  }

  // 10. Danh sách lịch sử chấm điểm tất cả học sinh lớp chủ nhiệm
  getHistoryAllStudentHomeroomClass(
    homeroomClassId: string,
    userIds: [],
    fromDate: number | string,
    toDate: number | string,
    pageIndex: number | string,
    pageSize: number | string,) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-class/all-student-behavior-history?homeroomClassId=${homeroomClassId}&userId=${userIds}&fromDate=${fromDate}&toDate=${toDate}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  // 11. Danh sách tiêu chí chấm điêm 1 HS lớp chủ nhiệm
  getBehaviorForHomeroomClass(homeroomClassId: string, userId: string, type: number, keyword: string = '') {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-class/behaviors-for-grading-student?homeroomClassId=${homeroomClassId}&userId=${userId}&type=${type}`);
  }

  // 12. API Chấm điểm 1 HS trong LCN
  storeScoreStudentHomeroomClass(data: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-class/grade-student`, data);
  }

  // 14. Chấm điểm nhiều hs lớp chủ nhiệm
  storeScoreManyStudentHomeroomClass(body: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-class/grade-multi-student`, body);
  }


  /* END API LỚP CHỦ NHIỆM */

}
