import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  canActivate(): boolean {
    const currentUser = localStorage.getItem('User');
    if (currentUser) {
      this.router.navigate(['/home']);
    }
    return true;
  }
}
