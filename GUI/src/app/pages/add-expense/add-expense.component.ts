import { Component } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { NotificationService } from 'src/app/services/notification.service';

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

  constructor(private expenseService: ExpenseService, private notificationService:NotificationService) { }

  onSubmit() {
    this.expenseService.addExpense(this.expense).subscribe({
      next: (response) => {
        console.log('Expense added:', response);
        this.notificationService.showNotification({ title: 'Success', type: 'success', body: 'Expense successfully added!' });
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding expense:', err);
        this.notificationService.showNotification({ title: 'Failed', type: 'error', body: "Failed to add expense. Please try again." });
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
