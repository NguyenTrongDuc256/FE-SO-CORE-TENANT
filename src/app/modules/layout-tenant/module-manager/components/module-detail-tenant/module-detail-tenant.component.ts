import { Component, OnInit } from '@angular/core';
import { ModuleManagerService } from 'src/app/_services/layout-tenant/module-manager/module-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionOfModule } from 'src/app/_models/layout-tenant/module-manager/permission-of-module.model';
import { ListModule } from 'src/app/_models/layout-tenant/module-manager/module-manager.model';
import { GeneralService } from 'src/app/_services/general.service';
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-module-detail-tenant',
  templateUrl: './module-detail-tenant.component.html',
  styleUrls: ['./module-detail-tenant.component.scss']
})
export class ModuleDetailTenantComponent implements OnInit {
  isLoading: boolean = false;
  moduleId: string = '';
  dataModule: ListModule;
  dataPermission: PermissionOfModule[] = [];
  keyWord: string = '';
  constructor(
    private moduleManagerService: ModuleManagerService,
    private showMessageService: ShowMessageService,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) {
  }

  ngOnInit() {
    this.moduleId = this.activatedRoute.snapshot.params.id;
    if (this.moduleId) {
      this.getDetailModule();
      this.getListPermissionOfModule();
    }
  }

  getDetailModule() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.moduleManagerService.detailModule(this.moduleId).subscribe((res: any) => {
      this.isLoading = false;
      this.dataModule = res.data;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    })
  }

  getListPermissionOfModule() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.moduleManagerService.permissionOfModule(this.moduleId, this.keyWord).subscribe((res: any) => {
      this.isLoading = false;
      this.dataPermission = res.data;
    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    })
  }

}
