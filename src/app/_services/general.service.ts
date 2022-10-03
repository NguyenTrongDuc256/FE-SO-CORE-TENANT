import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "src/environments/environment";
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    private checkChangeValue = new BehaviorSubject(null);
    checkChange= this.checkChangeValue.asObservable();
    constructor(private http: HttpClient) {
    }

    changeValueSearch(mes){
      this.checkChangeValue.next(mes);
    }
    uploadFileBase64(data:any) {
        // data input type base 64
        return this.http.post(`${environment.apiIdentityService}/api/common/upload-file-base64`,data);
    }

    uploadFile(data:any) {
        // data input type file
        return this.http.post(`${environment.apiIdentityService}/api/common/upload-file`,data);
    }

    uploadMultipleFile(data:any) {
        // data input type file
        return this.http.post(`${environment.apiIdentityService}/api/common/upload-multiple-image`,data);
    }

    postFile(file: File) {
      let formData:FormData = new FormData();
      formData.append('upload', file, file.name);
      return this.http.post(`${environment.apiIdentityService}/api/common/upload-file`, formData);
    }

    // lấy danh sách tỉnh/thành phố
    getListCity() {
      return this.http.get(`${environment.apiUrl2}/api/moet/get-dm-tinh`);
    }
    // lấy danh sách quận/huyện thuộc tỉnh/thành phố
    getListDistrict(parent_code: string) {
      return this.http.get(`${environment.apiUrl2}/api/moet/get-dm-huyen/${parent_code}`);
    }
    // lấy danh sách phường/xã thuộc quận/huyện
    getListWard(parent_code: string) {
      return this.http.get(`${environment.apiUrl2}/api/moet/get-dm-xa/${parent_code}`);
    }
    // lấy tên quận huyện theo mã
    getNameDistrict(code: string) {
      return this.http.get(`${environment.apiUrl2}/api/moet/get-dm-ten-huyen/${code}`);
    }

    // change password user layout tenant
    changePasswordUserLayoutTenant(data: any) {
      return this.http.patch(`${environment.apiIdentityService}/api/admin-user/change-password`, data);
    }

    // change username and code user layout tenant
    changeUsernameCodeUserLayoutTenant(data: any) {
      return this.http.patch(`${environment.apiIdentityService}/api/admin-user/update-code-username`, data);
    }
}

