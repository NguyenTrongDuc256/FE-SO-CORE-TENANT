import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserModel } from 'src/app/modules/auth';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
  styleUrls: ['./user-inner.component.scss']
})
export class UserInnerComponent implements OnInit {

  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language: LanguageFlag;
  langs = languages;
  private unsubscribe: Subscription[] = [];
  user: any;
  isOpen = true;
  lang = localStorage.getItem('language') ||'vi';

  constructor(
    private authService: AuthService,
    private router: Router,
    private translocoService: TranslocoService,
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('User'));
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

  selectLanguage(lang: string) {
    this.lang = lang;
    localStorage.setItem('language', lang);
    this.translocoService.setActiveLang(lang);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

  interface LanguageFlag {
    lang: string;
    name: string;
    flag: string;
    active?: boolean;
  }

  const languages = [
    {
      lang: 'en',
      name: 'English',
      flag: './assets/media/flags/united-states.svg',
    },
    {
      lang: 'zh',
      name: 'Mandarin',
      flag: './assets/media/flags/china.svg',
    },
    {
      lang: 'es',
      name: 'Spanish',
      flag: './assets/media/flags/spain.svg',
    },
    {
      lang: 'ja',
      name: 'Japanese',
      flag: './assets/media/flags/japan.svg',
    },
    {
      lang: 'de',
      name: 'German',
      flag: './assets/media/flags/germany.svg',
    },
    {
      lang: 'fr',
      name: 'French',
      flag: './assets/media/flags/france.svg',
    },
  ]

