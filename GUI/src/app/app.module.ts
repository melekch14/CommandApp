import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddCommandComponent } from './pages/add-command/add-command.component';
import { ViewCommandsComponent } from './pages/view-commands/view-commands.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { ExpenseHistoryComponent } from './pages/expense-history/expense-history.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/auth/login/login.component';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddCommandComponent,
    ViewCommandsComponent,
    StatisticsComponent,
    AddExpenseComponent,
    ExpenseHistoryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    CardModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
