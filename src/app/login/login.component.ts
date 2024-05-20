import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginNameService } from '../shared/services/login-name.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  loginService = inject(LoginNameService);

  form = this.fb.group({
    name: ['', Validators.required],
  });

  login() {
    this.loginService.username.set(this.form.controls['name'].value!);
  }
}
