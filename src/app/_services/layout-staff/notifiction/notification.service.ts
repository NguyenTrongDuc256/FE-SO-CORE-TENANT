import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  //Danh sách thông báo gửi
  getNotificationListSent(keyword: string, sendingScope: number | '', recipientGroup: number | '', status: number | '', fromTime: string , toTime: string, pageIndex: number, pageSize: number ) {
    fromTime = fromTime ? fromTime : '';
    toTime = toTime ? toTime : '';
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/sent/index?keyword=${keyword}&sendingScope=${sendingScope}&recipientGroup=${recipientGroup}&createdBy=''&status=${status}&fromTime=${fromTime}&toTime=${toTime}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  //Danh sách thông báo gửi
  getNotificationListReceived(keyword: string, createdBy: string,  fromTime: string , toTime: string, pageIndex: number, pageSize: number ) {
    fromTime = fromTime ? fromTime : '';
    toTime = toTime ? toTime : '';
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/received/index?keyword=${keyword}&createdBy=${createdBy}&fromTime=${fromTime}&toTime=${toTime}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  //Danh sách phạm vi gửi
  getSendingScopesList() {
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/sending-scopes`);
  }

  //Danh sách nhóm người nhận
  getRecipientGroupsList(sendingScope) {
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/recipient-groups/${sendingScope}`);
  }

  getObjectsCreatedListRecipient() {
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/received/created-users`);
  }

  getObjectsSendList(sendingScope) {
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/objects/${sendingScope}`);
  }


  deleteNotification(data: any) {
    let options = {body: {id: data}};
    return this.http.delete(`${environment.apiInteractiveService}/api/announcement/delete`, options);
  }

  store(data: any) {
    return this.http.post(`${environment.apiInteractiveService}/api/announcement/store`, data);
  }

  update(data: any) {
    return this.http.patch(`${environment.apiInteractiveService}/api/announcement/update`, data);
  }

  showSent(id: string) {
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/sent/${id}/detail`);
  }
  showReceived(id: string) {
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/received/${id}/detail`);
  }

  getSendListReceived(id: string, keyword: string, status: number | '', pageIndex: number, pageSize: number ) {
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/sent/${id}/recipients?keyword=${keyword}&status=${status}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  deleteObjectReceived(data: any) {
    let options = {body: {id: data.id, announcementId: data.announcementId}};
    return this.http.delete(`${environment.apiInteractiveService}/api/announcement/delete-recipient`, options);
  }

  // danh sách thông báo toàn trường
  getAllNotiInSchool(keyword: string, sendingScope: number | '', recipientGroup: number | '', createdBy: string, status: number | '', fromTime: string , toTime: string, pageIndex: number = PAGE_INDEX_DEFAULT, pageSize: number = PAGE_SIZE_DEFAULT ) {
    fromTime = fromTime ? fromTime : '';
    toTime = toTime ? toTime : '';
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/index?keyword=${keyword}&sendingScope=${sendingScope}&recipientGroup=${recipientGroup}&createdBy=${createdBy}&status=${status}&fromTime=${fromTime}&toTime=${toTime}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  // lấy danh sách phạm vi để lọc màn danh sách thông báo toàn trường và danh sách thông báo nhận
  getListScopeToFilter() {
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/sending-scopes-for-filter`);
  }
}
