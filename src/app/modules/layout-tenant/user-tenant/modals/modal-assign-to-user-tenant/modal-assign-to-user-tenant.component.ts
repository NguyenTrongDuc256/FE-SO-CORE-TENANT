import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "src/app/_services/layout-tenant/user/user.service";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {CampusList, RoleToAssignList, SchoolList} from "src/app/_models/layout-tenant/user/user.model";
import {MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE} from "../../../../../_shared/utils/constant";
import {translate} from "@ngneat/transloco";
import {Observable, Subscriber} from "rxjs";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {ValidateUser} from "src/app/_models/layout-tenant/user/validate.model";

@Component({
  selector: 'app-modal-assign-to-user-tenant',
  templateUrl: './modal-assign-to-user-tenant.component.html',
  styleUrls: ['./modal-assign-to-user-tenant.component.scss']
})
export class ModalAssignToUserTenantComponent implements OnInit {

  @Input() dataModal: any;
  formGroup: FormGroup;
  isLoading: boolean = false;
  roleToAssignList: RoleToAssignList[] = [];
  schoolList: SchoolList[] = [];
  campusList: CampusList[] = [];
  isSubmitForm: boolean = true;
  arrLayoutSwitchSchool: string[] = ['staff', 'teacher', 'student'];
  arrLayoutSwitchCampus: string[] = ['campus'];
  textSelect: string = translate('user.select');
  roleIdOnlySelected: string[] = [];

