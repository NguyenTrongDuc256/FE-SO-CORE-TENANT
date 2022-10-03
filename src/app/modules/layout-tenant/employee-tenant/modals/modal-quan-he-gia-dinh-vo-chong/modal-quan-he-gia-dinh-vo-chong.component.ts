import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {translate} from "@ngneat/transloco";
import {MoetCategories} from "src/app/_models/layout-tenant/employee/employee.model";
import {Validate} from "src/app/_models/layout-tenant/employee/validate.model";

@Component({
  selector: 'app-modal-quan-he-gia-dinh-vo-chong',
  templateUrl: './modal-quan-he-gia-dinh-vo-chong.component.html',
  styleUrls: ['./modal-quan-he-gia-dinh-vo-chong.component.scss']
})
export class ModalQuanHeGiaDinhVoChongComponent implements OnInit {
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
    moiQuanHe: [
      {
        type: "required",
        message: translate('employee.validators.moiQuanHe.required'),
      },
    ],
    fullName: [
      {
        type: "required",
        message: translate('employee.validators.fullName.required'),
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
    if (this.dataModal.duLieuQuanHeGiaDinhVoChong.length > 0) {
      this.dataTemporary = this.dataModal.duLieuQuanHeGiaDinhVoChong;
      this.dataModal.duLieuQuanHeGiaDinhVoChong.forEach((item: any) => {
        this.themQuanHeGiaDinhVoChong(item);
      });
    } else {
      this.themQuanHeGiaDinhVoChong();
    }
  }

  closeModal(sendData: any): void {
    let data: any[] = [];
    if (this.qhGiaDinhVoChong.value.length > 0) {
      this.qhGiaDinhVoChong.value.forEach((item: any, index: number) => {
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
    if (((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('dateOfBirth').value != event) {
      ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('dateOfBirth').patchValue(Number(event));
    }
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      qhGiaDinhVoChong: this.fb.array([])
    });
  }

  get qhGiaDinhVoChong(): FormArray {
    return this.formGroup.get('qhGiaDinhVoChong') as FormArray;
  }

  themQuanHeGiaDinhVoChong(data: any = null): void {
    const itemForm = this.fb.group({
      moiQuanHe: [data ? data.moiQuanHe : '', [Validators.required]],
      fullName: [data ? data.fullName : '', [Validators.required]],
      dateOfBirth: [data ? data.dateOfBirth : this.currentDate],
      content: [data ? data.content : ''],
      isInput: [data ? data.isInput : 1],
      isUpdate: [data ? data.isUpdate : 0],
    })
    this.qhGiaDinhVoChong.push(itemForm);
  }

  deleteItemFormArray(index: number): void {
    this.qhGiaDinhVoChong.removeAt(index);
  }

  store(dataForm: any, index: number): void {
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    if (this.dataTemporary[index]) {
      this.dataTemporary[index] = dataForm;
    } else {
      this.dataTemporary.push(dataForm);
    }
  }

  edit(item: any, index: number): void {
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('dateOfBirth').patchValue(item.dateOfBirth);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(1);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(1);
  }

  update(dataForm, index): void {
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('moiQuanHe').patchValue(dataForm.moiQuanHe);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('fullName').patchValue(dataForm.fullName);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('dateOfBirth').patchValue(dataForm.dateOfBirth);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('content').patchValue(dataForm.content);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
  }

  cancel(index: number): void {
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('moiQuanHe').patchValue(this.dataTemporary[index].moiQuanHe);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('fullName').patchValue(this.dataTemporary[index].fullName);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('dateOfBirth').patchValue(this.dataTemporary[index].dateOfBirth);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('content').patchValue(this.dataTemporary[index].content);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('qhGiaDinhVoChong') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
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
