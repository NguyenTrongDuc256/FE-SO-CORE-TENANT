import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT } from 'src/app/_shared/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class ModuleManagerService {

  constructor(private http: HttpClient) { }

  // 1. get list module
  getListModule(Keyword: string, IsActive: number, PageSize: number = PAGE_SIZE_DEFAULT, PageIndex: number = PAGE_INDEX_DEFAULT) {
    let strFiter: string = IsActive ? `Keyword=${Keyword}&IsActive=${IsActive}&PageSize=${PageSize}&PageIndex=${PageIndex}` : `Keyword=${Keyword}&PageSize=${PageSize}&PageIndex=${PageIndex}`;
    return this.http.get(`${environment.apiIdentityService}/api/admin-module/index?${strFiter}`);
  }

  // 2. detail module
  detailModule(id: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-module/detail/${id}`)
  }

  // 3. view permission
  permissionOfModule(id: string, keyWord: string) {
    return this.http.get(`${environment.apiIdentityService}/api/admin-module/${id}/permissions?Keyword=${keyWord}`)
  }

}
