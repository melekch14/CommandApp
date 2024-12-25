import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sideCollapsed: boolean = false;
  isLoggedIn: boolean = false;
  screens: any[] = [
    {
      name: 'Dashboard',
      icon: 'fas fa-home',
      href: '/dashboard'
    },
    {
      name: 'Add Command',
      icon: 'fa-regular fa-square-plus',
      href: '/add-command'
    },
    {
      name: 'View Commands',
      icon: 'fa-regular fa-eye',
      href: '/view-commands'
    },
    {
      name: 'Add Expenses',
      icon: 'fa-solid fa-dollar-sign',
      href: '/add-expense'
    },
    {
      name: 'View Expenses',
      icon: 'fa-solid fa-clock-rotate-left',
      href: '/expense-history'
    },
    {
      name: 'Statistics',
      icon: 'fa-solid fa-chart-line',
      href: '/statistics'
    }
  ];
  activeLink: string = 'dashboard';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
