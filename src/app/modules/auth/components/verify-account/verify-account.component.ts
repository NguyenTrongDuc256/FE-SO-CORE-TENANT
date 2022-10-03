import { translate } from '@ngneat/transloco';
import { ListenFirebaseService } from './../../../../_services/listen-firebase.service';
import { TIME_OUT_LISTEN_FIREBASE, METHOD_PHONE, METHOD_EMAIL } from './../../../../_shared/utils/constant';
import { ShowMessageService } from './../../../../_services/show-message.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss', '../../helper-auth.scss'],
})
export class VerifyAccountComponent implements OnInit {
  isLoading$: Observable<boolean>; // loading btn submit
  accountSelected: string = '';
  isVerifyAccount = false;
  userName = '';
  arrAccount = [];
  isLoading = false; // loading overlay
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  METHOD_PHONE = METHOD_PHONE;
  METHOD_EMAIL = METHOD_EMAIL;
  method: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res.userName) {
        this.userName = res.userName;
        this.accountSelected = res.userId;
        this.isVerifyAccount = true;
        this.checkAccount();
      } else {
        this.isVerifyAccount = false;
        this.arrAccount = [];
        this.isLoading = false;
      }
    });
  }

  checkAccount() {
    if(!this.userName || this.userName.trim() == '') return this.showMessage.warning(translate('auth.requiredEnterUserName'));
    const start = window.location.href.indexOf('//') + 2;
    const end = window.location.href.indexOf('.vn') + 3;
    const domain = window.location.href.substring(start, end);
    this.isLoading = true;
    this.authService.verifyUser(this.userName.trim(), domain).subscribe((res: any) => {
      if (res.status == 1) {
        this.isVerifyAccount = true;
        this.arrAccount = res.data;
        this.arrAccount.forEach(item => {
          item['method'] = item.email !='' ? METHOD_EMAIL : METHOD_PHONE;
        })
        res.data && res.data.length > 0 ? this.accountSelected = res.data[0].id : this.accountSelected = null;
        const md5 = new Md5();
        let userId = md5.appendStr(this.accountSelected).end();
        localStorage.setItem('userAuthId', JSON.stringify(userId));
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { userName: this.userName },
          // queryParamsHandling: 'merge'
        });
      } else {
        this.isVerifyAccount = false;
        this.showMessage.error(res.msg);
      }
      this.isLoading = false;
      this.authService.isLoadingSubject.next(false);
    });
  }

  continue() {
    let dataInputUser = {
      requestUserId: this.accountSelected,
    };
    let index = this.arrAccount.findIndex(item => item.id == this.accountSelected);
    if(index != -1) {
      dataInputUser['method'] = Number(this.arrAccount[index].method);
      this.method = Number(this.arrAccount[index].method);
    }
    const md5 = new Md5();
    let userId = md5.appendStr(this.accountSelected).end();
    localStorage.setItem('userAuthId', JSON.stringify(userId));
    this.isLoading = true;
    this.listenFireBase('send-verification-code', 'forgot-password')
    this.authService.sendVerifyCode(dataInputUser).subscribe((res: any) => {
      if (res.status == 0) {
        this.showMessage.error(res.msg);
      }
      this.isLoading = false;
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
        this.router.navigate(['/auth/forgot-password/send-code'], {
          queryParams: { userName: this.userName, userId:  this.accountSelected, method: this.method},
        });
      } else {
        this.isLoading = false;
      }
    });
  }
}
