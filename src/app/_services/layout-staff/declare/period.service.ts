import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {


  constructor(
    private http: HttpClient,
  ) {
  }
  //toà nhà
  getListPeriodStaff( keyWord: string,) {
    console.log(keyWord);

    return this.http.get(`${environment.apiStaff}/api/timetable-period?keyWord=${keyWord}`);
  }

  createPeriodStaff(data) {
    console.log("data Service", data);
    return this.http.post(`${environment.apiStaff}/api/timetable-period`, data);
  }

  updatePeriodStaff(data) {
    return this.http.patch(`${environment.apiStaff}/api/timetable-period/${data.id}`, data);
  }

  deletePeriodStaff(data) {
    return this.http.delete(`${environment.apiStaff}/api/timetable-period/${data.id}`);
  }

}
