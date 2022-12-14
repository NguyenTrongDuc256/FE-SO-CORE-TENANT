import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/_services/general.service';
import { RoleService } from 'src/app/_services/layout-tenant/role/role.service';
import { DATA_PERMISSION, LAYOUTS_TENANT } from 'src/app/_shared/utils/constant';
import { ModalFormRoleTenantComponent } from '../../modals/modal-form-role-tenant/modal-form-role-tenant.component';
@Component({
  selector: 'app-detail-role-tenant',
  templateUrl: './detail-role-tenant.component.html',
  styleUrls: ['./detail-role-tenant.component.scss', '../../helper-role.scss'],
})
export class DetailRoleTenantComponent implements OnInit {
  isLoading = false;
  roleId = '';
  keyword = '';
  infoRole = null;
  tabActive = 1;
  permission = DATA_PERMISSION;

  constructor(
    private modalService: NgbModal,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.roleId = params.id;
      this.getDetail();
    });
    this.tabActive = Number(this.activatedRoute.snapshot.queryParams.tab);
  }

  getDetail() {
    this.isLoading = true;
    this.roleService.detailRole(this.roleId).subscribe(
      (res: any) => {
        this.infoRole = res.data;
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  update() {
    const modalRef = this.modalService.open(ModalFormRoleTenantComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'role.titleDialogUpdateRole',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        role: this.infoRole,
        service: this.roleService,
        apiSubmit: (dataInput: any) => this.roleService.updateRole(dataInput),
        keyFirebaseAction: 'update',
        keyFirebaseModule: 'role',
        nameForm: 'update',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) this.getDetail();
      },
      (reason) => {}
    );
  }

  mapNameLayout() {
    return (
      LAYOUTS_TENANT.find((layout) => layout.code == this.infoRole?.layout)?.name ||
      '--'
    );
  }

  backPage() {
    this.router.navigate(['tenant/role'])
  }

  changeTab(indexTab: number) {
    this.tabActive = indexTab + 1;
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {tab: this.tabActive},
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
}
