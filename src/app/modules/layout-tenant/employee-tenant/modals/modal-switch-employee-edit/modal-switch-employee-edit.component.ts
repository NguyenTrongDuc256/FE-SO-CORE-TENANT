import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal-switch-employee-edit',
  templateUrl: './modal-switch-employee-edit.component.html',
  styleUrls: ['./modal-switch-employee-edit.component.scss']
})
export class ModalSwitchEmployeeEditComponent implements OnInit {
  @Input() dataModal: any;
  employeeInfo: any;
  data: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.employeeInfo = this.dataModal.dataFromParent.dataEmployee;
    this.employeeInfo.employees.forEach(el => {
      if (this.employeeInfo.schools.find(school => el.schoolId == school.id)) {
        this.data.push({
          employeeId: el.id,
          schoolName: this.employeeInfo.schools.find(school => el.schoolId == school.id).name || '',
        });
      }
    });
  }

  closeModal(sendData: any): void {
    this.activeModal.close(false);
  }

  onClickeEdit(employeeId: string) {
    this.router.navigate(['/tenant/employee/create-or-edit', employeeId]);
    this.activeModal.close(false);
  }
}
