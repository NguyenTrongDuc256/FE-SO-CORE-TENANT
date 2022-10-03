import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getCityList() {
    return this.http.get(
      `${environment.apiIdentityService}/api/location/get-city-list`
    );
  }

  getDistrictList(cityCode: string) {
    return this.http.get(
      `${environment.apiIdentityService}/api/location/get-district-list?CityCode=${cityCode}`
    );
  }

  getWardList(districtCode) {
    return this.http.get(
      `${environment.apiIdentityService}/api/location/get-ward-list?DistrictCode=${districtCode}`
    );
  }

}
