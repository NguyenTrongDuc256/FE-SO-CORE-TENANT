import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {translate} from "@ngneat/transloco";
import {MoetCategories} from "src/app/_models/layout-tenant/employee/employee.model";
import {Validate} from "src/app/_models/layout-tenant/employee/validate.model";

@Component({
  selector: 'app-modal-dien-bien-luong-staff',
  templateUrl: './modal-dien-bien-luong-staff.component.html',
  styleUrls: ['./modal-dien-bien-luong-staff.component.scss']
})
export class ModalDienBienLuongStaffComponent implements OnInit {
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
    ngach: [
      {
        type: "required",
        message: 'employee.validators.ngach.required',
      },
    ],
    bacLuong: [
      {
        type: "required",
        message: 'employee.validators.bacLuong.required',
      },
    ],
    heSoLuong: [
      {
        type: "required",
        message: 'employee.validators.heSoLuong.required',
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
    if (this.dataModal.duLieuDienBienLuong.length > 0) {
      this.dataTemporary = this.dataModal.duLieuDienBienLuong;
      this.dataModal.duLieuDienBienLuong.forEach((item: any) => {
        this.themDienBienLuong(item);
      });
    } else {
      this.themDienBienLuong();
    }
  }

  closeModal(sendData: any): void {
    let data: any[] = [];
    if (this.dienBienQuaTrinhLuong.value.length > 0) {
      this.dienBienQuaTrinhLuong.value.forEach((item: any, index: number) => {
        if (item.isInput == 0) data.push(item);
        if (item.isInput == 1 && item.isUpdate == 1) {
          data.push({
            date: this.dataTemporary[index].date,
            ngach: this.dataTemporary[index].ngach,
            bacLuong: this.dataTemporary[index].bacLuong,
            phanTramVuotKhung: this.dataTemporary[index].phanTramVuotKhung,
            heSoLuong: this.dataTemporary[index].heSoLuong,
            isInput: 0,
            isUpdate: 0,
          });
        }
      });
    }
    this.activeModal.close(data);
  }

  dataTimeOutput(event: any, index: number) {
    if (((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('date').value != event) {
      ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('date').patchValue(Number(event));
    }
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      dienBienQuaTrinhLuong: this.fb.array([])
    });
  }

  get dienBienQuaTrinhLuong(): FormArray {
    return this.formGroup.get('dienBienQuaTrinhLuong') as FormArray;
  }

  themDienBienLuong(data: any = null): void {
    const itemForm = this.fb.group({
      date: [data ? data.date : this.currentDate],
      ngach: [data ? data.ngach : '', [Validators.required]],
      bacLuong: [data ? data.bacLuong : '', [Validators.required]],
      phanTramVuotKhung: [data ? data.phanTramVuotKhung : ''],
      heSoLuong: [data ? data.heSoLuong : 1, [Validators.required]],
      isInput: data && data.isInput == undefined ? 0 : [data ? data.isInput : 1],
      isUpdate: data && data.isInput == undefined ? 0 : [data ? data.isUpdate : 0],
    })
    this.dienBienQuaTrinhLuong.push(itemForm);
  }

  deleteItemFormArray(index: number): void {
    this.dienBienQuaTrinhLuong.removeAt(index);
  }

  getFormGroupOfFormArray(index: number) {
    return this.dienBienQuaTrinhLuong.controls[index] as FormGroup;
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
      ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
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
    ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('date').patchValue(item.date);
    ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(1);
    ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(1);
  }

  update(dataForm: FormGroup, index): void {
    if (dataForm.valid) {
      ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('date').patchValue(dataForm.value.date);
      ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('ngach').patchValue(dataForm.value.ngach);
      ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('bacLuong').patchValue(dataForm.value.bacLuong);
      ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('phanTramVuotKhung').patchValue(dataForm.value.phanTramVuotKhung);
      ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('heSoLuong').patchValue(dataForm.value.heSoLuong);
      ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
      ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  cancel(index: number): void {
    ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('date').patchValue(this.dataTemporary[index].date);
    ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('ngach').patchValue(this.dataTemporary[index].ngach);
    ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('bacLuong').patchValue(this.dataTemporary[index].bacLuong);
    ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('phanTramVuotKhung').patchValue(this.dataTemporary[index].phanTramVuotKhung);
    ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('heSoLuong').patchValue(this.dataTemporary[index].heSoLuong);
    ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('dienBienQuaTrinhLuong') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
  }

  getNameNgach(maNgach: string) {
    let tenNgach = '';
    this.moetCategories.ngach.forEach((item) => {
      if (maNgach == item.code) {
        tenNgach = item.name;
      }
    });
    return tenNgach;
  }

  getNameBac(maNgach: string) {
    let tenBacLuong = '';
    this.moetCategories.bac_luong.forEach((item) => {
      if (maNgach == item.code) {
        tenBacLuong = item.name;
      }
    });
    return tenBacLuong;
  }
}
