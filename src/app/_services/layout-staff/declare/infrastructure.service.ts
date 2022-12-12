import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class infrastructureService {
  constructor(
    private http: HttpClient,
  ) {
  }
  //toà nhà
  getListBuildingStaff(
    dataFilter: {
      keyWord: string,
      IsActive: number | string,
    }
  ) {
    return this.http.get(`${environment.apiStaff}/api/classroom-building?keyWord=${dataFilter.keyWord}&isActive=${dataFilter.IsActive}`);
  }

  createBuildingStaff(data) {
    return this.http.post(`${environment.apiStaff}/api/classroom-building`, data);
  }

  updateBuildingStaff(data) {
    console.log(data);
    return this.http.patch(`${environment.apiStaff}/api/classroom-building/${data.id}`, data);
  }

  deleteBuildingStaff(data) {
    return this.http.delete(`${environment.apiStaff}/api/classroom-building/${data.id}`);
  }


  // get toà nhà
  getBuildingStaff() {
    return this.http.get(`${environment.apiStaff}/api/classroom-building`);
  }
  //Phòng học
  getListClassStaff(
    dataFilter: {
      keyWord: string,
      isRoomType: number | string,
      IsActive: number | string,
      pageIndex: number,
      pageSize: number
    }
  ) {
    return this.http.get(`${environment.apiStaff}/api/classroom?keyWord=${dataFilter.keyWord}&isRoomType=${dataFilter.isRoomType}&isActive=${dataFilter.IsActive}&pageSize=${dataFilter.pageSize}&pageIndex=${dataFilter.pageIndex}`);
  }
  createClassStaff(data) {
    return this.http.post(`${environment.apiStaff}/api/classroom`, data);
  }
  updateClassStaff(data) {
    return this.http.patch(`${environment.apiStaff}/api/classroom/${data.id}`, data);
  }

  deleteClassStaff(data) {
    console.log(data.id)
    return this.http.delete(`${environment.apiStaff}/api/classroom/${data.id}`);
  }
}
