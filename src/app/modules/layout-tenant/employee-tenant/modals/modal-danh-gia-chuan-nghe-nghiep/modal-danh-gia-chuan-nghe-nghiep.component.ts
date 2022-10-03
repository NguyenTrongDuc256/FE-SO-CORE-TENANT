import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {translate} from "@ngneat/transloco";
import {MoetCategories} from "src/app/_models/layout-tenant/employee/employee.model";
import {Validate} from "src/app/_models/layout-tenant/employee/validate.model";

@Component({
  selector: 'app-modal-danh-gia-chuan-nghe-nghiep',
  templateUrl: './modal-danh-gia-chuan-nghe-nghiep.component.html',
  styleUrls: ['./modal-danh-gia-chuan-nghe-nghiep.component.scss']
})
export class ModalDanhGiaChuanNgheNghiepComponent implements OnInit {
  nzNotFoundContent: string = translate('employee.notFoundContent');
  txtSelect: string = translate('employee.select');
  @Input() dataModal: any;
  formGroup: FormGroup;
  moetCategories: MoetCategories;
  nhomChucVu: any;
  tieuChiDanhGiaNhanSu: any[] = [];
  isLoading: boolean = false;
  isSubmitForm: boolean = true;
  fromDate: any = null;
  toDate: any = null;
  timePicker: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.moetCategories = this.dataModal.dataFromParent;
    this.tieuChiDanhGiaNhanSu = this.dataModal.tieuChiDanhGiaNhanSu;
    this.nhomChucVu = this.dataModal.nhomChucVu;
    this.initForm();

    if (this.dataModal.duLieuDanhGiaChuanNgheNghiep.length > 0) {
      this.dataModal.duLieuDanhGiaChuanNgheNghiep.forEach((item: any) => {
        this.themDanhGiaChuanNgheNghiep(item);
      });
    } else {
      this.tieuChiDanhGiaNhanSu.forEach(el => {
        this.themDanhGiaChuanNgheNghiep(el);
      })
    }
  }

  closeModal(sendData: any): void {
    this.activeModal.close(false);
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      danhGiaChuanNgheNghiep: this.fb.array([])
    });
  }

  get danhGiaChuanNgheNghiep(): FormArray {
    return this.formGroup.get('danhGiaChuanNgheNghiep') as FormArray;
  }

  themDanhGiaChuanNgheNghiep(data): void {
    const itemForm = this.fb.group({
      indexOrder: data.indexOrder,
      code: [data.code],
      name: [data.name],
      tuDanhGia: [data.tuDanhGia || ''],
      capTrenDanhGia: [data.capTrenDanhGia || ''],
    });
    this.danhGiaChuanNgheNghiep.push(itemForm);
  }

  save(dataForm: any): void {
    this.activeModal.close(dataForm);
  }
}
