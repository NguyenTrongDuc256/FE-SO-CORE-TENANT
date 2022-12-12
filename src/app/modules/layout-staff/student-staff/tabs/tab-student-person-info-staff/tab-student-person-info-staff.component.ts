
import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/_services/general.service';
import { StudentStaffService } from 'src/app/_services/layout-staff/student/student-staff.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { AVATAR_DEFAULT } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-tab-student-person-info-staff',
  templateUrl: './tab-student-person-info-staff.component.html',
  styleUrls: ['./tab-student-person-info-staff.component.scss']
})
export class TabStudentPersonInfoStaffComponent implements OnInit {
  percentFileUserCompleted: string;
  avatar = AVATAR_DEFAULT;
  isLoading = false;
  studentDetail;
  @Input() studentId: string;
  constructor(
    private studentStaffService: StudentStaffService,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,

  ) { }

  ngOnInit() {
    this.getStudentPesonInfo();
  }
  getStudentPesonInfo() {
    this.isLoading = true;
    this.studentStaffService.getStudentPesonInfo(this.studentId).subscribe((res: any) => {
      this.studentDetail = res.data;
      this.percentFileUserCompleted = this.studentDetail?.percentFileUserCompleted + '%';

      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);

    }
    );
  }
}

