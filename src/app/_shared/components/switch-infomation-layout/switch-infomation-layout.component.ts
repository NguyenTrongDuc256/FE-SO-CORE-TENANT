import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthHTTPService } from 'src/app/modules/auth/services/auth-http/auth-http.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { MESSAGE_ERROR_CALL_API } from '../../utils/constant';

@Component({
  selector: 'app-switch-infomation-layout',
  templateUrl: './switch-infomation-layout.component.html',
  styleUrls: ['./switch-infomation-layout.component.scss']
})
export class SwitchInfomationLayoutComponent implements OnInit {
  currentMoet: any = null;
  currentStudent: any = null;
  currentSchoolYear: any = null;
  currentTerm: any = null;
  dataMoet: any[] = [];
  dataStudent: any[] = [];
  dataSchoolYear: any[] = [1, 2, 3];
  dataTerms: any[] = [];
  dataLogin: any;
  dataConfigSystem:any;
  currentLayout: any = localStorage.getItem("currentLayout");
  isCollapsed: boolean = true;
  dataCurrent:any = {
    name:'',
    schooYearName:'',
    termName:''
  }
  constructor(
    private authHTTPService:AuthHTTPService,
    private showMessageService:ShowMessageService
  ) { }

  ngOnInit() {
    this.currentMoet = null;
    this.currentStudent = null;
    this.dataMoet = [];
    this.dataStudent = [];
    this.dataTerms = [];
    if(!localStorage.getItem("dataConfigSystem")){
      this.getDataConfigSystem();
    }else{
      this.convertDataConfigSystem();
    }
    this.getInfomationData();
  }

  getDataConfigSystem(){
    this.authHTTPService.getDataConfig().subscribe((res:any)=>{
      if(res.status == 1){
        localStorage.setItem("dataConfigSystem",JSON.stringify(res.data));
        this.convertDataConfigSystem();
      }else{
        this.showMessageService.error(res.msg);
      }
    },(_err)=>{
      this.showMessageService.error(MESSAGE_ERROR_CALL_API);
    })
  }

  convertDataConfigSystem(){
    this.dataConfigSystem = JSON.parse(localStorage.getItem("dataConfigSystem"));
    if(this.dataConfigSystem){
      this.dataSchoolYear = this.dataConfigSystem.schoolYears;
      if(this.dataSchoolYear && this.dataSchoolYear.length > 0){
        this.currentSchoolYear = localStorage.getItem("currentSchoolYear") ? localStorage.getItem("currentSchoolYear") :  this.dataSchoolYear.find(el=>el.status == 1)?.id;
        if(this.currentSchoolYear){
          this.dataTerms = this.dataSchoolYear.find(el=>el.id == this.currentSchoolYear)?.terms;
          this.currentTerm = localStorage.getItem("currentTerm") ? localStorage.getItem("currentTerm") : this.dataTerms?.find(sub=>sub.isCurrent == 1) ? String(this.dataTerms?.find(sub=>sub.isCurrent == 1)?.index) : String(this.dataTerms[0].index);
          localStorage.setItem("currentSchoolYear",this.currentSchoolYear);
          localStorage.setItem("currentTerm",this.currentTerm);
          // lay thong tin hien thi
          this.dataCurrent.name = JSON.parse(localStorage.getItem("currentUnit")).name;
          this.dataCurrent.schooYearName = this.dataSchoolYear.find(el=>el.status == 1)?.name;
          this.dataCurrent.termName = this.currentTerm ? this.dataTerms.find(el=>el.index == this.currentTerm).name : this.dataTerms[0].name;
        }
      }
    }
  }

