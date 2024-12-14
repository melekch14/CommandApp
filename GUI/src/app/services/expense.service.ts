// src/app/services/expense.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000/expenses'; // Adjust based on your backend

  constructor(private http: HttpClient) {}

  // Add a new expense
  addExpense(expense: any): Observable<any> {
    return this.http.post(this.apiUrl, expense);
  }

  // Get all expenses
  getAllExpenses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
