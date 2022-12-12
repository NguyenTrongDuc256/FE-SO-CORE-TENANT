import {environment} from 'src/environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SettingTenantService {

  constructor(private http: HttpClient) { }

  getTenantInfoById(tenantId: string) {
    return this.http.get(
      `${environment.apiUrl2}/api/admin-tenant/${tenantId}`,
    );
  }

  updateTenant(tenantId: string, body: any) {
    return this.http.patch(
      `${environment.apiUrl2}/api/admin-tenant/${tenantId}`, body
    );
  }

  // begin: api cấu hình login
  getConfigLogin() {
    return this.http.get(
      `${environment.apiIdentityService}/api/tenant-config/login-config`,
    );
  }

  updateConfigLogin(body: any) {
    return this.http.patch(
      `${environment.apiIdentityService}/api/tenant-config/update-login-config`, body
    );
  }
  // end: api cấu hình login

  // begin: api config thời gian học
  getConfigStudyTime() {
    return this.http.get(
      `${environment.apiStaff}/api/tenant-config/study-time`,
    );
  }

  updateConfigStudyTime(body: any) {
    return this.http.post(
      `${environment.apiStaff}/api/tenant-config/study-time`, body
    );
  }
  // end: api config thời gian học

  // begin: api cấu hình thời gian gửi thông báo
  getConfigSendNotification() {
    return this.http.get(
      `${environment.apiInteractive}/api/announcement-sending-scope/index`
    );
  }

  updateConfigSendNotification(body: any) {
    return this.http.patch(
      `${environment.apiInteractive}/api/announcement-sending-scope/update`, body
    );
  }
  // end: api cấu hình thời gian gửi thông báo

}

