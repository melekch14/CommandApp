import { Component } from '@angular/core';

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
    'Matières premières (cuir, tissus, semelles, etc.)',
    'Main-d\'œuvre (salaires, heures supplémentaires)',
    'Maintenance et équipements',
    'Logistique (transport, emballage)',
    'Charges fixes (loyer, électricité, internet)',
  ];

  onSubmit() {
    console.log('Expense submitted:', this.expense);
    // Add logic to save the expense to backend or local storage
  }
}