  validationMessages: ValidateUser = {
    roleId: [
      {
        type: "required",
        message: 'user.validators.roleId.required',
      },
    ],
    schoolId: [
      {
        type: "required",
        message: 'user.validators.schoolId.required',
      }
    ],
    campusId: [
      {
        type: "required",
        message: 'user.validators.campusId.required',
      }
    ]
  };

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
  ) {
  }

  ngOnInit(): void {
    this.roleToAssignList = this.dataModal.dataFromParent.roleToAssignList.map(item => {
      return {
        id: item.id,
        code: item.code,
        name: item.name,
        layout: item.layout,
        disabled: false
      }
    });
    // lấy danh sách role id chỉ được chọn 1 lần
    this.roleToAssignList.forEach((el) => {
      if (['student', 'parent', 'tenant'].includes(el.layout)) {
        this.roleIdOnlySelected.push(el.id);
      }
    });
    this.initForm();
    this.getSchoolList();
    this.getCampusList();
    this.addRole();
  }

  closeModal(sendData: any): void {
    this.activeModal.close(sendData);
  }

  submitForm(dataForm): void {
    this.isSubmitForm = true;
    this.isLoading = true;
    let roleList: any[] = [];

    if (dataForm.roles.length > 0) {
      dataForm.roles.forEach((element: any) => {
        if (element.isDisplay == 1) {
          roleList.push({
            roleId: element.roleId,
            campusId: element.campusId
          })

        } else if (element.isDisplay == 2) {
          roleList.push({
            roleId: element.roleId,
            schoolId: element.schoolId
          })
        } else {
          roleList.push({
            roleId: element.roleId,
          })
        }
      });
    }

    let dataInput: any = {
      userId: this.dataModal.dataFromParent.userId,
      roles: roleList,
    }

    this.listenFireBase("assign-role-to-user", "user");
    this.userService.assignRoles(dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.isLoading = false;
        this.isSubmitForm = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isSubmitForm = false;
      this.isLoading = false;
    })
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      roles: this.fb.array([])
    });
  }

  get roles(): FormArray {
    return this.formGroup.get('roles') as FormArray;
  }

  addRole(): void {
    const roleForm: FormGroup = this.fb.group({
      roleId: ['', [
        Validators.required
      ]],
      campusId: ['', []],
      schoolId: [''],
      schoolList: [[]],
      isDisplay: 0, // 0: không hiển select, 1: hiện select chọn campus, 2: hiện select chọn trường
      layout: ''
    })
    this.roles.push(roleForm);
  }

  deleteRole(index: number): void {
    let roleItem = ((this.formGroup.get('roles') as FormArray).at(index) as FormGroup).value;
    // xử lý bỏ disable khi xóa roleItem có roleId thuộc roleIdOnlySelected
    if (this.roleIdOnlySelected.includes(roleItem.roleId)) {
      this.roleToAssignList.forEach(el => {
        if (el.id == roleItem.roleId) {
          el.disabled = false;
        }
      })
    }

    // xử lý bỏ disable khi xóa roleItem khi có campusId thuộc campusList
    this.campusList.forEach(el => {
      if (el.id == roleItem.campusId) {
        el.disabled = false;
      }
    })

    // xử lý bỏ disable khi xóa roleItem khi có schoolId thuộc schoolList
    let indexItemFormArrayByRoleId = [];
    if (this.formGroup.get('roles').value && this.formGroup.get('roles').value.length > 0) {
      this.formGroup.get('roles').value.forEach((el, index) => {
        if (el.roleId == roleItem.roleId) {
          indexItemFormArrayByRoleId.push(index);
        }
      })

      if (indexItemFormArrayByRoleId.length > 0) {
        let schoolListNew = roleItem.schoolList.map(item => {
          if (item.id == roleItem.schoolId) {
            return {
              id: item.id,
              name: item.name,
              code: item.code,
              unitCode: item.unitCode,
              unitName: item.unitName,
              isActive: item.isActive,
              disabled: false
            }
          } else {
            return item
          }
        })
        indexItemFormArrayByRoleId.forEach(indexItemFormArray => {
          ((this.formGroup.get('roles') as FormArray).at(indexItemFormArray) as FormGroup).get('schoolList').patchValue(schoolListNew);
        })
      }
    }

    this.roles.removeAt(index);
    if (this.roles.length == 0) this.isSubmitForm = true;
  }

  onChangeRole(roleId: string, roleIndex: number): void {
    let roleItem = ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).value;
    /*Xử lý logic để disable option đã được chọn*/
    let roleIdFormArraySelected = [];
    if (this.formGroup.get('roles').value && this.formGroup.get('roles').value.length > 0) {
      this.formGroup.get('roles').value.forEach(el => {
        if (this.roleIdOnlySelected.includes(el.roleId)) { // check cac roleId nam trong roleIdOnlySelected thì mới push vào mảng
          roleIdFormArraySelected.push(el.roleId)
        }
      })
      if (roleIdFormArraySelected) {
        this.roleToAssignList.forEach(el => {
          roleIdFormArraySelected.includes(el.id) ? el.disabled = true : el.disabled = false;
        })
      }
    }

    let roleDetail = this.roleToAssignList.find(el => el.id == roleId);
    if (roleDetail !== undefined && this.arrLayoutSwitchCampus.includes(roleDetail.layout)) {
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('campusId').addValidators(Validators.required);
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('isDisplay').patchValue(1);

    } else if (roleDetail !== undefined && this.arrLayoutSwitchSchool.includes(roleDetail.layout)) {
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('schoolId').patchValue('');
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('schoolId').addValidators(Validators.required);
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('isDisplay').patchValue(2);
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('schoolList').patchValue(this.schoolList);

      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('campusId').patchValue('');
      this.campusList.forEach(el => {
        if (el.id == roleItem.campusId) {
          el.disabled = false;
        }
      });
    } else {
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('isDisplay').patchValue(0);

      // trương hợp không chọn campus nào thì set lại disable là false cho campusList
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('campusId').patchValue('');
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('campusId').clearValidators();
      this.campusList.forEach(el => {
        if (el.id == roleItem.campusId) {
          el.disabled = false;
        }
      });

      // xử lý bỏ disable khi xóa roleItem khi có schoolId thuộc schoolList
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('schoolId').patchValue('');
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('schoolId').clearValidators();

    }
    ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('campusId').updateValueAndValidity();
    ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('schoolId').updateValueAndValidity();

    this.isSubmitForm = false;
  }

  onChangeSchool(schoolId: string, index: number): void {
    let schoolIdFormArraySelected = [];
    let indexItemFormArrayByRoleId = [];
    let roleId = ((this.formGroup.get('roles') as FormArray).at(index) as FormGroup).get('roleId').value;

    if (this.formGroup.get('roles').value && this.formGroup.get('roles').value.length > 0) {
      this.formGroup.get('roles').value.forEach((el, index) => {
        if (el.roleId == roleId) {
          indexItemFormArrayByRoleId.push(index);
          schoolIdFormArraySelected.push(el.schoolId);
        }
      })

      if (indexItemFormArrayByRoleId.length > 0) {
        let schoolListNew = this.schoolList.map(item => {
          if (schoolIdFormArraySelected.includes(item.id)) {
            return {
              id: item.id,
              name: item.name,
              code: item.code,
              unitCode: item.unitCode,
              unitName: item.unitName,
              isActive: item.isActive,
              disabled: true
            }
          } else {
            return {
              id: item.id,
              name: item.name,
              code: item.code,
              unitCode: item.unitCode,
              unitName: item.unitName,
              isActive: item.isActive,
              disabled: false
            }
          }
        })
        indexItemFormArrayByRoleId.forEach(indexItemFormArray => {
          ((this.formGroup.get('roles') as FormArray).at(indexItemFormArray) as FormGroup).get('schoolList').patchValue(schoolListNew);
        })
      }
    }
  }

  onChangeCampus(): void {
    let campusIdFormArraySelected = [];
    if (this.formGroup.get('roles').value && this.formGroup.get('roles').value.length > 0) {
      this.formGroup.get('roles').value.forEach(el => {
        if (el.isDisplay == 1) {
          campusIdFormArraySelected.push(el.campusId);
        }
      })
      if (campusIdFormArraySelected) {
        this.campusList.forEach(el => {
          campusIdFormArraySelected.includes(el.id) ? el.disabled = true : el.disabled = false;
        })
      }
    }
  }

  getSchoolList(): void {
    this.userService.getSchoolList().subscribe((res: any): void => {
        if (res.status == 1) {
          this.schoolList = res.data.map(item => {
            return {
              id: item.id,
              name: item.name,
              code: item.code,
              unitCode: item.unitCode,
              unitName: item.unitName,
              isActive: item.isActive,
              disabled: false
            }
          });
        } else {
          this.showMessageService.error(res.msg);
        }

      },
      (err: any) => {
      }
    );
  }

  getCampusList(): void {
    this.userService.getCampusList().subscribe((res: any): void => {
        if (res.status == 1) {
          this.campusList = res.data.map(item => {
            return {
              id: item.id,
              name: item.name,
              code: item.code,
              disabled: false
            }
          });
        } else {
          this.showMessageService.error(res.msg);
        }
      },
      (err: any) => {
      }
    );
  }

  listenFireBase(action: string, module: string): void {
    setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.isSubmitForm = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.isLoading = false;
        this.isSubmitForm = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
        this.isSubmitForm = false;
      }
    });
  }
}
