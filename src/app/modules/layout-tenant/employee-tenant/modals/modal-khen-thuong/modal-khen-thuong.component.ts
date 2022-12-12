import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {translate} from "@ngneat/transloco";
import {MoetCategories} from "src/app/_models/layout-tenant/employee/employee.model";
import {Validate} from "src/app/_models/layout-tenant/employee/validate.model";

@Component({
  selector: 'app-modal-khen-thuong',
  templateUrl: './modal-khen-thuong.component.html',
  styleUrls: ['./modal-khen-thuong.component.scss']
})
export class ModalKhenThuongComponent implements OnInit {
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
  validationMessages: Validate = {
    loai: [
      {
        type: "required",
        message: 'employee.validators.loai.required',
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
    if (this.dataModal.duLieuKhenThuongGV.length > 0) {
      this.dataTemporary = this.dataModal.duLieuKhenThuongGV;
      this.dataModal.duLieuKhenThuongGV.forEach((item: any) => {
        this.themKhenThuong(item);
      });
    } else {
      this.themKhenThuong();
    }
  }

  closeModal(sendData: any): void {
    let data: any[] = [];
    if (this.khenThuong.value.length > 0) {
      this.khenThuong.value.forEach((item: any, index: number) => {
        if (item.isInput == 0) data.push(item);
        if (item.isInput == 1 && item.isUpdate == 1) {
          data.push({
            loai: this.dataTemporary[index].loai,
            noiDung: this.dataTemporary[index].noiDung,
            capKhenThuong: this.dataTemporary[index].capKhenThuong,
            soQuyetDinh: this.dataTemporary[index].soQuyetDinh,
            date: this.dataTemporary[index].date,
            isInput: 0,
            isUpdate: 0,
          });
        }
      });
    }
    this.activeModal.close(data);
  }

  dataTimeOutput(event: any, index: number) {
    if (((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('date').value != event) {
      ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('date').patchValue(Number(event));
    }
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      khenThuong: this.fb.array([])
    });
  }

  get khenThuong(): FormArray {
    return this.formGroup.get('khenThuong') as FormArray;
  }

  themKhenThuong(data: any = null): void {
    const itemForm = this.fb.group({
      loai: [data ? data.loai : '', [Validators.required]],
      noiDung: data ? data.noiDung : '',
      capKhenThuong: data ? data.capKhenThuong : '',
      soQuyetDinh: data ? data.soQuyetDinh : '',
      date: data ? data.date : this.currentDate,
      isInput: data && data.isInput == undefined ? 0 : [data ? data.isInput : 1],
      isUpdate: data && data.isInput == undefined ? 0 : [data ? data.isUpdate : 0],
    })
    this.khenThuong.push(itemForm);
  }

  deleteItemFormArray(index: number): void {
    this.khenThuong.removeAt(index);
  }

  getFormGroupOfFormArray(index: number) {
    return this.khenThuong.controls[index] as FormGroup;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
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
      ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
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
    ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('date').patchValue(item.date);
    ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(1);
    ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(1);
  }

  update(dataForm: FormGroup, index): void {
    if (dataForm.valid) {
      ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('loai').patchValue(dataForm.value.loai);
      ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('noiDung').patchValue(dataForm.value.noiDung);
      ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('capKhenThuong').patchValue(dataForm.value.capKhenThuong);
      ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('soQuyetDinh').patchValue(dataForm.value.soQuyetDinh);
      ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('date').patchValue(dataForm.value.date);
      ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
      ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }

  }

  cancel(index: number): void {
    ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('loai').patchValue(this.dataTemporary[index].loai);
    ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('noiDung').patchValue(this.dataTemporary[index].noiDung);
    ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('capKhenThuong').patchValue(this.dataTemporary[index].capKhenThuong);
    ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('soQuyetDinh').patchValue(this.dataTemporary[index].soQuyetDinh);
    ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('date').patchValue(this.dataTemporary[index].date);
    ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('khenThuong') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
  }

  getNameLoaiKhenThuong(code: string) {
    let name = '';
    this.moetCategories.khen_thuong_giao_vien.forEach((item) => {
      if (code == item.code) {
        name = item.name;
      }
    });
    return name;
  }
}
