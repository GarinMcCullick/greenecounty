import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class AppComponent {
  userForm: FormGroup;
  years: number[] = [];
  confirmDialogVisible = false;
  confirmChecked = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      accountNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(12),
          Validators.pattern('^[a-zA-Z0-9]{12}$'),
        ],
      ],
      year: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.confirmDialogVisible = true;
      this.confirmChecked = false;
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  confirmSubmission() {
    if (!this.confirmChecked) return;
    if (this.userForm.valid) {
      const url = 'localhost:testing';

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'some randdom auth token',
      });

      this.http.post(url, this.userForm.value, { headers }).subscribe({
        next: (res) => {
          console.log('Form submitted successfully:', res);
          alert('Form submitted successfully!');
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          alert(
            'Endpoint not found, since this is a demo and our hardcoded server localhost:testing does not exist. But otherwise form submitted successfully!'
          );
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
    this.confirmDialogVisible = false;
    this.userForm.reset();
  }

  cancelSubmission() {
    this.confirmDialogVisible = false;
  }
}
