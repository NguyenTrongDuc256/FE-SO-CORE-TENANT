import { AuthService } from 'src/app/modules/auth';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslocoService } from '@ngneat/transloco';
import { LANGUAGE, LAYOUTS_CODE, LAYOUTS_TENANT, MESSAGE_ERROR_CALL_API } from 'src/app/_shared/utils/constant';
import { NgxPermissionsService } from 'ngx-permissions';
import { ShowMessageService } from 'src/app/_services/show-message.service';

@Component({
  selector: 'app-select-layout-unit',
  templateUrl: './select-layout-unit.component.html',
  styleUrls: ['./select-layout-unit.component.scss', '../../helper-auth.scss'],
})
export class SelectLayoutUnitComponent implements OnInit {
  isLoading = false;
  lang = localStorage.getItem('language') || 'vi';
  layoutForm: FormGroup;
  hasError: boolean = false;
  msgErr: string = '';
  layoutCode = '';
  unitId = '';
  arrLayouts = LAYOUTS_TENANT;
  arrUnits = [];
  dataLogin: any;
  arrLang = LANGUAGE;
  arrSchoolYear = [];


  constructor(
    private translocoService: TranslocoService,
    private router: Router,
    private authService: AuthService,
    private permissionsService: NgxPermissionsService,
    private showMessageService: ShowMessageService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('Token'))
      this.dataLogin = JSON.parse(
        this.decodeTokenLogin(localStorage.getItem('Token'))
      );
    else this.router.navigate(['auth/login']);
    this.arrLayouts = this.arrLayouts.filter((item) => this.dataLogin?.Layouts.includes(item.code));
  }

  decodeTokenLogin(token: string) {
    const helper = new JwtHelperService();
    return helper.decodeToken(token).data;
  }

  selectLayout() {
    this.hasError = true;
    this.layoutCode == '' || !this.layoutCode
      ? (this.hasError = true)
      : (this.hasError = false);
    this.getDataConfigSystem(this.layoutCode);
    this.unitId = '';
    this.arrUnits = [];
    this.arrUnits = this.mapDataLayout(this.layoutCode, this.dataLogin);
    localStorage.setItem('currentLayout', this.layoutCode);
    if(this.layoutCode == 'student') {

    }
  }

  selectUnit(layout: string) {
    let currentUnit = this.arrUnits.find((item) => item.id == this.unitId);
    localStorage.setItem('currentUnit', JSON.stringify(currentUnit));
    this.hasError = false;
  }

  submit() {
    if (
      ([
        'department',
        'division',
        'school',
        'campus',
        'teacher',
        'staff',
        'parent',
      ].includes(this.layoutCode) &&
        (!this.layoutCode || this.layoutCode == '') &&
        (!this.unitId || this.unitId == '')) ||
      this.hasError
    ) {
      return (this.msgErr = 'auth.warmingSelectLayout');
    }
    this.permissionsService.loadPermissions(
      JSON.parse(localStorage.getItem('currentUnit')).permissions,
      (permissionName, permissionsObject) => {
        return !!permissionsObject[permissionName];
      }
    );
    let urlLayout = this.switchUrlLayout(this.layoutCode);
    this.router.navigate([urlLayout]);
  }

  mapDataLayout(layout: string, dataCovert: any) {
    let dataUnitOutput = [];
    switch (layout) {
      case LAYOUTS_CODE.OMT:
        this.hasError = false;
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({ permissions: dataCovert?.OmtLayout?.Permissions })
        );
        break;
      case LAYOUTS_CODE.TENANT:
        this.hasError = false;
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({ permissions: dataCovert?.TenantLayout?.Permissions })
        );
        break;
      case LAYOUTS_CODE.DEPARTMENT:
        this.hasError = true;
        dataCovert?.DepartmentLayout.forEach((department) => {
          dataUnitOutput.push({
            id: department.DepartmentCode,
            name: department.DepartmentName,
            permissions: department.Permissions,
          });
        });
        break;
      case LAYOUTS_CODE.DIVISION:
        this.hasError = true;
        dataCovert?.DivisionLayout.forEach((division) => {
          dataUnitOutput.push({
            id: division.DivisionCode,
            name: division.DivisionName,
            permissions: division.Permissions,
          });
        });
        break;
      case LAYOUTS_CODE.SCHOOL:
        this.hasError = true;
        dataCovert?.SchoolLayout.forEach((school) => {
          dataUnitOutput.push({
            id: school.SchoolCode,
            name: school.SchoolName,
            permissions: school.Permissions,
          });
        });
        break;
      case LAYOUTS_CODE.CAMPUS:
        this.hasError = true;
        dataCovert?.CampusLayout.forEach((campus) => {
          dataUnitOutput.push({
            id: campus.CampusId,
            name: campus.CampusName,
            permissions: campus.Permissions,
          });
        });
        break;
      case LAYOUTS_CODE.TEACHER:
        this.hasError = true;
        dataCovert?.TeacherLayout.forEach((teacher) => {
          dataUnitOutput.push({
            id: teacher.SchoolId,
            name: teacher.SchoolName,
            educationalStages: teacher.EducationalStages,
            permissions: teacher.Permissions,
          });
        });
        break;
      case LAYOUTS_CODE.STAFF:
        this.hasError = true;
        dataCovert?.StaffLayout.forEach((staff) => {
          dataUnitOutput.push({
            id: staff.SchoolId,
            name: staff.SchoolName,
            educationalStages: staff.EducationalStages,
            permissions: staff.Permissions,
          });
        });
        break;
      case LAYOUTS_CODE.STUDENT:
        this.hasError = false;
        // dataCovert?.StudentLayout?.Permissions.forEach((st) => {
        //   dataUnitOutput.push({
        //     id: st?.SchoolId,
        //     permissions: st.Permissions,
        //   });
        // });
        localStorage.setItem(
          'currentUnit',
          JSON.stringify({
            id: dataCovert?.StudentLayout?.SchoolYearSchools[0].SchoolId,
            permissions: dataCovert?.StudentLayout?.Permissions,
            schoolYear: dataCovert?.StudentLayout?.SchoolYearSchools[0].SchoolYearId,
            schoolYearSchool: dataCovert?.StudentLayout?.SchoolYearSchools
          })
        );
        // nếu trong danh sách năm học trả về khi call api data-login không có năm hiện tại thì lấy năm đầu tiên trong SchoolYearSchools trong token của học sinh
        let dataConfigSystem = JSON.parse(localStorage.getItem("dataConfigSystem"));
        if(dataConfigSystem) {
          if(dataConfigSystem.schoolYears && dataConfigSystem.schoolYears.length > 0){
            let currentSchoolYear = dataConfigSystem.schoolYears.find(el=>el.status == 1)?.id;
            if(!currentSchoolYear) {
              let dataTerms = dataConfigSystem.schoolYears.find(el=>el.id == currentSchoolYear)?.terms;
              let el = dataTerms?.find(sub=>sub.isCurrent == 1);
              let currentTerm = el ? el?.index : dataTerms[0].index;
              localStorage.setItem('currentSchoolYear', dataCovert?.StudentLayout?.SchoolYearSchools[0].SchoolYearId)
              localStorage.setItem("currentTerm", currentTerm);
            }
          }
        }
        break;
      case LAYOUTS_CODE.PARENT:
        this.hasError = true;
        dataCovert?.ParentLayout?.Students.forEach((pa) => {
          dataUnitOutput.push({
            id: pa.Id,
            name: pa.FullName,
            schoolId: pa?.SchoolId,
            permissions: dataCovert?.ParentLayout?.Permissions,
          });
        });
        break;
    }
    return dataUnitOutput;
  }

  switchUrlLayout(layout: string) {
    let urlLayout = '';
    switch (layout) {
      case LAYOUTS_CODE.OMT:
        break;
      case LAYOUTS_CODE.TENANT:
        urlLayout = '/tenant/home';
        break;
      case LAYOUTS_CODE.DEPARTMENT:
        urlLayout = '/department/home';
        break;
      case LAYOUTS_CODE.DIVISION:
        urlLayout = '/division/home';
        break;
      case LAYOUTS_CODE.SCHOOL:
        urlLayout = '/school/home';
        break;
      case LAYOUTS_CODE.CAMPUS:
        urlLayout = '/campus/home';
        break;
      case LAYOUTS_CODE.TEACHER:
        urlLayout = '/teacher/home';
        break;
      case LAYOUTS_CODE.STAFF:
        urlLayout = '/staff/home';
        break;
      case LAYOUTS_CODE.STUDENT:
        urlLayout = '/student/home';
        break;
      case LAYOUTS_CODE.PARENT:
        urlLayout = '/parent/home';
        break;
    }
    return urlLayout;
  }

  getDataConfigSystem(layout: string) {
    this.authService.getDataConfig(layout).subscribe(
      (res: any) => {
        localStorage.setItem('dataConfigSystem', JSON.stringify(res.data));
        this.convertDataConfigSystem();
      },
      (_err) => {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    );
  }

  convertDataConfigSystem(){
    let dataConfigSystem = JSON.parse(localStorage.getItem("dataConfigSystem"));
    if(dataConfigSystem){
      let dataSchoolYear = dataConfigSystem.schoolYears;
      if(dataSchoolYear && dataSchoolYear.length > 0){
        let currentSchoolYear = dataSchoolYear.find(el=>el.status == 1) ? dataSchoolYear.find(el=>el.status == 1)?.id : dataSchoolYear[0]?.id;
        if(currentSchoolYear){
          let dataTerms = dataSchoolYear.find(el=>el.id == currentSchoolYear)?.terms;
          let el = dataTerms?.find(sub=>sub.isCurrent == 1);
          let currentTerm = el ? String(el?.index) : String(dataTerms[0].index);
          localStorage.setItem("currentSchoolYear", currentSchoolYear);
          localStorage.setItem("currentTerm", currentTerm);
        }
      }
    }
  }

  changeLanguage() {
    localStorage.setItem('language', this.lang);
    this.translocoService.setActiveLang(this.lang);
  }

  logout() {
    this.authService.logout().subscribe((res: any) => {
      if (res.status == 1) {
        let lang = localStorage.getItem('language');
        localStorage.clear();
        localStorage.setItem('language', lang);
        this.router.navigate(['/auth/login'], {
          queryParams: {},
        });
      }
    });
  }
}
