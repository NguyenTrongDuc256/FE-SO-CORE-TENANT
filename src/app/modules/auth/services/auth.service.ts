import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthHTTPService } from './auth-http/auth-http.service';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  public currentPermissions: Observable<any>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private permissionsService: NgxPermissionsService,
    private cookieService: CookieService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(JSON.parse(localStorage.getItem('User')));
    this.currentUser$ = this.currentUserSubject.asObservable();
    let currentPermission = localStorage.getItem('currentUnit')
      ? JSON.parse(localStorage.getItem('currentUnit')).permissions
      : [];
    const currentUserElement = new BehaviorSubject<any>(currentPermission);
    this.currentPermissions = currentUserElement.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  login(dataLogin, isRememberPassword: boolean, requestOptions) {
    return this.authHttpService.login(dataLogin, requestOptions).pipe(
      map((res: any) => {
        if (res.status === 1) {
          //đăng nhập thành công
          let tokenLoginData = JSON.parse(
            this.decodeTokenLogin(res.data.token)
          );
          this.setLocalStorageToken(tokenLoginData);
          localStorage.setItem('Token', res.data.token);
          localStorage.setItem('userIdMd5', res.data.userIdMd5);
          localStorage.setItem(
            'needToChangePass',
            JSON.stringify(res.data.needToChangePass)
          );
          if (
            tokenLoginData.Layouts &&
            tokenLoginData.Layouts.length == 1 &&
            (tokenLoginData.Layouts[0] == 'tenant' ||
              tokenLoginData.Layouts[0] == 'omt')
          ) {
            this.router.navigate(['/tenant/home']);
            if (tokenLoginData.Layouts[0] == 'tenant') {
              let currentUnit = {
                permissions: tokenLoginData.TenantLayout.Permissions,
              };
              localStorage.setItem('currentLayout', tokenLoginData.Layouts[0]);
              localStorage.setItem('currentUnit', JSON.stringify(currentUnit));
            } else {
              let currentUnit = {
                permissions: tokenLoginData.OmtLayout.Permissions,
              };
              localStorage.setItem('currentLayout', tokenLoginData.Layouts[0]);
              localStorage.setItem('currentUnit', JSON.stringify(currentUnit));
            }
            const currentUserElement = new BehaviorSubject<any>(
              JSON.parse(localStorage.getItem('currentUnit')).permissions
            );
            this.currentPermissions = currentUserElement.asObservable();
            this.permissionsService.loadPermissions(
              JSON.parse(localStorage.getItem('currentUnit')).permissions,
              (permissionName, permissionsObject) => {
                return !!permissionsObject[permissionName];
              }
            );
          } else this.router.navigate(['auth/login/layout']);
          if (isRememberPassword) {
            this.cookieService.set('dataLogin', JSON.stringify(dataLogin));
          } else {
            this.cookieService.delete('dataLogin');
          }
        }
        return res;
      })
    );
  }

  decodeTokenLogin(token) {
    const helper = new JwtHelperService();
    return helper.decodeToken(token).data;
  }

  setLocalStorageToken(dataSave: any) {
    localStorage.setItem('User', JSON.stringify(dataSave.User));
    localStorage.setItem('Tenant', JSON.stringify(dataSave.Tenant));
    localStorage.setItem('Layouts', JSON.stringify(dataSave.Layouts));
    localStorage.setItem('appType', JSON.stringify(dataSave.AppType));
    localStorage.setItem('appVersion', JSON.stringify(dataSave.AppVersion));
    localStorage.setItem('deviceType', JSON.stringify(dataSave.DeviceType));
    localStorage.setItem('deviceId', JSON.stringify(dataSave.DeviceId));
    localStorage.setItem('deviceName', JSON.stringify(dataSave.DeviceName));
    localStorage.setItem('deviceOs', JSON.stringify(dataSave.DeviceOs));
  }

  verifyUser(emailPhone = '', domain = '') {
    this.isLoadingSubject.next(true);
    return this.authHttpService.verifyUser(emailPhone, domain);
  }

  sendVerifyCode(data = {}) {
    return this.authHttpService.sendVerifyCode(data);
  }

  checkValidTimeCode(userId = '') {
    return this.authHttpService.checkValidTimeCode(userId);
  }

  sendCode(code: string) {
    return this.authHttpService.sendCode(code);
  }

  changePassword(data = {}) {
    return this.authHttpService.changePassword(data);
  }

  logout() {
    return this.authHttpService.logout().pipe(
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  getDataConfig(){
    return this.authHttpService.getDataConfig();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
