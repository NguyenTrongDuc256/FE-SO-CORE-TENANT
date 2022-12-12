import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {translate} from "@ngneat/transloco";
import {MoetCategories} from "src/app/_models/layout-tenant/employee/employee.model";
import {Validate} from "src/app/_models/layout-tenant/employee/validate.model";

@Component({
  selector: 'app-modal-qua-trinh-cong-tac',
  templateUrl: './modal-qua-trinh-cong-tac.component.html',
  styleUrls: ['./modal-qua-trinh-cong-tac.component.scss']
})
export class ModalQuaTrinhCongTacComponent implements OnInit {
  nzNotFoundContent: string = translate('employee.notFoundContent');
  txtSelect: string = translate('employee.select');
  @Input() dataModal: any;
  formGroup: FormGroup;
  moetCategories: MoetCategories;
  isLoading: boolean = false;
  isSubmitForm: boolean = true;
  formDate: any = null;
  toDate: any = null;
  timePicker: boolean = false;
  dataTemporary: any[] = []; // biến lưu dữ liệu tạm thời để xử lý logic
  validationMessages: Validate = {
    content: [
      {
        type: "required",
        message: 'employee.validators.content.required'
      }
    ]
  };

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.moetCategories = this.dataModal.dataFromParent;
    this.initForm();
    if (this.dataModal.duLieuQuaTrinhCongTac.length > 0) {
      this.dataTemporary = this.dataModal.duLieuQuaTrinhCongTac;
      this.dataModal.duLieuQuaTrinhCongTac.forEach((item: any) => {
        this.themQuaTrinhCongTac(item);
      });
    } else {
      this.themQuaTrinhCongTac();
    }
  }

  closeModal(sendData: any): void {
    let data: any[] = [];
    if (this.quaTrinhCongTac.value.length > 0) {
      this.quaTrinhCongTac.value.forEach((item: any, index: number) => {
        if (item.isInput == 0) data.push(item);
        if (item.isInput == 1 && item.isUpdate == 1) {
          data.push({
            fromDate: this.dataTemporary[index].fromDate,
            toDate: this.dataTemporary[index].toDate,
            content: this.dataTemporary[index].content,
            isInput: 0,
            isUpdate: 0,
          });
        }
      });
    }
    this.activeModal.close(data);
  }

  dataFromDateOutput(event: any, index: number) {
    if (((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('fromDate').value != event) {
      ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('fromDate').patchValue(Number(event));
    }
  }

  dataToDateOutput(event: any, index: number) {
    if (((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('toDate').value != event) {
      ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('toDate').patchValue(Number(event));
    }
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      quaTrinhCongTac: this.fb.array([])
    });
  }

  get quaTrinhCongTac(): FormArray {
    return this.formGroup.get('quaTrinhCongTac') as FormArray;
  }

  themQuaTrinhCongTac(data: any = null): void {
    const itemForm = this.fb.group({
      fromDate: data ? data.fromDate : this.formDate,
      toDate: data ? data.toDate : this.toDate,
      content: [data ? data.content : '', [Validators.required]],
      isInput: data && data.isInput == undefined ? 0 : [data ? data.isInput : 1],
      isUpdate: data && data.isInput == undefined ? 0 : [data ? data.isUpdate : 0],
    })
    this.quaTrinhCongTac.push(itemForm);
  }

  deleteItemFormArray(index: number): void {
    this.quaTrinhCongTac.removeAt(index);
  }

  getFormGroupOfFormArray(index: number) {
    return this.quaTrinhCongTac.controls[index] as FormGroup;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((item: FormGroup) => {
          this.validateAllFormFields(item);
        })
      }
    });
  }

  store(dataForm: FormGroup, index: number): void {
    if (dataForm.valid) {
      ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
      if (this.dataTemporary[index]) {
        this.dataTemporary[index] = dataForm.value;
      } else {
        this.dataTemporary.push(dataForm.value);
      }
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  edit(item: any, index: number): void {
    ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('fromDate').patchValue(item.fromDate);
    ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('toDate').patchValue(item.toDate);
    ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('isInput').patchValue(1);
    ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(1);
  }

  update(dataForm: FormGroup, index): void {
    if (dataForm.valid) {
      ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('fromDate').patchValue(dataForm.value.fromDate);
      ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('toDate').patchValue(dataForm.value.toDate);
      ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('content').patchValue(dataForm.value.content);
      ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
      ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  cancel(index: number): void {
    ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('fromDate').patchValue(this.dataTemporary[index].fromDate);
    ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('toDate').patchValue(this.dataTemporary[index].toDate);
    ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('content').patchValue(this.dataTemporary[index].content);
    ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('quaTrinhCongTac') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
  }
}
