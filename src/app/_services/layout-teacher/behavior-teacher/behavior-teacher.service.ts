import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BehaviorTeacherService {
  constructor(private http: HttpClient) { }

  /*============================================BEGIN: API DÙNG CHUNG==============================================*/
  // 1. Thông tin học 1 HS
  getStudentInfo(userId: string) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/student-info/${userId}`);
  }
  // 2. API Danh sách khối
  getGradeList() {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/grades`);
  }
  // 3. API Danh sách danh mục
  getBehaviorCategoriesList() {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/behavior-categories`);
  }
  // 4. API Danh sách tiêu chí
  getBehaviorList(behaviorCategoryId: string, type: number) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/behaviors?behaviorCategoryId=${behaviorCategoryId}&type=${type}`);
  }
  // 5. Hủy kết quả chấm điểm
  cancelScoreResult(data: any) {
    return this.http.patch(`${environment.apiBehaviorService}/api/grading-behavior/cancel-point`, data);
  }

  // 6. API lấy thông tin chấm điểm ngày quá khứ
  getConfigGradingBackDate() {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/grading-backdate`);
  }
  /*============================================END: API DÙNG CHUNG=================================================*/


  /*============================================BEGIN: API LỚP CHỦ NHIỆM============================================*/
  // 6. Danh sách lớp chủ nhiệm
  getHomeroomClassList(gradeId: string) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-classes?gradeId=${gradeId}`);
  }
  // 7. Thông tin chi tiết lớp chủ nhiệm
  getHomeroomClassInfo(id: string){
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
    userIds: string[] = [],
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
  // 13. API Thông tin xác nhận chấm điểm nhiều HS trong LCN
  confirmScoreHomeroomClass(data: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-class/confirm-grading-multi-student-info`, data);
  }
  // 14. Chấm điểm nhiều hs lớp chủ nhiệm
  storeScoreManyStudentHomeroomClass(body: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/grading-behavior/homeroom-class/grade-multi-student`, body);
  }
  /*============================================END: API LỚP CHỦ NHIỆM============================================*/


  /*============================================BEGIN: API THEO HỌC SINH============================================*/
  // 15. Danh sách học sinh trong trường
  getStudentBySchool(
    pageSize: number,
    pageIndex: number,
    gradeId: string,
    homeroomClassId: string,
    exceptIds: string[] = [],
    keyword: string = '',
  ) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/students?pageSize=${pageSize}&pageIndex=${pageIndex}&gradeId=${gradeId}&homeroomClassId=${homeroomClassId}&exceptIds=${exceptIds}&keyword=${keyword}`);
  }
  // 16. Confirm chấm điểm theo học sinh
  getInfoConfirmScoreStudent(behaviorId: string, userIds: string[] = []) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/confirm-grading-multi-student-info?behaviorId=${behaviorId}&userIds=${userIds}`);
  }
  // 17. lưu chấm điểm theo học sinh
  storeScoreManyStudent(body: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/grading-behavior/grade-multi-student`, body);
  }
  /*============================================END: API THEO HỌC SINH============================================*/



  /*============================================BEGIN: API LỚP MÔN HỌC============================================*/
  // 18. Danh sách lớp môn học
  getCourseList(gradeId: string) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/courses?gradeId=${gradeId}`);
  }
  // 19. Thông tin chi tiết lớp môn học
  getCourseInfo(id: string){
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/course-info/${id}`);
  }
  // 20. Danh sách học sinh lớp môn học
  getStudentByCourse(courseId: string, keyWord: string = '') {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/course/student-behaviors?courseId=${courseId}&keyWord=${keyWord}`);
  }
  // 21. API Lịch sử chấm điểm 1 HS trong môn học
  getBehaviorHistoryStudentCourse(courseId: string, userId: string, fromDate: number | string, toDate: number | string) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/course/student-behavior-history?courseId=${courseId}&userId=${userId}&fromDate=${fromDate}&toDate=${toDate}`);
  }
  // 22. Danh sách lịch sử chấm điểm tất cả học sinh lớp môn học
  getHistoryAllStudentCourse(
    courseId: string,
    userIds: [],
    fromDate: number | string,
    toDate: number | string,
    pageIndex: number | string,
    pageSize: number | string,) {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/course/all-student-behavior-history?courseId=${courseId}&userId=${userIds}&fromDate=${fromDate}&toDate=${toDate}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  // 23. Danh sách tiêu chí chấm điêm 1 HS lớp môn học
  getBehaviorForCourse(courseId: string, userId: string, type: number, keyword: string = '') {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/course/behaviors-for-grading-student?courseId=${courseId}&userId=${userId}&type=${type}`);
  }
  // 24. API Chấm điểm 1 HS trong môn học
  storeScoreStudentCourse(data: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/grading-behavior/course/grade-student`, data);
  }
  // 25. API Thông tin xác nhận chấm điểm nhiều HS trong môn học
  confirmScoreCourse(data: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/grading-behavior/course/confirm-grading-multi-student-info`, data);
  }

  // 26. Chấm điểm nhiều hs lớp môn học
  storeScoreManyStudentCourse(body: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/grading-behavior/course/grade-multi-student`, body);
  }
  /*============================================END: API LỚP MÔN HỌC============================================*/
}
