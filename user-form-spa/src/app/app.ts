import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  userForm: FormGroup;
  years: number[] = [];

  constructor(private fb: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      accountNumber: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{12}$')]],
      year: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const confirmed = confirm(
        'Please verify that the information is truthful before submission.'
      );
      if (confirmed) {
        console.log(this.userForm.value);
        alert('Form submitted (demo only)');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
