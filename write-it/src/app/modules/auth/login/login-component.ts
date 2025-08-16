import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

@Component({
  selector: 'write-it-login',
  imports: [ButtonModule, InputTextModule, Button, ReactiveFormsModule, MessageModule, ClickOutsideDirective],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  formSubmitted = false;
  clickUsername = false;
  clickPassword = false;
  USERNAME_FIELD = "username";
  PASSWORD_FIELD = "password";
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

  handleClickinside(type: string) {
    switch (type) {
      case this.USERNAME_FIELD:
        this.clickUsername = true;
        return;
      case this.PASSWORD_FIELD:
        this.clickPassword = true;
    }
  }

  handleClickoutside(type:string) {
       switch (type) {
      case this.USERNAME_FIELD:
        this.clickUsername = false;
        return;
      case this.PASSWORD_FIELD:
        this.clickPassword = false;
    }
  }

}
