import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddCommandComponent } from './pages/add-command/add-command.component';
import { ViewCommandsComponent } from './pages/view-commands/view-commands.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { ExpenseHistoryComponent } from './pages/expense-history/expense-history.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-command', component: AddCommandComponent, canActivate: [AuthGuard] },
  { path: 'view-commands', component: ViewCommandsComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'add-expense', component: AddExpenseComponent, canActivate: [AuthGuard] },
  { path: 'expense-history', component: ExpenseHistoryComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
