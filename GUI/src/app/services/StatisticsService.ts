import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private apiUrl = 'http://localhost:3000/stat';

  constructor(private http: HttpClient) {}

  getTotalRevenue(): Observable<any> {
    return this.http.get(`${this.apiUrl}/total-revenue`);
  }

  getTopArticles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-articles`);
  }

  getExpensesByCategory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/expenses-by-category`);
  }

  getRevenueVsExpenses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/revenue-expenses`);
  }

  getExpensesTrend(): Observable<any> {
    return this.http.get(`${this.apiUrl}/expenses-trend`);
  }

  getProfitByMonth(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profit-by-month`);
  }
}
