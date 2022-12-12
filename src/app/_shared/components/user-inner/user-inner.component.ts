import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { GeneralService } from 'src/app/_services/general.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { AVATAR_DEFAULT } from 'src/app/_shared/utils/constant';
import { ModalChangePasswordComponent } from '../../modals/modal-change-password/modal-change-password.component';
import {en_US, NzI18nService, vi_VN} from "ng-zorro-antd/i18n";
import {NzI18nInterface} from "ng-zorro-antd/i18n/nz-i18n.interface";

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
  avatarDefault = AVATAR_DEFAULT;
  layoutCode: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translocoService: TranslocoService,
    private modalService: NgbModal,
    private generalService: GeneralService,
    private showMessageService: ShowMessageService,
    private i18n: NzI18nService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('User'));
    this.layoutCode = localStorage.getItem('currentLayout');
  }

  viewProfile() {
    if (this.layoutCode === 'student'){
      this.router.navigate(['student/profile']);
    }
    else {
      this.router.navigate(['parent/profile-student']);
    }
  }

  changePassword() {
    const modalRef = this.modalService.open(ModalChangePasswordComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'changePassword',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        userId: this.user?.Id,
        account: this.user?.FullName,
        code: this.user?.Code,
        username: this.user.Username,
        service: this.generalService,
        apiSubmit: (dataInput: any) =>
          this.generalService.changeMyPassword(dataInput),
        keyFirebaseAction: 'change-password',
        keyFirebaseModule: 'user',
        nameForm: 'create'
      },
    };

    if(this.layoutCode == 'tenant') {
      data.dataFromParent.apiSubmit = (dataInput: any) =>
      this.generalService.changePasswordUserLayoutTenant(dataInput)
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.logout();
        }
      },
      (reason) => { }
    );
  }

  logout() {
    this.authService.logout().subscribe((res: any) => {
      let lang = localStorage.getItem('language');
      localStorage.clear();
      localStorage.setItem('language', lang);
      this.router.navigate(['/auth/login'],{
        queryParams: {},
      });
    }, err => this.showMessageService.error(err.msg))
  }

  selectLanguage(lang: string) {
    this.lang = lang;
    localStorage.setItem('language', lang);
    this.translocoService.setActiveLang(lang);
    this.i18n.setLocale(lang === 'vi' ? vi_VN : en_US);
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

