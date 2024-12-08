import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddCommandComponent } from './pages/add-command/add-command.component';
import { ViewCommandsComponent } from './pages/view-commands/view-commands.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { ExpenseHistoryComponent } from './pages/expense-history/expense-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-command', component: AddCommandComponent },
  { path: 'view-commands', component: ViewCommandsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'add-expense', component: AddExpenseComponent },
  { path: 'expense-history', component: ExpenseHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
