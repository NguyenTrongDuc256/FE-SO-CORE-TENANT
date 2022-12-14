import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from "src/app/_services/layout-tenant/user/user.service";
import { ShowMessageService } from "../../../../../_services/show-message.service";
import { CampusList, RoleToAssignList, SchoolList } from "src/app/_models/layout-tenant/user/user.model";
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from "../../../../../_shared/utils/constant";
import { translate } from "@ngneat/transloco";
import { Observable, Subscriber } from "rxjs";
import { ListenFirebaseService } from "../../../../../_services/listen-firebase.service";
import { ValidateUser } from "src/app/_models/layout-tenant/user/validate.model";

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

  validationMessagesServer = {
    roleId: {},
    schoolId: {},
    campusId: {}
  }

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
    // l???y danh s??ch role id ch??? ???????c ch???n 1 l???n
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

  submitForm(dataForm: any): void {
    this.isLoading = true;
    if (this.formGroup.valid) {
      this.saveForm(dataForm);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  saveForm(dataForm: any) {
    this.isSubmitForm = true;
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
      if (_err.status == 400) {
        this.validateAllFormFieldsErrorServer(_err.errors);
      }
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
      isDisplay: 0, // 0: kh??ng hi???n select, 1: hi???n select ch???n campus, 2: hi???n select ch???n tr?????ng
      layout: ''
    })
    this.roles.push(roleForm);
  }

  deleteRole(index: number): void {
    let roleItem = ((this.formGroup.get('roles') as FormArray).at(index) as FormGroup).value;
    // x??? l?? b??? disable khi x??a roleItem c?? roleId thu???c roleIdOnlySelected
    if (this.roleIdOnlySelected.includes(roleItem.roleId)) {
      this.roleToAssignList.forEach(el => {
        if (el.id == roleItem.roleId) {
          el.disabled = false;
        }
      })
    }

    // x??? l?? b??? disable khi x??a roleItem khi c?? campusId thu???c campusList
    this.campusList.forEach(el => {
      if (el.id == roleItem.campusId) {
        el.disabled = false;
      }
    })

    // x??? l?? b??? disable khi x??a roleItem khi c?? schoolId thu???c schoolList
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
    /*X??? l?? logic ????? disable option ???? ???????c ch???n*/
    let roleIdFormArraySelected = [];
    if (this.formGroup.get('roles').value && this.formGroup.get('roles').value.length > 0) {
      this.formGroup.get('roles').value.forEach(el => {
        if (this.roleIdOnlySelected.includes(el.roleId)) { // check cac roleId nam trong roleIdOnlySelected th?? m???i push v??o m???ng
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

      // tr????ng h???p kh??ng ch???n campus n??o th?? set l???i disable l?? false cho campusList
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('campusId').patchValue('');
      ((this.formGroup.get('roles') as FormArray).at(roleIndex) as FormGroup).get('campusId').clearValidators();
      this.campusList.forEach(el => {
        if (el.id == roleItem.campusId) {
          el.disabled = false;
        }
      });

      // x??? l?? b??? disable khi x??a roleItem khi c?? schoolId thu???c schoolList
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
    },
      (err: any) => {
      }
    );
  }

  getCampusList(): void {
    this.userService.getCampusList().subscribe((res: any): void => {
      this.campusList = res.data.map(item => {
        return {
          id: item.id,
          name: item.name,
          code: item.code,
          disabled: false
        }
      });
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

  validateAllFormFieldsErrorServer(error: any) {
    Object.keys(error).forEach(key => {
      Object.keys(this.validationMessages).forEach(itemMessage => {
        if (key == itemMessage || (key[0].toLowerCase() + key.substring(1)) == itemMessage) {
          this.validationMessagesServer[itemMessage] = {
            type: "errorServer",
            message: error[key]
          }
        }
      });
    });
  }
}
