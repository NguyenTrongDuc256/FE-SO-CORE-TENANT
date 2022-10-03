import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {translate} from "@ngneat/transloco";
import {MoetCategories} from "src/app/_models/layout-tenant/employee/employee.model";
import {Validate} from "src/app/_models/layout-tenant/employee/validate.model";

@Component({
  selector: 'app-modal-ky-luat',
  templateUrl: './modal-ky-luat.component.html',
  styleUrls: ['./modal-ky-luat.component.scss']
})
export class ModalKyLuatComponent implements OnInit {
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
  validationMsg: Validate = {
    loai: [
      {
        type: "required",
        message: translate('employee.validators.loaiKyLuat.required'),
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
    if (this.dataModal.duLieuKyLuatGV.length > 0) {
      this.dataTemporary = this.dataModal.duLieuKyLuatGV;
      this.dataModal.duLieuKyLuatGV.forEach((item: any) => {
        this.themKyLuat(item);
      });
    } else {
      this.themKyLuat();
    }
  }

  closeModal(sendData: any): void {
    let data: any[] = [];
    if (this.kyLuat.value.length > 0) {
      this.kyLuat.value.forEach((item: any, index: number) => {
        if (item.isInput == 0) data.push(item);
        if (item.isInput == 1 && item.isUpdate == 1) {
          data.push({
            loai: this.dataTemporary[index].loai,
            capKyQD: this.dataTemporary[index].capKyQD,
            soQD: this.dataTemporary[index].soQD,
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
    if (((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('date').value != event) {
      ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('date').patchValue(Number(event));
    }
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      kyLuat: this.fb.array([])
    });
  }

  get kyLuat(): FormArray {
    return this.formGroup.get('kyLuat') as FormArray;
  }

  themKyLuat(data: any = null): void {
    const itemForm = this.fb.group({
      loai: [data ? data.loai : '', [Validators.required]],
      capKyQD: [data ? data.capKyQD : ''],
      soQD: [data ? data.soQD : ''],
      date: [data ? data.date : this.currentDate],
      isInput: [data ? data.isInput : 1],
      isUpdate: [data ? data.isUpdate : 0],
    })
    this.kyLuat.push(itemForm);
  }

  deleteItemFormArray(index: number): void {
    this.kyLuat.removeAt(index);
  }

  store(dataForm: any, index: number): void {
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    if (this.dataTemporary[index]) {
      this.dataTemporary[index] = dataForm;
    } else {
      this.dataTemporary.push(dataForm);
    }
  }

  edit(item: any, index: number): void {
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('date').patchValue(item.date);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('isInput').patchValue(1);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(1);
  }

  update(dataForm, index): void {
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('loai').patchValue(dataForm.loai);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('capKyQD').patchValue(dataForm.capKyQD);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('soQD').patchValue(dataForm.soQD);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('date').patchValue(dataForm.date);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
  }

  cancel(index: number): void {
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('loai').patchValue(this.dataTemporary[index].loai);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('capKyQD').patchValue(this.dataTemporary[index].capKyQD);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('soQD').patchValue(this.dataTemporary[index].soQD);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('date').patchValue(this.dataTemporary[index].date);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('kyLuat') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
  }

  getNameLoaiKyLuat(code: string) {
    let name = '';
    this.moetCategories.hinh_thuc_ky_luat.forEach((item) => {
      if (code == item.code) {
        name = item.name;
      }
    });
    return name;
  }
}
