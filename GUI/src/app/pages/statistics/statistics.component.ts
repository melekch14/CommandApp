import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/StatisticsService';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalRevenue: number = 0;
  barChartData: any;
  pieChartData: any;
  lineChartRevenueVsExpenses: any;
  lineChartExpensesTrend: any;
  lineChartProfitByMonth: any;
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private statsService: StatisticsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.statsService.getTotalRevenue().subscribe(data => {
      this.totalRevenue = data.totalRevenue;
    });

    this.statsService.getTopArticles().subscribe(data => {
      this.prepareBarChartData(data);
    });

    this.statsService.getExpensesByCategory().subscribe(data => {
      this.preparePieChartData(data);
    });

    this.statsService.getRevenueVsExpenses().subscribe(data => {
      this.prepareRevenueVsExpensesChart(data);
    });

    this.statsService.getExpensesTrend().subscribe(data => {
      this.prepareExpensesTrendChart(data);
    });

    this.statsService.getProfitByMonth().subscribe(data => {
      this.prepareProfitByMonthChart(data);
    });
  }

  private prepareBarChartData(topArticles: any[]): void {
    this.barChartData = {
      labels: topArticles.map(a => a.name),
      datasets: [{
        label: 'Articles',
        data: topArticles.map(a => a.count),
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }]
    };
  }

  private preparePieChartData(expensesByCategory: any[]): void {
    this.pieChartData = {
      labels: expensesByCategory.map(e => e.categorie),
      datasets: [{
        data: expensesByCategory.map(e => e.total),
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }]
    };
  }

  private prepareRevenueVsExpensesChart(data: any): void {
    this.lineChartRevenueVsExpenses = {
      labels: ['Total'],
      datasets: [
        {
          label: 'Revenue',
          data: [data.totalRevenue],
          borderColor: '#42A5F5',
          fill: false
        },
        {
          label: 'Expenses',
          data: [data.totalExpenses],
          borderColor: '#FFA726',
          fill: false
        }
      ]
    };
  }

  private prepareExpensesTrendChart(data: any[]): void {
    this.lineChartExpensesTrend = {
      labels: data.map(e => e.month),
      datasets: [{
        label: 'Expenses Trend',
        data: data.map(e => e.total),
        borderColor: '#FF7043',
        fill: false
      }]
    };
  }

  private prepareProfitByMonthChart(data: any[]): void {
    const months = data.map(e => e.month);
    const profits = data.map(e => e.profit);

    this.lineChartProfitByMonth = {
      labels: months,
      datasets: [
        {
          label: 'Bénéfice par Mois',
          data: profits,
          fill: false,
          borderColor: '#FF5733',
          tension: 0.1,
        },
      ],
    };
  }

}