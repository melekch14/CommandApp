import { Component } from '@angular/core';

@Component({
  selector: 'app-view-commands',
  templateUrl: './view-commands.component.html',
  styleUrls: ['./view-commands.component.css'],
})
export class ViewCommandsComponent {
[x: string]: any;
  commands = [
    { nom: 'Doe', prenom: 'John', adresse: '123 Main St', telephone: '123456789', note: 'Urgent', article: 'Shoes', prix: 50 },
    { nom: 'Smith', prenom: 'Jane', adresse: '456 Elm St', telephone: '987654321', note: '', article: 'Hat', prix: 20 },
    // Add more sample commands for testing
  ];

  filteredCommands = [...this.commands]; // Copy for filtering
  currentPage = 1; // Current page
  itemsPerPage = 5; // Items displayed per page
  searchQuery = ''; // User's search input

  applyFilter() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCommands = this.commands.filter(command =>
      Object.values(command).some(value =>
        String(value).toLowerCase().includes(query)
      )
    );
    this.currentPage = 1; // Reset to the first page after filtering
  }

  get paginatedCommands() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCommands.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCommands.length / this.itemsPerPage);
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
  }
}
