import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './modules/auth';
import * as moment from "moment";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private permissionsService: NgxPermissionsService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authService.currentPermissions.subscribe(x => {
      this.permissionsService.addPermission(x, (permissionName, permissionsObject) => {
        return !!permissionsObject[permissionName];
      });
    });
   }
}
