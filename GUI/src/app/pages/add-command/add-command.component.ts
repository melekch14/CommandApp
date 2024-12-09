import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-command',
  templateUrl: './add-command.component.html',
  styleUrls: ['./add-command.component.css']
})
export class AddCommandComponent {
  commandForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.commandForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
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
      console.log('Command Added:', this.commandForm.value);
      alert('Command Added Successfully!');
      this.commandForm.reset();
      this.articles.clear();
      this.addArticle(); // Add the initial article group back
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
