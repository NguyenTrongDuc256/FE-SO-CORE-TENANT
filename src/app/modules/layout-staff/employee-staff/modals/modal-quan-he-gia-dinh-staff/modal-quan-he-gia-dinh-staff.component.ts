import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {translate} from "@ngneat/transloco";
import {MoetCategories} from "src/app/_models/layout-tenant/employee/employee.model";
import {Validate} from "src/app/_models/layout-tenant/employee/validate.model";
import * as moment from "moment";

@Component({
  selector: 'app-modal-quan-he-gia-dinh-staff',
  templateUrl: './modal-quan-he-gia-dinh-staff.component.html',
  styleUrls: ['./modal-quan-he-gia-dinh-staff.component.scss']
})
export class ModalQuanHeGiaDinhStaffComponent implements OnInit {
  nzNotFoundContent: string = translate('employee.notFoundContent');
  txtSelect: string = translate('employee.select');
  @Input() dataModal: any;
  formGroup: FormGroup;
  moetCategories: MoetCategories;
  isLoading: boolean = false;
  isSubmitForm: boolean = true;
  currentDate: any = null;
  timePicker: boolean = false;
  dataTemporary: any[] = []; // biến lưu dữ liệu tạm thời để xử lý logic
  dateCurrent: string = moment().format('X');
  validationMessages: Validate = {
    moiQuanHe: [
      {
        type: "required",
        message: 'employee.validators.moiQuanHe.required',
      },
    ],
    fullName: [
      {
        type: "required",
        message: 'employee.validators.fullName.required',
      },
    ],
  };

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.moetCategories = this.dataModal.dataFromParent;
    this.initForm();
    if (this.dataModal.duLieuQuanHeGiaDinh.length > 0) {
      this.dataTemporary = this.dataModal.duLieuQuanHeGiaDinh;
      this.dataModal.duLieuQuanHeGiaDinh.forEach((item: any) => {
        this.themQuanHeGiaDinh(item);
      });
    } else {
      this.themQuanHeGiaDinh();
    }
  }

  closeModal(sendData: any): void {
    let data: any[] = [];
    if (this.qhGiaDinh.value.length > 0) {
      this.qhGiaDinh.value.forEach((item: any, index: number) => {
        if (item.isInput == 0) data.push(item);
        if (item.isInput == 1 && item.isUpdate == 1) {
          data.push({
            moiQuanHe: this.dataTemporary[index].moiQuanHe,
            fullName: this.dataTemporary[index].fullName,
            dateOfBirth: this.dataTemporary[index].dateOfBirth,
            content: this.dataTemporary[index].content,
            isInput: 0,
            isUpdate: 0,
          });
        }
      });
    }
    this.activeModal.close(data);
  }

  dataTimeOutput(event: any, index: number) {
    if (((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('dateOfBirth').value != event) {
      ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('dateOfBirth').patchValue(Number(event));
    }
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      qhGiaDinh: this.fb.array([])
    });
  }

  get qhGiaDinh(): FormArray {
    return this.formGroup.get('qhGiaDinh') as FormArray;
  }

  themQuanHeGiaDinh(data: any = null): void {
    const itemForm = this.fb.group({
      moiQuanHe: [data ? data.moiQuanHe : '', [Validators.required]],
      fullName: [data ? data.fullName : '', [Validators.required]],
      dateOfBirth: [data ? data.dateOfBirth : this.currentDate],
      content: [data ? data.content : ''],
      isInput: data && data.isInput == undefined ? 0 : [data ? data.isInput : 1],
      isUpdate: data && data.isInput == undefined ? 0 : [data ? data.isUpdate : 0],
    })
    this.qhGiaDinh.push(itemForm);
  }

  deleteItemFormArray(index: number): void {
    this.qhGiaDinh.removeAt(index);
  }

  getFormGroupOfFormArray(index: number) {
    return this.qhGiaDinh.controls[index] as FormGroup;
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
      ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
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
    ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('dateOfBirth').patchValue(item.dateOfBirth);
    ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('isInput').patchValue(1);
    ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(1);
  }

  update(dataForm: FormGroup, index): void {
    if (dataForm.valid) {
      ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('moiQuanHe').patchValue(dataForm.value.moiQuanHe);
      ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('fullName').patchValue(dataForm.value.fullName);
      ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('dateOfBirth').patchValue(dataForm.value.dateOfBirth);
      ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('content').patchValue(dataForm.value.content);
      ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
      ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  cancel(index: number): void {
    ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('moiQuanHe').patchValue(this.dataTemporary[index].moiQuanHe);
    ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('fullName').patchValue(this.dataTemporary[index].fullName);
    ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('dateOfBirth').patchValue(this.dataTemporary[index].dateOfBirth);
    ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('content').patchValue(this.dataTemporary[index].content);
    ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('qhGiaDinh') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
  }

  getNameMoiQuanHe(code: string) {
    let name = '';
    this.moetCategories.moi_quan_he.forEach((item) => {
      if (code == item.code) {
        name = item.name;
      }
    });
    return name;
  }

}
