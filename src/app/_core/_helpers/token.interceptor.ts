import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  currentUser = localStorage.getItem('Token');
  currentLayout = localStorage.getItem('currentLayout');
  currentLanguage = localStorage.getItem('language') || 'vi';
  currentUnit = localStorage.getItem('currentUnit') ? JSON.parse(localStorage.getItem('currentUnit')) : null;
  currentStudent = localStorage.getItem('currentStudent') ? JSON.parse(localStorage.getItem('currentStudent')) : null;
  currentSchoolYear = localStorage.getItem('currentSchoolYear');
  currentTerm = localStorage.getItem('currentTerm');

  constructor(public authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.currentUser = localStorage.getItem('Token');
    this.currentLayout = localStorage.getItem('currentLayout');
    this.currentUnit = localStorage.getItem('currentUnit') ? JSON.parse(localStorage.getItem('currentUnit')) : null;
    this.currentStudent = localStorage.getItem('currentStudent') ? JSON.parse(localStorage.getItem('currentStudent')) : null;
    this.currentLanguage = localStorage.getItem('language') || 'vi';

    if (request.url.includes('/login') || request.url.includes('/forgot-password') || request.url.includes('/confirm-code') || request.url.includes('/check-reset-code') || request.url.includes('/check-change-password')) {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
          Language: this.currentLanguage || 'vi'
        }
      });
      return next.handle(request);
    }

    let header = {
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${this.currentUser}`,
      Layout: this.currentLayout,
      Language: this.currentLanguage || 'vi'
    }

    switch (this.currentLayout) {
      case 'omt':
        break;
      case 'tenant':
        header['SchoolYearId'] = this.currentSchoolYear;
        break;
      case 'department':
      case 'division':
      case 'school':
        header['SchoolYearId'] = this.currentSchoolYear;
        header['UnitCode'] = this.currentUnit?.id;
        break;
      case 'campus':
        header['CampusId'] = this.currentUnit?.id;
        header['SchoolYearId'] = this.currentSchoolYear;
        break;
      case 'teacher':
      case 'staff':
      case 'student':
        header['SchoolId'] = this.currentUnit?.id;
        header['SchoolYearId'] = this.currentSchoolYear;
        header['Term'] = this.currentTerm;
        break;
      case 'parent':
        header['StudentId'] = this.currentStudent?.id;
        header['SchoolId'] = this.currentStudent?.schoolId;
        header['SchoolYearId'] = this.currentSchoolYear;
        header['Term'] = this.currentTerm;
        break;
    }
    if (request.url.includes('/logout')) {
      if(!this.currentLayout) {
        if(localStorage.getItem('Layouts')) {
          header['Layout'] = JSON.parse(localStorage.getItem('Layouts'))[0]
        } else delete header['Layout'];
      }
      header['SchoolId'] = 'a7e3a37d-c9a8-4534-94b1-ce9b7283aece';
      header['UnitCode'] = 'a7e3a37d-c9a8-4534-94b1-ce9b7283aece';
      header['SchoolYearId'] = 'a7e3a37d-c9a8-4534-94b1-ce9b7283aece';
      header['StudentId'] = 'a7e3a37d-c9a8-4534-94b1-ce9b7283aece';
      header['Term'] = '1';
    } else {
      if(!this.currentLayout) delete header['Layout'];
      if(!this.currentSchoolYear) delete header['SchoolYearId'];
      if(!this.currentTerm) delete header['Term'];
      // if (request.url.includes('/common/upload-file')) {
      //   delete header['Content-Type']
      // }
    }
    request = request.clone({
      setHeaders: header
    });
    return next.handle(request);
  }
}
