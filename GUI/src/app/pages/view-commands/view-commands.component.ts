import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-commands',
  templateUrl: './view-commands.component.html',
  styleUrls: ['./view-commands.component.css'],
})
export class ViewCommandsComponent implements OnInit {
  commands: any[] = []; // Commands fetched from the backend
  filteredCommands: any[] = []; // Filtered commands
  currentPage = 1; // Current page
  itemsPerPage = 5; // Items displayed per page
  searchQuery = ''; // User's search input

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCommands();
  }

  loadCommands() {
    this.http.get<any[]>('http://localhost:3000/commands/all').subscribe(
      (data) => {
        this.commands = data.map((command) => ({
          ...command,
          totalPrice: command.articles.reduce((sum: any, article: { price: any; }) => sum + article.price, 0),
        }));
        this.filteredCommands = [...this.commands];
      },
      (error) => {
        console.error('Error loading commands:', error);
      }
    );
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCommands = this.commands.filter((command) =>
      Object.values(command).some((value) =>
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
