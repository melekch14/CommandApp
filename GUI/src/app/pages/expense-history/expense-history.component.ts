import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExpenseService } from '../../services/expense.service'; // Adjust the path as needed

@Component({
  selector: 'app-expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.css'],
})
export class ExpenseHistoryComponent implements OnInit {
  expenses: any[] = [];
  filteredExpenses: any[] = [];
  searchQuery = '';
  filterCategory = '';
  filterMonthYear = '';

  // Tri
  sortKey: keyof typeof this.expenses[0] = 'date';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.fetchExpenses();
  }

  fetchExpenses() {
    this.expenseService.getAllExpenses().subscribe(
      (data) => {
        this.expenses = data;
        this.filteredExpenses = [...this.expenses]; // Clone for filtering
      },
      (error) => {
        console.error('Failed to fetch expenses', error);
      }
    );
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase();
    this.filteredExpenses = this.expenses.filter(expense => {
      const matchesQuery = Object.values(expense).some(value =>
        String(value).toLowerCase().includes(query)
      );
      const matchesCategory = this.filterCategory ? expense.categorie === this.filterCategory : true;
      const matchesMonthYear = this.filterMonthYear
        ? expense.date.startsWith(this.filterMonthYear)
        : true;
      return matchesQuery && matchesCategory && matchesMonthYear;
    });
  }

  sortBy(key: keyof typeof this.expenses[0]) {
    this.sortKey = key;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredExpenses.sort((a, b) => {
      const compareA = a[key];
      const compareB = b[key];
      if (compareA < compareB) return this.sortDirection === 'asc' ? -1 : 1;
      if (compareA > compareB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredExpenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
    XLSX.writeFile(workbook, 'Expenses.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [['Nom', 'Montant', 'Catégorie', 'Date', 'Notes']],
      body: this.filteredExpenses.map(expense => [
        expense.nom,
        expense.montant,
        expense.categorie,
        expense.date,
        expense.notes,
      ]),
    });
    doc.save('Expenses.pdf');
  }
}
