import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotificationList(keyword: string, sendingScope: number | '', recipientGroup: number | '',createdBy: string, status: number | '', fromTime: string , toTime: string, pageIndex: number, pageSize: number ) {
    fromTime = fromTime ? fromTime : '';
    toTime = toTime ? toTime : '';
    return this.http.get(`${environment.apiInteractiveService}/api/admin-announcement/index?keyword=${keyword}&sendingScope=${sendingScope}&recipientGroup=${recipientGroup}&createdBy=${createdBy}&status=${status}&fromTime=${fromTime}&toTime=${toTime}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getSendingScopesList() {
    return this.http.get(`${environment.apiInteractiveService}/api/admin-announcement/sending-scopes`);
  }

  getRecipientGroupsList(sendingScope) {
    return this.http.get(`${environment.apiInteractiveService}/api/admin-announcement/recipient-groups/${sendingScope}`);
  }

  getObjectsCreatedList() {
    return this.http.get(`${environment.apiInteractiveService}/api/admin-announcement/created-users`);
  }

  getObjectsSendList(sendingScope) {
    return this.http.get(`${environment.apiInteractiveService}/api/admin-announcement/objects/${sendingScope}`);
  }


  deleteNotification(data: any) {
    let options = {body: {id: data}};
    return this.http.delete(`${environment.apiInteractiveService}/api/admin-announcement/delete`, options);
  }

  store(data: any) {
    return this.http.post(`${environment.apiInteractiveService}/api/admin-announcement/store`, data);
  }

  update(data: any) {
    return this.http.patch(`${environment.apiInteractiveService}/api/admin-announcement/update`, data);
  }

  show(id: string) {
    return this.http.get(`${environment.apiInteractiveService}/api/admin-announcement/${id}/detail`);
  }

  getSendListReceived(id: string, keyword: string, status: number | '', pageIndex: number, pageSize: number ) {
    return this.http.get(`${environment.apiInteractiveService}/api/admin-announcement/${id}/recipients?keyword=${keyword}&status=${status}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  deleteObjectReceived(data: any) {
    let options = {body: {id: data.id, announcementId: data.announcementId}};
    return this.http.delete(`${environment.apiInteractiveService}/api/admin-announcement/delete-recipient`, options);
  }


}
