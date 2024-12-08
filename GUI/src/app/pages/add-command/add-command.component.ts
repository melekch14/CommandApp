import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      article: ['', Validators.required],
      prix: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  onSubmit() {
    if (this.commandForm.valid) {
      console.log('Command Added:', this.commandForm.value);
      alert('Command Added Successfully!');
      this.commandForm.reset();
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
