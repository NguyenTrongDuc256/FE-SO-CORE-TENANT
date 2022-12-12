import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/_services/general.service';
import { StudentService } from 'src/app/_services/layout-tenant/student/student.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { AVATAR_DEFAULT } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-tab-student-person-info-tenant',
  templateUrl: './tab-student-person-info-tenant.component.html',
  styleUrls: ['./tab-student-person-info-tenant.component.scss']
})
export class TabStudentPersonInfoTenantComponent implements OnInit {
  avatar = AVATAR_DEFAULT;
  isLoading = false;
  studentDetail;
  percentFileUserCompleted: string;
  @Input() studentId: string;
  constructor(
    private studentService: StudentService,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,

  ) { }

  ngOnInit() {
    this.getStudentPesonInfo();
  }
  getStudentPesonInfo() {
    this.isLoading = true;
    this.studentService.getStudentPesonInfo(this.studentId).subscribe((res: any) => {
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
