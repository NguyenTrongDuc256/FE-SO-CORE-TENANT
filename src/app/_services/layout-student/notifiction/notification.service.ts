import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }



  //Danh sách thông báo gửi
  getNotificationList(keyword: string, createdBy: string,  fromTime: string , toTime: string, pageIndex: number, pageSize: number ) {
    fromTime = fromTime ? fromTime : '';
    toTime = toTime ? toTime : '';
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/received/index?keyword=${keyword}&createdBy=${createdBy}&fromTime=${fromTime}&toTime=${toTime}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  show(id: string) {
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/received/${id}/detail`);
  }

  getObjectsCreatedList() {
    return this.http.get(`${environment.apiInteractiveService}/api/announcement/received/created-users`);
  }
}
