import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommandService } from '../../services/command.service';

@Component({
  selector: 'app-add-command',
  templateUrl: './add-command.component.html',
  styleUrls: ['./add-command.component.css']
})
export class AddCommandComponent {
  commandForm: FormGroup;
  phoneHistory: any[] = [];
  showHistoryButton = false;

  constructor(private fb: FormBuilder, private commandService: CommandService) {
    this.commandForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      date: [''],
      note: [''],
      articles: this.fb.array([
        this.createArticle()
      ])
    });
  }

  get articles(): FormArray {
    return this.commandForm.get('articles') as FormArray;
  }

  createArticle(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  addArticle() {
    this.articles.push(this.createArticle());
  }

  removeArticle(index: number) {
    this.articles.removeAt(index);
  }

  checkPhoneHistory(phoneNumber: string) {
    if (phoneNumber) {
      this.commandService.getPhoneHistory(phoneNumber).subscribe(
        (response: any[]) => {
          this.phoneHistory = response;
          this.showHistoryButton = response.length > 0;
        },
        (error) => {
          console.error('Error checking phone history:', error);
          this.showHistoryButton = false;
        }
      );
    } else {
      this.showHistoryButton = false;
    }
  }

  resetHistoryButton() {
    this.showHistoryButton = false;
    this.phoneHistory = [];
  }

  showPhoneHistory() {
    alert(`History: ${JSON.stringify(this.phoneHistory, null, 2)}`);
  }

  onSubmit() {
    if (this.commandForm.valid) {
      this.commandService.addCommand(this.commandForm.value).subscribe(
        (response) => {
          console.log('Command Added:', response);
          alert('Command Added Successfully!');
          this.commandForm.reset();
          this.articles.clear();
          this.addArticle(); // Reset the articles form array
        },
        (error) => {
          console.error('Error adding command:', error);
          alert('Failed to add the command.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
