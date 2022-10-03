import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {translate} from "@ngneat/transloco";
import {MoetCategories} from "src/app/_models/layout-tenant/employee/employee.model";
import {Validate} from "src/app/_models/layout-tenant/employee/validate.model";

@Component({
  selector: 'app-modal-qua-trinh-dao-tao-boi-duong',
  templateUrl: './modal-qua-trinh-dao-tao-boi-duong.component.html',
  styleUrls: ['./modal-qua-trinh-dao-tao-boi-duong.component.scss']
})
export class ModalQuaTrinhDaoTaoBoiDuongComponent implements OnInit {
  nzNotFoundContent: string = translate('employee.notFoundContent');
  txtSelect: string = translate('employee.select');
  @Input() dataModal: any;
  formGroup: FormGroup;
  moetCategories: MoetCategories;
  isLoading: boolean = false;
  isSubmitForm: boolean = true;
  fromDate: any = null;
  toDate: any = null;
  timePicker: boolean = false;
  dataTemporary: any[] = []; // biến lưu dữ liệu tạm thời để xử lý logic
  validationMsg: Validate = {
    truong: [
      {
        type: "required",
        message: translate('employee.validators.truong.required'),
      },
    ],
    chuyenNganhDaoTao: [
      {
        type: "required",
        message: translate('employee.validators.chuyenNganhDaoTao.required'),
      },
    ],
    hinhThucDaoTao: [
      {
        type: "required",
        message: translate('employee.validators.hinhThucDaoTao.required'),
      },
    ],
    trinhDo: [
      {
        type: "required",
        message: translate('employee.validators.trinhDo.required'),
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
    if (this.dataModal.duLieuQuaTrinhDaoTaoBD.length > 0) {
      this.dataTemporary = this.dataModal.duLieuQuaTrinhDaoTaoBD;
      this.dataModal.duLieuQuaTrinhDaoTaoBD.forEach((item: any) => {
        this.themQuaTrinhDaoTaoBD(item);
      });
    } else {
      this.themQuaTrinhDaoTaoBD();
    }
  }

  closeModal(sendData: any): void {
    let data: any[] = [];
    if (this.quaTrinhDaoTaoBD.value.length > 0) {
      this.quaTrinhDaoTaoBD.value.forEach((item: any, index: number) => {
        if (item.isInput == 0) data.push(item);
        if (item.isInput == 1 && item.isUpdate == 1) {
          data.push({
            truong: this.dataTemporary[index].truong,
            chuyenNganhDaoTao: this.dataTemporary[index].chuyenNganhDaoTao,
            fromDate: this.dataTemporary[index].fromDate,
            toDate: this.dataTemporary[index].toDate,
            hinhThucDaoTao: this.dataTemporary[index].hinhThucDaoTao,
            trinhDo: 0,
            isInput: 0,
          });
        }
      });
    }
    this.activeModal.close(data);
  }

  dataFromDateOutput(event: any, index: number) {
    if (((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('fromDate').value != event) {
      ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('fromDate').patchValue(Number(event));
    }
  }

  dataToDateOutput(event: any, index: number) {
    if (((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('toDate').value != event) {
      ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('toDate').patchValue(Number(event));
    }
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      quaTrinhDaoTaoBD: this.fb.array([])
    });
  }

  get quaTrinhDaoTaoBD(): FormArray {
    return this.formGroup.get('quaTrinhDaoTaoBD') as FormArray;
  }

  themQuaTrinhDaoTaoBD(data: any = null): void {
    const itemForm = this.fb.group({
      truong: [data ? data.truong : '', [Validators.required]],
      chuyenNganhDaoTao: [data ? data.chuyenNganhDaoTao : '', [Validators.required]],
      fromDate: [data ? data.fromDate : this.fromDate],
      toDate: [data ? data.toDate : this.toDate],
      hinhThucDaoTao: [data ? data.hinhThucDaoTao : '', [Validators.required]],
      trinhDo: [data ? data.trinhDo : '', [Validators.required]],
      isInput: [data ? data.isInput : 1],
      isUpdate: [data ? data.isUpdate : 0],
    })
    this.quaTrinhDaoTaoBD.push(itemForm);
  }

  deleteItemFormArray(index: number): void {
    this.quaTrinhDaoTaoBD.removeAt(index);
  }

  store(dataForm: any, index: number): void {
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    if (this.dataTemporary[index]) {
      this.dataTemporary[index] = dataForm;
    } else {
      this.dataTemporary.push(dataForm);
    }
  }

  edit(item: any, index: number): void {
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('fromDate').patchValue(item.fromDate);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('toDate').patchValue(item.toDate);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('isInput').patchValue(1);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(1);
  }

  update(dataForm, index): void {
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('truong').patchValue(dataForm.truong);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('chuyenNganhDaoTao').patchValue(dataForm.chuyenNganhDaoTao);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('fromDate').patchValue(dataForm.fromDate);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('toDate').patchValue(dataForm.toDate);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('hinhThucDaoTao').patchValue(dataForm.hinhThucDaoTao);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('trinhDo').patchValue(dataForm.trinhDo);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
  }

  cancel(index: number): void {
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('truong').patchValue(this.dataTemporary[index].truong);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('chuyenNganhDaoTao').patchValue(this.dataTemporary[index].chuyenNganhDaoTao);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('fromDate').patchValue(this.dataTemporary[index].fromDate);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('toDate').patchValue(this.dataTemporary[index].toDate);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('hinhThucDaoTao').patchValue(this.dataTemporary[index].hinhThucDaoTao);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('trinhDo').patchValue(this.dataTemporary[index].trinhDo);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('isInput').patchValue(0);
    ((this.formGroup.get('quaTrinhDaoTaoBD') as FormArray).at(index) as FormGroup).get('isUpdate').patchValue(0);
  }

  getNameHinhThucDaoTao(code: string) {
    let name = '';
    this.moetCategories.hinh_thuc_dao_tao.forEach((item) => {
      if (code == item.code) {
        name = item.name;
      }
    });
    return name;
  }

  getNameTrinhDo(code: string) {
    let name = '';
    this.moetCategories.trinh_do.forEach((item) => {
      if (code == item.code) {
        name = item.name;
      }
    });
    return name;
  }
}
