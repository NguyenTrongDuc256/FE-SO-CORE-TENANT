import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  ClassList,
} from 'src/app/_models/layout-teacher/class-manager/class.model';
import {ClassManagerService} from 'src/app/_services/layout-teacher/class-manager/class-manager.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  ATTENDANCE_RECORDED,
  CLASS_TYPE,
  DATA_PERMISSION,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT, STATUS_COURSE,
} from 'src/app/_shared/utils/constant';
import { Router } from '@angular/router';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-class-list-teacher',
  templateUrl: './class-list-teacher.component.html',
  styleUrls: ['./class-list-teacher.component.scss'],
})
export class ClassListTeacherComponent implements OnInit {
  permission = DATA_PERMISSION;
  isLoading = false;
  keyWord: string = '';
  type: number | string = '';
  status: number | string = '';
  gradeId: string = '';
  gradeList = localStorage.getItem('dataConfigSystem') ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades : null;
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize = 0;
  classList: ClassList[];
  classType = CLASS_TYPE;
  attendanceRecorded = ATTENDANCE_RECORDED;
  classStatus = STATUS_COURSE;

  constructor(
    private classManagerService: ClassManagerService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private router:Router,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.getClassList();
  }

  getClassList() {
    this.isLoading = true;
    let dataRequest = {
      keyWord: this.keyWord,
      type: this.type,
      status:this.status,
      gradeId:this.gradeId ,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    };
    this.classManagerService.getClassList(dataRequest).subscribe(
      (res: any) => {
          this.classList = res.data.data;
          this.collectionSize = res.data?.totalItems;
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
       this.generalService.showToastMessageError400(err)
      });
  }

  changeIsActie() {
    this.pageIndex = 1;
    this.getClassList();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getClassList();
  }

  viewDetailClass(item:any){
    if(item.type == 1){
      this.router.navigate([`teacher/class-manager/detail-course/${item.id}`]);
    }else{
      this.router.navigate([`teacher/class-manager/detail-homeroom-class/${item.id}`]);
    }
  }
}
