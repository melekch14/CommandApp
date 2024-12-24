import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.hasToken()) {
      return true; // Allow access if not logged in
    }
    this.router.navigate(['/dashboard']); // Redirect if logged in
    return false;
  }
}
