import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectStaffService {
  tenantId = JSON.parse(localStorage.getItem('Tenant')).Id;
  school_id: string = JSON.parse(localStorage.getItem('currentUnit')).id;

  constructor(
    private http: HttpClient,
  ) {
  }

  getListSubjectStaff(
    dataFilter: {
      keyWord: string,
      subjectType: number | string,
      educationalStages: number | string,
      gradeType: number | string,
      pageIndex: number,
      pageSize: number
    }
  ) {
    return this.http.get(`${environment.apiUrl2}/api/${this.tenantId}/school/${this.school_id}/subject?keyWord=${dataFilter.keyWord}&subjectType=${dataFilter.subjectType}&educationalStages=${dataFilter.educationalStages}&gradeType=${dataFilter.gradeType}&pageSize=${dataFilter.pageSize}&pageIndex=${dataFilter.pageIndex}`);
  }

}
