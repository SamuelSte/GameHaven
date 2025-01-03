import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'signup',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username, password, confirmPassword } = this.signupForm.value;

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      this.authService.signup({ username, password }).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
  }

}
