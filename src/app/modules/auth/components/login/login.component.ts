import { ModalLockLoginComponent } from './../modal-lock-login/modal-lock-login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GOOGLE_CAPTCHA_SITE_KEY, LANGUAGE } from 'src/app/_shared/utils/constant';
import { NgRecaptcha3ServiceService } from '../../services/reCapchaV3/ng-recaptcha3-service.service';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../helper-auth.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  loginForm: FormGroup;
  hasError: boolean = true;
  isLoading$: Observable<boolean>;
  rememberPassword: boolean = true;
  isShowPassword = false;
  dataResponse: any;
  dataRequest = {};
  domain: string;
  dataLoginCookie: any;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private siteKey: string;
  lang = 'vi';
  arrLang = LANGUAGE;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private cookieService: CookieService,
    private recaptcha3: NgRecaptcha3ServiceService,
    private translocoService: TranslocoService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (localStorage.getItem('User')) {
      let currentLayout = localStorage.getItem("currentLayout");
      this.router.navigate([`/${currentLayout}/home`]);
    }
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('language') && localStorage.getItem('language') != 'null' ? localStorage.getItem('language') : 'vi';
    localStorage.setItem('language', this.lang);
    this.siteKey = GOOGLE_CAPTCHA_SITE_KEY;
    this.initForm();
    const end = window.location.href.indexOf('.vn') + 3;
    const start = window.location.href.indexOf('//') + 2;
    this.domain = window.location.href.substring(start, end);
    if (this.siteKey != null && this.siteKey != undefined && this.siteKey != "") {
      this.recaptcha3.init(this.siteKey);
    }

  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.dataLoginCookie = this.cookieService.get("dataLogin") ? JSON.parse(this.cookieService.get("dataLogin")) : null;
    this.loginForm = this.fb.group({
      username: [
        this.dataLoginCookie ? this.dataLoginCookie.username : '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      password: [
        this.dataLoginCookie ? this.dataLoginCookie.password : '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  getDataRequest(username: string, password: string, domain: string) {
    return this.dataRequest = { username, password, domain };
  }

  submit() {
    this.isLoading = true;
    this.dataRequest = this.getDataRequest(this.loginForm.value.username, this.loginForm.value.password, this.domain);
    this.recaptcha3.getToken().then(
      token => {
        if (!(token != null && token != undefined && token != "")) {
          console.log("Login can not process, we use google captchar, could you recheck your browser");
        }
        const requestOptions = {
          headers: new HttpHeaders({
            'capchaToken': token,
            'Language': 'vi',
            'AppType': '0',//App web = 0
            'DeviceType': '2',//DEVICE_TYPE_WEB = 2,
            'language': this.lang
          }),//send token capcha on header
        };

        this.authService.login(this.dataRequest, this.rememberPassword, requestOptions).pipe(first())
          .subscribe(el => {
            this.dataResponse = el;
            if (this.dataResponse?.status === 0) {
              this.hasError = false;
              this.isLoading = false;
            }
            if (this.dataResponse?.status === 2)// đăng nhập sai quá 5 lần(BE check), hiển thị model
            {
              this.isLoading = false;
              this.openModalLockLogin();
            }
            this.isLoading = false;
          });
      },
      error => {
        // handle error here
        this.isLoading = false;
      }
    );
  }

  openModalLockLogin() {
    const modalRef = this.modalService.open(ModalLockLoginComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        // backdrop: 'static', // prevent click outside modal to close modal
        centered: true, // vị trí hiển thị modal ở giữa màn hình
        size: 'md', // 'sm' | 'md' | 'lg' | 'xl' | string
      });

    let data = {
      titleModal: '',
      btnAccept: 'btnAction.close',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: this.dataResponse.data.blockedRemainingTime,
      isCenterBtn: true
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  changeLanguage() {
    localStorage.setItem('language', this.lang);
    this.translocoService.setActiveLang(this.lang);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
