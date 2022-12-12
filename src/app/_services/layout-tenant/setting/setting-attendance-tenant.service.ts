import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class SettingAttendanceTenantService {

    constructor(private http: HttpClient) { }

    getInfomationSettingAttendance() {
        return this.http.get(`${environment.apiStaff}/api/tenant-config/attendance-config-information`);
    }

    updateInfomationSettingAttendance(data: any) {
        return this.http.post(`${environment.apiStaff}/api/tenant-config/attendance-config-information`, data);
    }
    getInfomationSettingAttendanceDevice() {
        return this.http.get(`${environment.apiStaff}/api/tenant-config/attendance-config-information/device`);
    }

    updateInfomationSettingAttendanceDevice(data: any) {
        return this.http.post(`${environment.apiStaff}/api/tenant-config/attendance-config-information/device`, data);
    }

}

