import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { LoginModel } from '../../../core/auth/models/authentication.model';
import { PrintErrorComponent } from '../../../shared/components/print-error/print-error-component';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { AuthService } from '../services/auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password-component';
import { BaseComponent, BaseService } from '../../../shared/components/base-component';
import { StoreAuthFacade } from '../store/facade';
@Component({
  selector: 'write-it-login',
  imports: [
    ButtonModule,
    InputTextModule,
    Button,
    ReactiveFormsModule,
    MessageModule,
    ClickOutsideDirective,
    Toast,
    IconField,
    InputIcon,
    ForgotPasswordComponent,
    PrintErrorComponent,
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent extends BaseComponent implements OnInit {
  @ViewChild('forgotpassword') forgotpassword: ForgotPasswordComponent | any;
  formSubmitted = false;
  clickUsername = false;
  clickPassword = false;
  showPassword = false;
  typeInputPassword = 'password';
  USERNAME_FIELD = 'username';
  PASSWORD_FIELD = 'password';
  typeToast: 'Success' | 'Error' | undefined;
  typeSeverity: 'contrast' | 'success' | undefined;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private storeFacade: StoreAuthFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.fg = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  protected override setUpCallService(): void {
    const loginModel: LoginModel = {
      username: this.fg.get('username')?.value,
      password: this.fg.get('password')?.value,
    };
    this.storeFacade.login(loginModel);
  }

  login() {
    this.submit();
  }

  signup() {
    this.authService.setChangeFormSubject('signup');
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

  showHidePassword() {
    this.showPassword = !this.showPassword;
    this.typeInputPassword = !this.showPassword ? 'password' : 'text';
  }

  openFormRestPassword() {
    this.forgotpassword.show();
  }
}
