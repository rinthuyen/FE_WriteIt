import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { JwtModel, LoginModel } from '../../../core/auth/models/authentication.model';
import { AuthenticationService } from '../../../core/auth/services/authentication.service';
import { ApiResponse } from '../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../core/http/models/statusCode.model';
import { JwtService } from '../../../core/auth/services/jwt.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'write-it-login',
  imports: [ButtonModule, InputTextModule, Button, ReactiveFormsModule, MessageModule, ClickOutsideDirective, Toast],
  providers: [MessageService],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formSubmitted = false;
  clickUsername = false;
  clickPassword = false;
  USERNAME_FIELD = "username";
  PASSWORD_FIELD = "password";
  typeToast: 'Success' | 'Error' | undefined;
  typeSeverity: 'contrast' | 'success' | undefined;
  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    const loginModel: LoginModel = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.authenticationService.login(loginModel).subscribe((res: ApiResponse) => {
      if (res.status === STATUS_CODE.SUCCESS) {
        const jwt: JwtModel = res.data;
        this.jwtService.setToken(jwt.accessToken);
        this.authService.completeChangeFormSubject();
        this.typeToast = 'Success';
        this.typeSeverity = 'success';
        this.toastMessage(this.typeSeverity, 'Login successfully!', this.typeToast);
        setTimeout(() => this.router.navigate(['/']),500);
      } else {
        this.typeToast = 'Error';
        this.typeSeverity = 'contrast';
        this.toastMessage(this.typeSeverity, res.data, this.typeToast);
      }
    })
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

  handleClickoutside(type: string) {
    switch (type) {
      case this.USERNAME_FIELD:
        this.clickUsername = false;
        return;
      case this.PASSWORD_FIELD:
        this.clickPassword = false;
    }
  }

  toastMessage(severity: string, message: string, typeToast: string) {
    this.messageService.add({ severity: severity, summary: typeToast, detail: message });
  }
}
