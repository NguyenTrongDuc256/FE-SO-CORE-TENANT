import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileStaffService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getListProfileStaff(
    dataFilter: {
      keyWord: string,
      type: number | string ,
      isImperative: number | string,
      pageIndex: number,
      pageSize: number
    }
  ) {
    return this.http.get(`${environment.apiIdentityService}/api/file-category?keyWord=${dataFilter.keyWord}&type=${dataFilter.type}&isImperative=${dataFilter.isImperative}&pageIndex=${dataFilter.pageIndex}&pageSize=${dataFilter.pageSize}`);
  }

  createProfileStaff(data) {
    return this.http.post(`${environment.apiIdentityService}/api/file-category`, data);
  }

  updateProfileStaff(data) {
    return this.http.patch(`${environment.apiIdentityService}/api/file-category/${data.id}`, data);
  }

  deleteProfileStaff(data) {
    return this.http.delete(`${environment.apiIdentityService}/api/file-category/${data.id}`);
  }
}
