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

  constructor(private fb: FormBuilder, private commandService: CommandService) {
    this.commandForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
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

  onSubmit() {
    if (this.commandForm.valid) {
      this.commandService.addCommand(this.commandForm.value).subscribe(
        response => {
          console.log('Command Added:', response);
          alert('Command Added Successfully!');
          this.commandForm.reset();
          this.articles.clear();
          this.addArticle(); // Add the initial article group back
        },
        error => {
          console.error('Error adding command:', error);
          alert('Failed to add the command.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
