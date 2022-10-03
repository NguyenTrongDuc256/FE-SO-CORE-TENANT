import { ShowMessageService } from 'src/app/_services/show-message.service';
import { TIME_OUT_LISTEN_FIREBASE } from './../../../../_shared/utils/constant';
import { ListenFirebaseService } from './../../../../_services/listen-firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  isLoading$: Observable<boolean>;
  hasError = false;
  password = '';
  confirmPassword = '';
  resetPassword: FormGroup;
  isShowPassword = false;
  isShowConfirmPassword = false;
  userId = '';
  isLoading = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService
    ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res => {
      this.userId = res.userId;
    });
    this.initForm();
  }

  initForm() {
    this.resetPassword = this.fb.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ]),
      ],
      confirmPassword: ['', Validators.compose([Validators.required])],
    });
  }

  showPassword(typeInput) {
    if (typeInput == 'password') this.isShowPassword = !this.isShowPassword;
    if (typeInput == 'confirm-password')
      this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

  submit() {
    if (this.resetPassword.invalid) {
      return;
    }
    const start = window.location.href.indexOf('//') + 2;
    const end = window.location.href.indexOf('.vn') + 3;
    const domain = window.location.href.substring(start, end);
    let valueChange = this.resetPassword.value;
    let inputChangePassword = {
      domain: domain,
      requestUserId: this.userId,
      password: valueChange.password,
      confirmedPassword: valueChange.confirmPassword,
    };
    const md5 = new Md5();
    let userId = md5.appendStr(this.userId).end();
    localStorage.setItem('userAuthId', JSON.stringify(userId));
    this.listenFireBase('change-password','forgot-password');
    this.authService
      .changePassword(inputChangePassword)
      .subscribe((res: any) => {
        if(res.status == 0) {
          this.isLoading = false;
          this.showMessage.error(res.msg);
        }
      });
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBaseAuth(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      } else {
        this.isLoading = false;
      }
    });
  }
}
