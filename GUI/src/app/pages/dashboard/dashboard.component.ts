import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticsService } from '../../services/StatisticsService';

interface Statistics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  grossMargin: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  statistics$: Observable<Statistics>;

  constructor(private statsService: StatisticsService) {
    this.statistics$ = this.statsService.getGrossMargin();
  }

  ngOnInit(): void {}

  getCardColor(value: number): string {
    return value < 0 ? 'var(--danger-color)' : 'var(--success-color)';
  }
}