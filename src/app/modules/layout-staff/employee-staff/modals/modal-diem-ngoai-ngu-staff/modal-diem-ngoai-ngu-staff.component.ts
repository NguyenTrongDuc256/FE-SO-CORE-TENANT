import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {translate} from "@ngneat/transloco";
import {MoetCategories} from "src/app/_models/layout-tenant/employee/employee.model";
import {Validate} from "src/app/_models/layout-tenant/employee/validate.model";

@Component({
  selector: 'app-modal-diem-ngoai-ngu-staff',
  templateUrl: './modal-diem-ngoai-ngu-staff.component.html',
  styleUrls: ['./modal-diem-ngoai-ngu-staff.component.scss']
})
export class ModalDiemNgoaiNguStaffComponent implements OnInit {
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
    ngoaiNgu: [
      {
        type: "required",
        message: 'employee.validators.ngoaiNgu.required',
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
    if (this.dataModal.duLieuDiemNgoaiNgu.length > 0) {
      this.dataTemporary = this.dataModal.duLieuDiemNgoaiNgu;
      this.dataModal.duLieuDiemNgoaiNgu.forEach((item: any) => {
        this.themDiemNgoaiNgu(item);
      });
    } else {
      this.themDiemNgoaiNgu();
    }
  }

  closeModal(sendData: any): void {
    let data: any[] = [];
    if (this.ngoaiNgu.value.length > 0) {
      this.ngoaiNgu.value.forEach((item: any, index: number) => {
        if (item.isInput == 0) data.push(item);
        if (item.isInput == 1 && item.isUpdate == 1) {
          data.push({
            ngoaiNgu: this.dataTemporary[index].ngoaiNgu,
            trinhDo: this.dataTemporary[index].trinhDo,
            diem: this.dataTemporary[index].diem,
            date: this.dataTemporary[index].date,
            note: this.dataTemporary[index].note,
            isInput: 0,
            isUpdate: 0,
            trinhDoNgoaiNguList: this.moetCategories.trinh_do_ngoai_ngu
          });
        }
      });
    }
    this.activeModal.close(data);
  }

  dataTimeOutput(event: any, index: number) {
    if (((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('date').value != event) {
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('date').patchValue(Number(event));
    }
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      ngoaiNgu: this.fb.array([])
    });
  }

  get ngoaiNgu(): FormArray {
    return this.formGroup.get('ngoaiNgu') as FormArray;
  }

  themDiemNgoaiNgu(data: any = null): void {
    const itemForm = this.fb.group({
      ngoaiNgu: [data ? data.ngoaiNgu : '', [Validators.required]],
      trinhDo: [data ? data.trinhDo : ''],
      diem: [data ? data.diem : ''],
      date: [data ? data.date : this.currentDate],
      note: [data ? data.note : ''],
      isInput: data && data.isInput == undefined ? 0 : [data ? data.isInput : 1],
      isUpdate: data && data.isInput == undefined ? 0 : [data ? data.isUpdate : 0],
      trinhDoNgoaiNguList: [],
    })
    this.ngoaiNgu.push(itemForm);
  }

  deleteItemFormArray(index: number): void {
    this.ngoaiNgu.removeAt(index);
  }

  getFormGroupOfFormArray(index: number) {
    return this.ngoaiNgu.controls[index] as FormGroup;
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
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
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
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('date').patchValue(item.date);
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('isInput').patchValue(1);
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(1);
  }

  update(dataForm: FormGroup, index): void {
    if (dataForm.valid) {
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('ngoaiNgu').patchValue(dataForm.value.ngoaiNgu);
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('trinhDo').patchValue(dataForm.value.trinhDo);
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('diem').patchValue(dataForm.value.diem);
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('date').patchValue(dataForm.value.date);
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('note').patchValue(dataForm.value.note);
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  cancel(index: number): void {
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('ngoaiNgu').patchValue(this.dataTemporary[index].ngoaiNgu);
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('trinhDo').patchValue(this.dataTemporary[index].trinhDo);
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('diem').patchValue(this.dataTemporary[index].diem);
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('date').patchValue(this.dataTemporary[index].date);
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('note').patchValue(this.dataTemporary[index].note);
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
  }

  getNameTrinhDo(maTrinhDo: string) {
    let tenTrinhDo = '';
    this.moetCategories.trinh_do_ngoai_ngu.forEach((item) => {
      if (maTrinhDo == item.code) {
        tenTrinhDo = item.name;
      }
    });
    return tenTrinhDo;
  }

  getNameNgoaiNgu(maNgoaiNgu: string) {
    let tenNgoaiNgu = '';
    this.moetCategories.ngoai_ngu.forEach((item) => {
      if (maNgoaiNgu == item.code) {
        tenNgoaiNgu = item.name;
      }
    });
    return tenNgoaiNgu;
  }

  onChangengoaiNguChinh(event: string, index: number): void {
    let trinhDoNgoaiNguList: any = [];
    if (event) {
      trinhDoNgoaiNguList = this.moetCategories.trinh_do_ngoai_ngu.filter(
        el => el.parentCode == event
      );
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('trinhDoNgoaiNguList').patchValue(trinhDoNgoaiNguList);
    } else {
      ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('trinhDoNgoaiNguList').patchValue([]);
    }
    ((this.formGroup.get('ngoaiNgu') as FormArray).at(index) as FormGroup).get('trinhDo').patchValue('');
  }
}
