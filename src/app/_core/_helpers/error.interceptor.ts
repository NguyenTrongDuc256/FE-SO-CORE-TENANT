import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../../modules/auth/services/auth.service';
import { ShowMessageService } from '../../_services/show-message.service';
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router, private showMessageService: ShowMessageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            // if (err.status === 400) {
            //     let arrMessage = err.error.errors;
            //     for (let key in arrMessage) {
            //         arrMessage[key].forEach(element => {
            //             this.showMessageService.error(element);
            //         });
            //     }
            // }
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // alert("Authentication error");
                this.showMessageService.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
                let lang = localStorage.getItem('language');
                localStorage.clear();
                localStorage.setItem('language', lang);
                this.router.navigate(['/auth/login'], {
                    queryParams: {},
                });
            }
            if (err.status === 403) {
                // auto if 403 response returned from api
                this.showMessageService.error('Bạn không có đủ quyền để thực hiện chức năng');
                this.router.navigate(['access-denied']);
            }
            if (err.status === 404) {
                // auto if 404 response returned from api
                this.router.navigate(['/**']);
                this.showMessageService.error('Đường dẫn không hợp lệ');
            }
            if (err.status === 500) {
                // auto if 500
                // this.authService.logout();
                // this.router.navigate(['auth/login']);
                this.showMessageService.error('Có lỗi xảy ra trong quá trình xử lý vui lòng thử lại');
            }
            const error = err.error.message || err.statusText;
            return throwError(err.error);
        }));
    }
}
