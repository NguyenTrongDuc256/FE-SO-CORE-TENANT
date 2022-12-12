import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BehaviorConfigStaffService {
  constructor(private http: HttpClient) { }

  /* config */
  //  thông tin cấu hình chấm điểm
  behaviorConfigInfo() {
    return this.http.get(`${environment.apiBehaviorService}/api/behavior-config/grading-config`);
  }

  // cập nhật cấu hình chấm điểm
  updateBehaviorConfig(data: any) {
    return this.http.patch(`${environment.apiBehaviorService}/api/behavior-config/update-grading-config`, data);
  }

  // thông tin cấu hình khóa chấm điểm theo tuần
  lockGradingWeeks() {
    return this.http.get(`${environment.apiBehaviorService}/api/behavior-config/lock-grading-weeks`);
  }

  // cập nhật cấu hình chấm điểm
  updateLockGradingWeeks(data: any) {
    return this.http.patch(`${environment.apiBehaviorService}/api/behavior-config/update-lock-grading-weeks`, data);
  }

  // thông tin cấu hình sinh điểm khởi tạo
  genInitialPointInfo() {
    return this.http.get(`${environment.apiBehaviorService}/api/behavior-config/initial-point-config`);
  }

  // sinh điểm khởi tạo cho học kỳ
  genInitialPoint(data: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/behavior-config/gen-initial-point`, data);
  }

  /* end config */


  //  danh sách các danh mục
  listBehaviorCategory() {
    return this.http.get(`${environment.apiBehaviorService}/api/behavior-category/index`);
  }

  // danh sách các tiêu chí
  listBehavior(data: any) {
    if (data.type && data.appliedObjectTypes) {
      return this.http.get(`${environment.apiBehaviorService}/api/behavior/index?categoryId=${data.categoryId}&type=${data.type}&appliedObjectTypes=${data.appliedObjectTypes}&keyword=${data.keyword}&pageSize=${data.pageSize}&pageIndex=${data.pageIndex}`);
    } else if (!data.type && data.appliedObjectTypes) {
      return this.http.get(`${environment.apiBehaviorService}/api/behavior/index?categoryId=${data.categoryId}&appliedObjectTypes=${data.appliedObjectTypes}&keyword=${data.keyword}&pageSize=${data.pageSize}&pageIndex=${data.pageIndex}`);
    } else if (data.type && !data.appliedObjectTypes) {
      return this.http.get(`${environment.apiBehaviorService}/api/behavior/index?categoryId=${data.categoryId}&type=${data.type}&keyword=${data.keyword}&pageSize=${data.pageSize}&pageIndex=${data.pageIndex}`);
    } else {
      return this.http.get(`${environment.apiBehaviorService}/api/behavior/index?categoryId=${data.categoryId}&keyword=${data.keyword}&pageSize=${data.pageSize}&pageIndex=${data.pageIndex}`);
    }
  }

  // lấy thông tin áp dụng chấm điểm theo lần
  getIsApplyTimeNumber() {
    return this.http.get(`${environment.apiBehaviorService}/api/grading-behavior/is-apply-time-number`);
  }

  // Thêm mới tiêu chí
  createBehavior(data: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/behavior/store`, data);
  }

  // Cập nhật tiêu chí
  updateBehavior(data: any) {
    return this.http.patch(`${environment.apiBehaviorService}/api/behavior/update`, data);
  }

  // Thêm danh mục
  createBehaviorCategory(data: any) {
    return this.http.post(`${environment.apiBehaviorService}/api/behavior-category/store`, data);
  }

  // Chỉnh sửa danh mục
  updateBehaviorCategory(data: any) {
    return this.http.patch(`${environment.apiBehaviorService}/api/behavior-category/update`, data);
  }

  // Xóa danh mục
  deleteCehaviorCategory(data: any) {
    let options = { body: data };
    return this.http.delete(`${environment.apiBehaviorService}/api/behavior-category/delete`, options);
  }

  // Danh sách icon
  getListIcon() {
    return this.http.get(`${environment.apiBehaviorService}/api/behavior-category/avatars`);
  }

  // Chi tiết tiêu chí
  behaviorDetail(id: string) {
    return this.http.get(`${environment.apiBehaviorService}/api/behavior/${id}/detail`);
  }

  // Danh sách danh mục đơn giản
  behaviorCategorySimpleList(id?: string) {
    if (id) {
      return this.http.get(`${environment.apiBehaviorService}/api/behavior-category/simple-list?exceptId=${id}`);
    } else {
      return this.http.get(`${environment.apiBehaviorService}/api/behavior-category/simple-list`);

    }
  }

  // Danh sách danh mục đơn giản
  getCodeBehavior() {
    return this.http.get(`${environment.apiBehaviorService}/api/behavior/get-code`);
  }

  // Xóa tiêu chí đánh giá
  removeBehavior(data: any) {
    let options = { body: data };
    return this.http.delete(`${environment.apiBehaviorService}/api/behavior/delete`, options);
  }




}
