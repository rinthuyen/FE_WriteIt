import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Toast } from 'primeng/toast';
import {
  JwtModel,
  LoginModel,
} from '../../../core/auth/models/authentication.model';
import { AuthenticationService } from '../../../core/auth/services/authentication.service';
import { JwtService } from '../../../core/auth/services/jwt.service';
import {
  ApiResponse,
  ApiResponseError,
} from '../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../core/http/models/statusCode.model';
import { PrintErrorComponent } from '../../../shared/components/print-error/print-error-component';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { AppError } from '../../../utils/errors';
import { AppNotify } from '../../../utils/notify';
import { AuthService } from '../services/auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password-component';
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
  providers: [MessageService],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent implements OnInit {
  @ViewChild('forgotpassword') forgotpassword: ForgotPasswordComponent | any;
  loginForm: FormGroup;
  formSubmitted = false;
  clickUsername = false;
  clickPassword = false;
  showPassword = false;
  typeInputPassword = 'password';
  USERNAME_FIELD = 'username';
  PASSWORD_FIELD = 'password';
  typeToast: 'Success' | 'Error' | undefined;
  typeSeverity: 'contrast' | 'success' | undefined;
  notify: AppNotify;
  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = new FormGroup({});
    this.notify = new AppNotify(this.messageService);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const loginModel: LoginModel = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.authenticationService.login(loginModel).subscribe(
      (res: ApiResponse) => {
        if (res.status === STATUS_CODE.SUCCESS) {
          const jwt: JwtModel = res.data;
          this.jwtService.setToken(jwt.accessToken);
          console.log(jwt.accessToken);
          // this.authService.completeChangeFormSubject();
          this.typeToast = 'Success';
          this.typeSeverity = 'success';
          this.notify.toastMessage(
            this.typeSeverity,
            res.message ?? '',
            this.typeToast
          );
          setTimeout(() => this.router.navigate(['/']), 500);
        }
      },
      (err: ApiResponseError) => {
        const error = err.error;
        switch (error.status) {
          case STATUS_CODE.UN_AUTHORIZE:
            this.typeToast = 'Error';
            this.typeSeverity = 'contrast';
            this.notify.toastMessage(
              this.typeSeverity,
              error.message ?? '',
              this.typeToast
            );
            break;
          case STATUS_CODE.BAD_REQUEST:
            AppError.handleErrorMessageFormGroup(error, this.loginForm);
        }
      }
    );
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
