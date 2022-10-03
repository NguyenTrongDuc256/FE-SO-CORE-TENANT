import { Component, OnInit } from '@angular/core';
import { ModuleManagerService } from 'src/app/_services/layout-tenant/module-manager/module-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionOfModule } from 'src/app/_models/layout-tenant/module-manager/permission-of-module.model';
import { ListModule } from 'src/app/_models/layout-tenant/module-manager/module-manager.model';

@Component({
  selector: 'app-module-detail-tenant',
  templateUrl: './module-detail-tenant.component.html',
  styleUrls: ['./module-detail-tenant.component.scss']
})
export class ModuleDetailTenantComponent implements OnInit {
  isLoading:boolean = false;
  moduleId:string = '';
  dataModule:ListModule;
  dataPermission:PermissionOfModule[] = [];
  keyWord:string = '';
  constructor(
    private moduleManagerService: ModuleManagerService,
    private showMessageService: ShowMessageService,
    private activatedRoute:ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.moduleId = this.activatedRoute.snapshot.params.id;
    if(this.moduleId){
      this.getDetailModule();
      this.getListPermissionOfModule();
    }
  }

  getDetailModule(){
    this.isLoading = true;
    this.moduleManagerService.detailModule(this.moduleId).subscribe((res:any)=>{
      this.isLoading = false;
      if (res.status == 1) {
        this.dataModule = res.data;
      } else {
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  getListPermissionOfModule(){
    this.isLoading = true;
    this.moduleManagerService.permissionOfModule(this.moduleId,this.keyWord).subscribe((res:any)=>{
      this.isLoading = false;
      if(res.status == 1){
        this.dataPermission = res.data;
      }else{
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  checkChangeKeywordSerach(event){
    this.keyWord = event.target.value;
    if (event.keyCode == 13) {
      this.getListPermissionOfModule();
    }
  }

}
