
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectStaffService } from 'src/app/_services/layout-staff/subject/subject-staff.service';



@Component({
  selector: 'app-subject-list-staff',
  templateUrl: './subject-list-staff.component.html',
  styleUrls: ['./subject-list-staff.component.scss']
})
export class SubjectListStaffComponent implements OnInit {

  // permission = DATA_PERMISSION;
  dataSource: any[] = [];
  keyWord: string = "";
  isLoading: boolean = false;
  isActive: number = null;
  chech: boolean = true;
  constructor(
    private modalService: NgbModal,
    private subjectService: SubjectStaffService,
    // private showMessageService: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.getDataSource();
  }

  getDataSource() {
    this.isLoading = true;
    this.subjectService.getListStaff(this.keyWord, this.isActive).subscribe((res: any) => {
      console.log(res);

      this.isLoading = false;
      if (res.status == 1) {
        this.dataSource = res.data;
        console.log(this.dataSource);

      } else {
        // this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }


  // checkChangeKeywordSerach(event: any) {
  //   this.keyWord = event.target.value;
  //   if (event.keyCode == 13) {
  //     this.getDataSource();
  //   }
  // }

  // dataTimeOutput(event: any) {
  // }

  // getTextStatus(value: number) {
  //   return value == 1 ? translate('campus.activated') : translate('campus.locked');
  // }

  // changeFilterStatus(event){
  //   this.isActive = event.target.value;
  //   this.getDataSource();
  // }





}
