import { Component } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {

  expense = {
    nom: '',
    montant: null,
    categorie: '',
    date: '',
    notes: '',
  };

  categories = [
    'Matières premières',
    'Main-d\'œuvre (salaires, heures supplémentaires)',
    'Maintenance et équipements',
    'Logistique (transport, emballage)',
    'Charges fixes (loyer, électricité, internet)',
  ];

  constructor(private expenseService: ExpenseService) { }

  onSubmit() {
    this.expenseService.addExpense(this.expense).subscribe({
      next: (response) => {
        console.log('Expense added:', response);
        alert('Expense successfully added!');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding expense:', err);
        alert('Failed to add expense. Please try again.');
      },
    });
  }

  resetForm() {
    this.expense = {
      nom: '',
      montant: null,
      categorie: '',
      date: '',
      notes: '',
    };
  }
}
