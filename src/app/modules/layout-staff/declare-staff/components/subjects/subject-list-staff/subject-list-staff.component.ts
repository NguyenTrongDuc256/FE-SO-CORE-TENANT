import {Component, OnInit} from '@angular/core';

import {
  DATA_PERMISSION,
  MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  TIME_OUT_LISTEN_FIREBASE,
} from '../../../../../../_shared/utils/constant';
import { SubjectStaffService } from '../../../../../../_services/layout-staff/declare/subject-staff.service';
import { SubjectListStaff } from '../../../../../../_models/layout-staff/declare/subject/subject.model';
import { ShowMessageService } from '../../../../../../_services/show-message.service';
import { GeneralService } from 'src/app/_services/general.service';

@Component({
  selector: 'app-subject-list-staff',
  templateUrl: './subject-list-staff.component.html',
  styleUrls: ['./subject-list-staff.component.scss'],
})
export class SubjectListStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  keyWord: string = '';
  educationalStages: number | string = '';
  subjectType: string = '';
  gradeType: string = '';
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT;
  isLoading: boolean = false;
  listSubjectStaff: SubjectListStaff[];
  collectionSize = 0;
  oldPageIndex = this.pageIndex;
  constructor(
    private subjectStaffService: SubjectStaffService,
    private showMessage: ShowMessageService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.getListSubjectStaff();
  }

  getListSubjectStaff() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    let dataRequest = {
      keyWord: this.keyWord,
      subjectType: this.subjectType,
      gradeType: this.gradeType,
      educationalStages: this.educationalStages,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    };
    this.subjectStaffService.getListSubjectStaff(dataRequest).subscribe(
      (res: any) => {
        this.listSubjectStaff = res.data.data;
        this.collectionSize = res.data?.totalItems;
        this.isLoading = false;
      },
      (_err: any) => {
        clearTimeout(timeoutCallAPI);
        this.generalService.showToastMessageError400(_err);
        this.isLoading = false;
      }
    );
  }

  changeIsActie() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = 1;
    this.getListSubjectStaff();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListSubjectStaff();
  }
}
