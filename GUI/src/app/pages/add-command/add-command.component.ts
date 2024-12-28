import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommandService } from '../../services/command.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-command',
  templateUrl: './add-command.component.html',
  styleUrls: ['./add-command.component.css']
})
export class AddCommandComponent {
  commandForm: FormGroup;
  phoneHistory: any[] = [];
  showHistoryButton = false;
  modalTitle: string = '';
  modalContent: string = '';

  constructor(private fb: FormBuilder, private commandService: CommandService, private notificationService: NotificationService) {
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
    this.openModal('Phone History', `${JSON.stringify(this.phoneHistory, null, 2)}`);
  }

  onSubmit() {
    if (this.commandForm.valid) {
      this.commandService.addCommand(this.commandForm.value).subscribe(
        (response) => {
          console.log('Command Added:', response);
          this.notificationService.showNotification({ title: 'Success', type: 'success', body: 'Command Added Successfully!' });
          this.commandForm.reset();
          this.articles.clear();
          this.addArticle(); // Reset the articles form array
        },
        (error) => {
          console.error('Error adding command:', error);
          this.notificationService.showNotification({ title: 'Failed', type: 'error', body: 'Failed to add the command.' });
        }
      );
    } else {
      this.notificationService.showNotification({ title: 'Error', type: 'error', body: "Please fill in all required fields correctly." });
    }
  }
  openModal(title: string, content: any) {
    this.modalTitle = title;
    this.modalContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
  }

  onModalEvent(event: any) {
    if (event == 'closed') {
      this.closeModal();
    }
  }

  closeModal() {
    this.modalTitle = '';
    this.modalContent = '';
  }
}
