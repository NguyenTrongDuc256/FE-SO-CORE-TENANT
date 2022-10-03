
import { Component, Input, OnInit } from '@angular/core';
import { StudentStaffService } from 'src/app/_services/layout-staff/student/student-staff.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { AVATAR_DEFAULT } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-tab-student-person-info-staff',
  templateUrl: './tab-student-person-info-staff.component.html',
  styleUrls: ['./tab-student-person-info-staff.component.scss']
})
export class TabStudentPersonInfoStaffComponent implements OnInit {

  avatar = AVATAR_DEFAULT;
  isLoading = false;
  studentDetail;
  @Input() studentId: string;
  constructor(
    private studentStaffService: StudentStaffService,
    private showMessage: ShowMessageService,

  ) { }

  ngOnInit() {
    this.getStudentPesonInfo();
  }
  getStudentPesonInfo() {
    this.isLoading = true;
    this.studentStaffService.getStudentPesonInfo(this.studentId).subscribe((res: any) => {
      if (res.status == 1) {
        this.studentDetail = res.data;
      } else { 
        this.showMessage.error(res.msg);
      }
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
    }
    );
  }
}