  getInfomationData() {
    if (localStorage.getItem('Token')) {
      this.dataLogin = JSON.parse(
        this.decodeTokenLogin(localStorage.getItem('Token'))
      );
      switch (this.currentLayout) {
        case 'staff':
          this.currentMoet = JSON.parse(localStorage.getItem("currentUnit")).id;
          let dataMoetTempStaff = this.dataLogin?.StaffLayout;
          if (dataMoetTempStaff) {
            dataMoetTempStaff.forEach(element => {
              this.dataMoet.push({
                id: element.SchoolId,
                name: element.SchoolName,
                permissions: element.Permissions
              })
            });
          }
          break;
        case 'teacher':
          this.currentMoet = JSON.parse(localStorage.getItem("currentUnit")).id;
          let dataMoetTempTeacher = this.dataLogin?.TeacherLayout;
          if (dataMoetTempTeacher) {
            dataMoetTempTeacher.forEach(element => {
              this.dataMoet.push({
                id: element.SchoolId,
                name: element.SchoolName,
                permissions: element.Permissions
              })
            });
          }
          break;
        case 'parent':
          this.currentStudent = JSON.parse(localStorage.getItem("currentUnit")).id;
          this.dataLogin?.ParentLayout?.Students.forEach((pa) => {
            this.dataStudent.push({
              id: pa.Id,
              name: pa.FullName,
              schoolId: pa?.SchoolId,
              permissions: this.dataLogin?.ParentLayout?.Permissions,
            });
          });
          break;
        case 'student':
          // chi co permission
          this.dataStudent.push({
            id: this.dataLogin?.StudentLayout?.SchoolId,
            permissions: this.dataLogin?.StudentLayout?.Permissions
          });
          break;
        case 'omt':
          // chi co permission
          break;
        case 'department':
          this.currentMoet = JSON.parse(localStorage.getItem("currentUnit")).id;
          let dataMoetTempDepartment = this.dataLogin?.DepartmentLayout;
          if (dataMoetTempDepartment) {
            dataMoetTempDepartment.forEach(element => {
              this.dataMoet.push({
                id: element.DepartmentCode,
                name: element.DepartmentName,
                permissions: element.Permissions
              })
            });
          }
          break;
        case 'division':
          this.currentMoet = JSON.parse(localStorage.getItem("currentUnit")).id;
          let dataMoetTempDivision = this.dataLogin?.DivisionLayout;
          if (dataMoetTempDivision) {
            dataMoetTempDivision.forEach(element => {
              this.dataMoet.push({
                id: element.DivisionCode,
                name: element.DivisionName,
                permissions: element.Permissions
              })
            });
          }
          break;
        case 'school':
          this.currentMoet = JSON.parse(localStorage.getItem("currentUnit")).id;
          let dataMoetTempSchool = this.dataLogin?.SchoolLayout;
          if (dataMoetTempSchool) {
            dataMoetTempSchool.forEach(element => {
              this.dataMoet.push({
                id: element.SchoolCode,
                name: element.SchoolName,
                permissions: element.Permissions
              })
            });
          }
          break;
        case 'tenant':
          this.dataMoet.push({
            permissions: this.dataLogin?.TenantLayout?.Permissions
          });
          break;
        case 'campus':
          this.currentMoet = JSON.parse(localStorage.getItem("currentUnit")).id;
          let dataMoetTempCampus = this.dataLogin?.CampusLayout;
          if (dataMoetTempCampus) {
            dataMoetTempCampus.forEach(element => {
              this.dataMoet.push({
                id: element.CampusId,
                name: element.CampusName,
                permissions: element.Permissions
              })
            });
          }
          break;
        default:
          break;
      }
    }
  }

  decodeTokenLogin(token: string) {
    const helper = new JwtHelperService();
    return helper.decodeToken(token).data;
  }

  closeChangeInfo() {
    this.isCollapsed = true;
  }

  clickApplyInfo() {
    if(this.currentSchoolYear && this.currentTerm){
      this.isCollapsed = true;
      localStorage.setItem("currentSchoolYear",this.currentSchoolYear);
      localStorage.setItem("currentTerm",this.currentTerm);
      this.dataCurrent.schooYearName = this.dataConfigSystem.schoolYears.find(el=>el.id == this.currentSchoolYear)?.name;
      this.dataCurrent.termName = this.dataConfigSystem.schoolYears.find(el=>el.id == this.currentSchoolYear)?.terms?.find(sub=>sub.index == this.currentTerm).name;
      if (this.currentLayout == "parent") {
        let currentUnit = this.dataStudent.find((item) => item.id == this.currentStudent);
        this.dataCurrent.name = currentUnit.name;
        localStorage.setItem('currentUnit', JSON.stringify(currentUnit));
      } else if (this.currentLayout == "student") {
        localStorage.setItem('currentUnit', JSON.stringify(this.dataStudent[0]));
      } else if (this.currentLayout == "tenant") {
        localStorage.setItem('currentUnit', JSON.stringify(this.dataMoet[0]));
      } else {
        let currentUnit = this.dataMoet.find((item) => item.id == this.currentMoet);
        this.dataCurrent.name = currentUnit.name;
        localStorage.setItem('currentUnit', JSON.stringify(currentUnit));
      }
      window.location.reload();
    }else{
      this.isCollapsed = false;
    }
  }

}
