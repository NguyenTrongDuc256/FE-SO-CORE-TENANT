import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "src/environments/environment";
import {BehaviorSubject} from 'rxjs';
import {DataSearch} from "../_models/general.model";
import {ShowMessageService} from "./show-message.service";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private checkChangeValue = new BehaviorSubject(null);
  checkChange = this.checkChangeValue.asObservable();

  constructor(
    private http: HttpClient,
    private showMessageService: ShowMessageService,
  ) {
  }

  changeValueSearch(mes) {
    this.checkChangeValue.next(mes);
  }

  uploadFileBase64(data: any) {
    // data input type base 64
    return this.http.post(`${environment.apiIdentityService}/api/common/upload-file-base64`, data);
  }

  uploadFile(data: any) {
    // data input type file
    return this.http.post(`${environment.apiIdentityService}/api/common/upload-file`, data);
  }

  uploadMultipleFile(data: any) {
    // data input type file
    return this.http.post(`${environment.apiIdentityService}/api/common/upload-multiple-image`, data);
  }

  postFile(file: File) {
    let formData: FormData = new FormData();
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

  // change password user các layout còn lại ( trừ core, admin tenant)
  changePasswordUser(data: any) {
    return this.http.patch(`${environment.apiIdentityService}/api/user/change-password`, data);
  }

  // change username and code user layout tenant
  changeUsernameCodeUserLayoutTenant(data: any) {
    return this.http.patch(`${environment.apiIdentityService}/api/admin-user/update-code-username`, data);
  }

  // change username and code user layout staff
  changeUsernameCodeUserLayoutStaff(data: any) {
    return this.http.patch(`${environment.apiIdentityService}/api/user/update-code-username`, data);
  }

  /*
  * xử lý filter và phân trang khi import
  * dataSearch bắt buộc phải có valueSearch và keySearch1 theo interface DataSearch
  * keySearch2 tùy chọn có hoặc không
  */

  filterAndPaginate(
    array: any[],
    pageIndex: number,
    pageSize: number,
    dataSearch: DataSearch = {valueSearch: '', keySearch1: 'fullName'},
    statusRecord: 0 | 1 | ''
  ) {
    let dataItem: any[] = array;
    let totalItems: number;
    let numberError: number;

    if (statusRecord !== '') {
      if (statusRecord == 0) dataItem = dataItem.filter(item => item.errors.length > 0);
      if (statusRecord == 1) dataItem = dataItem.filter(item => item.errors.length == 0);
    }

    if (dataSearch.valueSearch) {
      dataSearch.valueSearch = dataSearch.valueSearch.trim().toLowerCase();
      dataItem = dataItem.filter(element => {
        if (dataSearch.keySearch2 === undefined)
          return element[dataSearch.keySearch1].toLowerCase().includes(dataSearch.valueSearch);
        else
          return element[dataSearch.keySearch1].toLowerCase().includes(dataSearch.valueSearch) ||
            element[dataSearch.keySearch2].toLowerCase().includes(dataSearch.valueSearch);
      });
    }

    totalItems = dataItem.length;
    numberError = dataItem.filter(item => item.errors.length > 0).length;
    dataItem = dataItem.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

    return {
      data: dataItem,
      page: pageIndex,
      size: pageSize,
      totalItems: totalItems,
      numberError: numberError,
    };

  }

  // thay doi mat khau cua chinh user khi da login
  changeMyPassword(data: { password: string, confirmedPassword: string, userId: string }) {
    return this.http.patch(`${environment.apiIdentityService}/api/user/change-my-password`, data);
  }

  /* show toast message 400 */
  showToastMessageError400(error: any): void {
    let arrMessage = error.errors;
    for (let key in arrMessage) {
      arrMessage[key].forEach(element => {
        this.showMessageService.error(element);
      });
    }
  }
}

