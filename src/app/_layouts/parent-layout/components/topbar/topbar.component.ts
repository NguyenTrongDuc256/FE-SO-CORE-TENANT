import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-md-16px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';

  constructor(private layout: LayoutService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
  }

  logout() {
    this.authService.logout().subscribe((res: any) => {
      if(res.status == 1) {
        let lang = localStorage.getItem('language');
        localStorage.clear();
        localStorage.setItem('language', lang);
        this.router.navigate(['/auth/login'],{
          queryParams: {},
        });
      }
    })
  }
}
