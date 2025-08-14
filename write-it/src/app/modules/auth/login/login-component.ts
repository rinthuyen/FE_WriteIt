import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'write-it-login',
  imports: [ButtonModule, InputTextModule, Button, ReactiveFormsModule, MessageModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  formSubmitted = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
  }

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }

  signup() {
    this.authService.setChangeFormSubject("signup");
    // this.authService.completeChangeFormSubject();
  }
  
}
