import { translate } from '@ngneat/transloco';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ListenFirebaseService } from './../../../../_services/listen-firebase.service';
import { TIME_OUT_LISTEN_FIREBASE, METHOD_EMAIL, METHOD_PHONE } from './../../../../_shared/utils/constant';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Md5 } from 'ts-md5/dist/md5';
import { GeneralService } from 'src/app/_services/general.service';
@Component({
  selector: 'app-send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss'],
})
export class SendCodeComponent implements OnInit {
  isLoading$: Observable<boolean>;
  hasError = false;
  isOverTime = false;
  intervalCountdownTimer: any;
  seconds = 0;
  userName = '';
  userId = '';
  code = null;
  isLoading = false;
  timer: number = 0;
  METHOD_PHONE = METHOD_PHONE;
  METHOD_EMAIL = METHOD_EMAIL;
  method: number;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.isLoading = true;
      this.userName = res.userName;
      this.userId = res.userId;
      this.method = Number(res.method);
      this.isLoading = false;
    });
    if (this.userId) {
      this.checkValidTimeCode();
    }
  }

  clearTimer() {
    clearInterval(this.intervalCountdownTimer);
  }

  countdownTimer(duration: number) {
    this.isOverTime = true;
    this.timer = duration;
    this.isLoading = false;
    this.intervalCountdownTimer = setInterval(
      function () {
        if (--this.timer < 0) {
          this.clearTimer();
          this.isOverTime = false;
        }
      }.bind(this),
      1000
    );
  }

  checkValidTimeCode() {
    this.isLoading = true;
    this.isOverTime = true;
    this.authService.checkValidTimeCode(this.userId).subscribe((res: any) => {
      this.isOverTime = true;
      this.seconds = res.data;
      if (this.seconds > 0) {
        this.countdownTimer(this.seconds);
      } else {
        this.isLoading = false;
        this.isOverTime = false;
      }
      // if (res.status == 1) {
      //   this.isOverTime = true;
      //   this.seconds = res.data;
      //   if (this.seconds > 0) {
      //     this.countdownTimer(this.seconds);
      //   } else {
      //     this.isLoading = false;
      //     this.isOverTime = false;
      //   }
      // }
    },
    (err) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    });
  }

  sendCode() {
    if(!this.code || this.code.trim() == '') return this.showMessage.warning(translate('auth.requiredEnterCode'))
    this.isLoading = true;
    const md5 = new Md5();
    let userId = md5.appendStr(this.code.trim()).end();
    localStorage.setItem('userAuthId', JSON.stringify(userId));
    this.listenFireBase('verify-code', 'forgot-password');
    this.authService.sendCode(this.code.trim()).subscribe(
      (res: any) => {},
      (err) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    })
  }

  resendCode() {
    let dataInputUser = {
      requestUserId: this.userId,
      method: this.method
    };
    this.isLoading = true;
    this.listenFireBase('send-verification-code', 'forgot-password');
    this.authService.sendVerifyCode(dataInputUser).subscribe(
      (res: any) => {}, (err) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    })
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
        if (action == 'verify-code') {
          this.router.navigate(['/auth/forgot-password/reset-password'], {
            queryParams: { userName: this.userName, userId: ref.data },
          });
        }
        if(action == 'send-verification-code') {
          this.checkValidTimeCode();
        }
      } else {
        this.isLoading = false;
      }
    });
  }
}
