import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   loginForm: FormGroup;
  
    constructor(private fb: FormBuilder, private authService: AuthService) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
      });
    }
  
    onSubmit() {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
  
        this.authService.login({ username, password }).subscribe({
          next: (response) => {
            console.log('Login successfully:', response);
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
      }
    }
}
