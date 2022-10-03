import { Component, OnInit } from '@angular/core';
import { LAYOUTS_TENANT } from './../../utils/constant';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-switch-layout',
  templateUrl: './switch-layout.component.html',
  styleUrls: ['./switch-layout.component.scss']
})
export class SwitchLayoutComponent implements OnInit {
  layouts: any = LAYOUTS_TENANT;
  layoutAssigned: any = JSON.parse(localStorage.getItem("Layouts"));
  currentLayoutCode: string = localStorage.getItem("currentLayout");
  dataLogin: any;
  constructor(
    private router: Router,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('Token')){
      this.dataLogin = JSON.parse(
        this.decodeTokenLogin(localStorage.getItem('Token'))
      );
    }
  }

  decodeTokenLogin(token: string) {
    const helper = new JwtHelperService();
    return helper.decodeToken(token).data;
  }

  getInfoLayoutAssigned() {
    let result: any[] = [];
    if (this.layoutAssigned) {
      this.layoutAssigned.forEach(element => {
        let findIndex = this.layouts.findIndex(el => el.code == element);
        if (findIndex != -1) {
          result.push(this.layouts[findIndex]);
        }
      });
      return result;
    }
  }

  switchLayout(value) {
    switch (value.code) {
      case "staff":
        this.mapDataLayout("staff",this.dataLogin);
        localStorage.setItem("currentLayout", "staff");
        this.router.navigate(['/staff/home'])
        break;
      case "teacher":
        this.mapDataLayout("teacher",this.dataLogin);
        localStorage.setItem("currentLayout", "teacher");
        this.router.navigate(['/teacher/home'])
        break;
      case "parent":
        this.mapDataLayout("parent",this.dataLogin);
        localStorage.setItem("currentLayout", "parent");
        this.router.navigate(['/parent/home'])
        break;
      case "student":
        this.mapDataLayout("student",this.dataLogin);
        localStorage.setItem("currentLayout", "student");
        this.router.navigate(['/student/home'])
        break;
      case "omt":
        this.mapDataLayout("omt",this.dataLogin);
        localStorage.setItem("currentLayout", "omt");
        this.router.navigate(['/omt/home'])
        break;
      case "department":
        this.mapDataLayout("department",this.dataLogin);
        localStorage.setItem("currentLayout", "department");
        this.router.navigate(['/department/home'])
        break;
      case "division":
        this.mapDataLayout("division",this.dataLogin);
        localStorage.setItem("currentLayout", "division");
        this.router.navigate(['/division/home'])
        break;
      case "school":
        this.mapDataLayout("school",this.dataLogin);
        localStorage.setItem("currentLayout", "school");
        this.router.navigate(['/school/home'])
        break;
      case "tenant":
        this.mapDataLayout("tenant",this.dataLogin);
        localStorage.setItem("currentLayout", "tenant");
        this.router.navigate(['/tenant/home'])
        break;
      case "campus":
        this.mapDataLayout("campus",this.dataLogin);
        localStorage.setItem("currentLayout", "campus");
        this.router.navigate(['/campus/home'])
        break;
      default:
        break;
    }
  }

  mapDataLayout(layout: string, dataCovert: any) {
    let dataUnitOutput = [];
    switch (layout) {
      case 'omt':
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({ permissions: dataCovert?.OmtLayout?.Permissions })
        );
        this.reLoadPermission(dataCovert?.OmtLayout?.Permissions);
        break;
      case 'tenant':
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({ permissions: dataCovert?.TenantLayout?.Permissions })
        );
        this.reLoadPermission(dataCovert?.TenantLayout?.Permissions);
        break;
      case 'department':
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({
            id: dataCovert?.DepartmentLayout[0].DepartmentCode,
            name: dataCovert?.DepartmentLayout[0].DepartmentName,
            permissions: dataCovert?.DepartmentLayout[0].Permissions,
          })
        );
        this.reLoadPermission(dataCovert?.DepartmentLayout[0].Permissions);
        break;
      case 'division':
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({
            id: dataCovert?.DivisionLayout[0].DivisionCode,
            name: dataCovert?.DivisionLayout[0].DivisionName,
            permissions: dataCovert?.DivisionLayout[0].Permissions,
          })
        );
        this.reLoadPermission(dataCovert?.DivisionLayout[0].Permissions);
        break;
      case 'school':
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({
            id: dataCovert?.SchoolLayout[0].SchoolCode,
            name: dataCovert?.SchoolLayout[0].SchoolName,
            permissions: dataCovert?.SchoolLayout[0].Permissions,
          })
        );
        this.reLoadPermission(dataCovert?.SchoolLayout[0].Permissions);
        break;
      case 'campus':
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({
            id: dataCovert?.CampusLayout[0].CampusId,
            name: dataCovert?.CampusLayout[0].CampusName,
            permissions: dataCovert?.CampusLayout[0].Permissions,
          })
        );
        this.reLoadPermission(dataCovert?.CampusLayout[0].Permissions);
        break;
      case 'teacher':
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({
            id: dataCovert?.TeacherLayout[0].SchoolId,
            name: dataCovert?.TeacherLayout[0].SchoolName,
            permissions: dataCovert?.TeacherLayout[0].Permissions,
          })
        );
        this.reLoadPermission(dataCovert?.TeacherLayout[0].Permissions);
        break;
      case 'staff':
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({
            id: dataCovert?.StaffLayout[0].SchoolId,
            name: dataCovert?.StaffLayout[0].SchoolName,
            permissions: dataCovert?.StaffLayout[0].Permissions,
          })
        );
        this.reLoadPermission(dataCovert?.StaffLayout[0].Permissions);
        break;
      case 'student':
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({
            id: dataCovert?.StudentLayout?.SchoolId,
            permissions: dataCovert?.StudentLayout?.Permissions,
          })
        );
        this.reLoadPermission(dataCovert?.StudentLayout?.Permissions);
        break;
      case 'parent':
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({
            id: dataCovert?.ParentLayout?.Students[0].Id,
            name: dataCovert?.ParentLayout?.Students[0].FullName,
            schoolId: dataCovert?.ParentLayout?.Students[0]?.SchoolId,
            permissions: dataCovert?.ParentLayout?.Permissions,
          })
        );
        this.reLoadPermission(dataCovert?.ParentLayout?.Permissions);
        break;
    }
    return dataUnitOutput;
  }

  reLoadPermission(permissions){
    this.permissionsService.loadPermissions(
      permissions,
      (permissionName, permissionsObject) => {
        return !!permissionsObject[permissionName];
      }
    );
  }

  getGameLayout() {
    let findIndex = this.layouts.findIndex(el => el.code == this.currentLayoutCode);
    if (findIndex != -1) {
      return this.layouts[findIndex].name;
    }
  }

}
