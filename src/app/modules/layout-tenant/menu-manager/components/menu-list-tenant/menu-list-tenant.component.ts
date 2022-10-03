import { Component, OnInit } from '@angular/core';
import { translate } from '@ngneat/transloco';
import { ModuleManagerService } from 'src/app/_services/layout-tenant/module-manager/module-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { Router } from '@angular/router';
import { ListModule } from 'src/app/_models/layout-tenant/module-manager/module-manager.model';

@Component({
  selector: 'app-menu-list-tenant',
  templateUrl: './menu-list-tenant.component.html',
  styleUrls: ['./menu-list-tenant.component.scss']
})
export class MenuListTenantComponent implements OnInit {

  permission = DATA_PERMISSION;
  dataSource: ListModule[] = [];
  keyWord: string = "";
  statusFilter: number;
  isLoading: boolean = false;
  pageSize: number = 15;
  pageIndex: number = 1;
  constructor(
    private moduleManagerService: ModuleManagerService,
    private showMessageService: ShowMessageService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getDataSource();
  }

  getDataSource() {
    this.isLoading = true;
    this.moduleManagerService.getListModule(this.keyWord, this.statusFilter, this.pageSize, this.pageIndex).subscribe((res: any) => {
      this.isLoading = false;
      if (res.status == 1) {
        this.dataSource = res.data.data;
      } else {
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  changeFilterStatus(event) {
    this.statusFilter = event.target.value;
    this.getDataSource();
  }

  checkChangeKeywordSerach(event: any) {
    this.keyWord = event.target.value;
    if (event.keyCode == 13) {
      this.getDataSource();
    }
  }

  getNameStatus(value:number){
    return value == 1 ? translate('moduleManager.activated') : translate('moduleManager.locked');
  }

  viewDetailMenu(item:any){
    this.router.navigate([`system/menu-manager/detail/${item.id}`]);
  }
}
